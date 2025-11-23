import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Check if user exists
        const checkStmt = db.prepare("SELECT * FROM users WHERE email = ?");
        const existingUser = checkStmt.get(email);

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertStmt = db.prepare(`
      INSERT INTO users (email, password, name, role)
      VALUES (?, ?, ?, 'USER')
    `);

        insertStmt.run(email, hashedPassword, name);

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
