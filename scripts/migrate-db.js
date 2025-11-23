const db = require('better-sqlite3')('gymfinder.db');

console.log('Migrating database...');

try {
    db.prepare('ALTER TABLE gyms ADD COLUMN categories TEXT').run();
    console.log('Added categories column.');
} catch (e) {
    console.log('categories column likely exists.');
}

try {
    db.prepare('ALTER TABLE gyms ADD COLUMN opening_hours TEXT').run();
    console.log('Added opening_hours column.');
} catch (e) {
    console.log('opening_hours column likely exists.');
}

db.prepare(`
    CREATE TABLE IF NOT EXISTS coaches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        specialty TEXT,
        image TEXT,
        gym_id INTEGER NOT NULL,
        FOREIGN KEY (gym_id) REFERENCES gyms(id) ON DELETE CASCADE
    )
`).run();
console.log('Ensured coaches table exists.');

console.log('Migration complete.');
