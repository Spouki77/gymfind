const db = require('better-sqlite3')('gymfinder.db');

const gyms = db.prepare('SELECT id FROM gyms').all();

const insertPlan = db.prepare(`
    INSERT INTO plans (name, price, duration, gym_id)
    VALUES (@name, @price, @duration, @gym_id)
`);

console.log('Seeding plans...');

for (const gym of gyms) {
    const plans = [
        { name: 'Monthly Pass', price: 50, duration: 30, gym_id: gym.id },
        { name: 'Annual Pass', price: 500, duration: 365, gym_id: gym.id }
    ];

    for (const plan of plans) {
        insertPlan.run(plan);
    }
}

console.log('Plans seeded.');
