"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Plan {
    id: number;
    name: string;
    price: number;
    duration: number;
}

interface BookingFormProps {
    gymId: number;
    plans: Plan[];
}

export default function BookingForm({ gymId, plans }: BookingFormProps) {
    const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
    const [startDate, setStartDate] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleBook = async () => {
        if (!selectedPlan || !startDate) return;
        setLoading(true);

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    gymId,
                    planId: selectedPlan,
                    startDate
                })
            });

            if (res.ok) {
                router.push("/dashboard");
            } else {
                alert("Booking failed. Please log in.");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-xl font-bold mb-4">Book a Membership</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Plan</label>
                <div className="space-y-2">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`p-3 border rounded-lg cursor-pointer flex justify-between ${selectedPlan === plan.id ? 'border-primary bg-red-50' : ''}`}
                        >
                            <span className="font-medium">{plan.name}</span>
                            <span className="font-bold">{plan.price} DZD</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                />
            </div>

            <button
                onClick={handleBook}
                disabled={loading || !selectedPlan || !startDate}
                className="w-full btn btn-primary py-3 disabled:opacity-50"
            >
                {loading ? "Booking..." : "Reserve"}
            </button>
        </div>
    );
}
