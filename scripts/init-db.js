const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../gymfinder.db');
const schemaPath = path.join(__dirname, '../schema.sql');

const db = new Database(dbPath);

const schema = fs.readFileSync(schemaPath, 'utf-8');

console.log('Initializing database...');
db.exec(schema);
console.log('Database initialized successfully at', dbPath);

// Seed some initial data if empty
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
if (userCount.count === 0) {
    console.log('Seeding initial data...');
    // Add a test admin user (password: admin123) - In real app, hash this!
    // For now we will just put a placeholder, real auth will hash it.
    // We'll skip seeding users for now to avoid complexity with hashing in this script without bcryptjs loaded here easily (though we could require it).

    // Seed some Gyms
    const insertGym = db.prepare(`
        INSERT INTO gyms (name, description, lat, lng, address, price, rating, images, facilities)
        VALUES (@name, @description, @lat, @lng, @address, @price, @rating, @images, @facilities)
    `);

    const gyms = [
        {
            name: 'Muscle Beach Gym',
            description: 'The famous outdoor gym.',
            lat: 34.009,
            lng: -118.475,
            address: 'Venice Beach, CA',
            price: 20,
            rating: 4.8,
            images: JSON.stringify(['/gym1.jpg']),
            facilities: JSON.stringify(['Weights', 'Cardio', 'Outdoor'])
        },
        {
            name: 'Gold\'s Gym',
            description: 'The mecca of bodybuilding.',
            lat: 33.99,
            lng: -118.47,
            address: 'Venice, CA',
            price: 50,
            rating: 4.9,
            images: JSON.stringify(['/gym2.jpg']),
            facilities: JSON.stringify(['Weights', 'Sauna', 'Pool'])
        }
    ];

    for (const gym of gyms) {
        insertGym.run(gym);
    }
    console.log('Seeded gyms.');
}

db.close();
