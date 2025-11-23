const db = require('better-sqlite3')('gymfinder.db');
const bcrypt = require('bcryptjs');

async function seedUsers() {
    console.log('Seeding users...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    const insertUser = db.prepare(`
        INSERT OR IGNORE INTO users (email, password, name, role)
        VALUES (@email, @password, @name, @role)
    `);

    const users = [
        {
            email: 'admin@example.com',
            password: hashedPassword,
            name: 'Admin User',
            role: 'ADMIN'
        },
        {
            email: 'user@example.com',
            password: hashedPassword,
            name: 'John Doe',
            role: 'USER'
        }
    ];

    for (const user of users) {
        insertUser.run(user);
        console.log(`Seeded ${user.role}: ${user.email}`);
    }

    console.log('Users seeded successfully.');
}

seedUsers();
