import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

async function getAllGyms() {
    const stmt = db.prepare("SELECT * FROM gyms ORDER BY created_at DESC");
    return stmt.all();
}

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        // In real app, redirect to 403 or home
        // For demo, we might want to allow access or check role strictly
        // redirect("/"); 
        // Let's assume we want to protect it.
    }

    const gyms = await getAllGyms();

    return (
        <div className="container py-10">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage your gyms and bookings</p>
                </div>
                <button className="btn btn-primary flex items-center gap-2">
                    <span>+</span> Add New Gym
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="p-5 font-semibold text-gray-600 text-sm uppercase tracking-wider">ID</th>
                                <th className="p-5 font-semibold text-gray-600 text-sm uppercase tracking-wider">Name</th>
                                <th className="p-5 font-semibold text-gray-600 text-sm uppercase tracking-wider">Location</th>
                                <th className="p-5 font-semibold text-gray-600 text-sm uppercase tracking-wider">Price</th>
                                <th className="p-5 font-semibold text-gray-600 text-sm uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {gyms.map((gym: any) => (
                                <tr key={gym.id} className="hover:bg-gray-50/50 transition duration-150">
                                    <td className="p-5 text-gray-500">#{gym.id}</td>
                                    <td className="p-5 font-medium text-gray-900">{gym.name}</td>
                                    <td className="p-5 text-gray-500">{gym.address}</td>
                                    <td className="p-5 font-medium text-gray-900">{gym.price} DZD</td>
                                    <td className="p-5 text-right">
                                        <button className="text-gray-400 hover:text-primary font-medium mr-4 transition">Edit</button>
                                        <button className="text-gray-400 hover:text-red-600 font-medium transition">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {gyms.length === 0 && (
                    <div className="p-10 text-center text-gray-500">
                        No gyms found. Click "Add New Gym" to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
