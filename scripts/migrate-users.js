const db = require('better-sqlite3')('gymfinder.db');

console.log('Migrating users table...');

try {
    db.prepare('ALTER TABLE users ADD COLUMN image TEXT').run();
    console.log('Added image column to users table.');
} catch (e) {
    console.log('image column likely exists in users table.');
}

console.log('Migration complete.');
