const db = require('better-sqlite3')('gymfinder.db');

console.log('--- Users ---');
console.log(db.prepare('SELECT * FROM users').all());

console.log('--- Gyms ---');
console.log(db.prepare('SELECT * FROM gyms').all());

console.log('--- Plans ---');
console.log(db.prepare('SELECT * FROM plans').all());

console.log('--- Bookings ---');
console.log(db.prepare('SELECT * FROM bookings').all());
