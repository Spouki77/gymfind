import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { gymId, planId, startDate } = await req.json();

        const insertStmt = db.prepare(`
      INSERT INTO bookings (user_id, gym_id, plan_id, start_date, status)
      VALUES (?, ?, ?, ?, 'ACTIVE')
    `);

        insertStmt.run(session.user.id, gymId, planId, startDate);

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Booking failed" }, { status: 500 });
    }
}
