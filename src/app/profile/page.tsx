import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";

async function getUserBookings(userId: string) {
    const stmt = db.prepare(`
    SELECT b.*, g.name as gym_name, g.address, p.name as plan_name, p.price
    FROM bookings b
    JOIN gyms g ON b.gym_id = g.id
    JOIN plans p ON b.plan_id = p.id
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
  `);
    return stmt.all(userId);
}

async function getUser(userId: string) {
    const stmt = db.prepare("SELECT id, name, email, image, role FROM users WHERE id = ?");
    return stmt.get(userId);
}

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const user = await getUser(session.user.id);
    const bookings = await getUserBookings(session.user.id);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Profile Settings */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border p-8 sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                        <ProfileForm user={user} />
                    </div>
                </div>

                {/* Right Column: Bookings */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
                    {bookings.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-gray-500 mb-4 text-lg">You haven't booked any gyms yet.</p>
                            <a href="/search" className="btn btn-primary">Find a Gym</a>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {bookings.map((booking: any) => (
                                <div key={booking.id} className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
                                    <div>
                                        <h3 className="font-bold text-xl mb-1">{booking.gym_name}</h3>
                                        <p className="text-gray-500 mb-3">{booking.address}</p>
                                        <div className="flex flex-wrap gap-2 text-sm">
                                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                                                {booking.plan_name}
                                            </span>
                                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                                Starts: {new Date(booking.start_date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-left md:text-right w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end">
                                        <p className="font-bold text-2xl text-primary">{booking.price} DZD</p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${booking.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
