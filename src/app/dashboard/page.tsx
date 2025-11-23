import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

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

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    const bookings = await getUserBookings(session.user.id);

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 mb-4">You haven't booked any gyms yet.</p>
                    <a href="/search" className="btn btn-primary">Find a Gym</a>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking: any) => (
                        <div key={booking.id} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{booking.gym_name}</h3>
                                <p className="text-gray-500">{booking.address}</p>
                                <div className="mt-2 text-sm">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        {booking.plan_name}
                                    </span>
                                    <span className="ml-2 text-gray-500">
                                        Starts: {new Date(booking.start_date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-xl">{booking.price} DZD</p>
                                <span className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${booking.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
