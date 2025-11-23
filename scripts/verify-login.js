const db = require('better-sqlite3')('gymfinder.db');
const bcrypt = require('bcryptjs');

async function verifyLogin(email, password) {
    console.log(`Verifying login for ${email}...`);

    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    const user = stmt.get(email);

    if (!user) {
        console.log('User not found!');
        return;
    }

    console.log('User found:', { id: user.id, email: user.email, role: user.role });

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        console.log('✅ Password matches!');
    } else {
        console.log('❌ Password does NOT match.');
    }
}

verifyLogin('admin@example.com', 'password123');
