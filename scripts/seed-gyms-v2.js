const db = require('better-sqlite3')('gymfinder.db');

console.log('Seeding high-quality gyms...');

// Clear existing gyms to avoid duplicates/mess
db.prepare('DELETE FROM gyms').run();
db.prepare('DELETE FROM plans').run(); // Plans depend on gyms
db.prepare('DELETE FROM coaches').run();

const insertGym = db.prepare(`
    INSERT INTO gyms (name, description, lat, lng, address, price, rating, images, facilities, categories, opening_hours)
    VALUES (@name, @description, @lat, @lng, @address, @price, @rating, @images, @facilities, @categories, @opening_hours)
`);

const insertPlan = db.prepare(`
    INSERT INTO plans (name, price, duration, gym_id)
    VALUES (@name, @price, @duration, @gym_id)
`);

const insertCoach = db.prepare(`
    INSERT INTO coaches (name, specialty, image, gym_id)
    VALUES (@name, @specialty, @image, @gym_id)
`);

const gyms = [
    {
        name: 'Fitness Park Alger',
        description: 'Le club de fitness le plus moderne d\'Alger. Équipements de pointe, piscine olympique, et espace wellness.',
        lat: 36.7538,
        lng: 3.0588,
        address: 'Hydra, Alger',
        price: 8000,
        rating: 4.8,
        images: JSON.stringify([
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1974&auto=format&fit=crop'
        ]),
        facilities: JSON.stringify(['Piscine', 'Sauna', 'Spa', 'Coaching Personnel', 'Studio Yoga']),
        categories: JSON.stringify(['Premium', 'Natation', 'Wellness']),
        opening_hours: JSON.stringify({
            mon_fri: '06:00 - 22:00',
            sat: '08:00 - 20:00',
            sun: '08:00 - 18:00'
        }),
        coaches: [
            { name: 'Karim Benali', specialty: 'Musculation & Force', image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1974&auto=format&fit=crop' },
            { name: 'Amina Cherif', specialty: 'Yoga & Pilates', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop' }
        ]
    },
    {
        name: 'Iron Gym Oran',
        description: 'Salle de musculation traditionnelle avec équipements professionnels. Ambiance sérieuse pour athlètes motivés.',
        lat: 35.6969,
        lng: -0.6331,
        address: 'Hai El Menzah, Oran',
        price: 4500,
        rating: 4.7,
        images: JSON.stringify([
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop'
        ]),
        facilities: JSON.stringify(['Poids Libres', 'Machines', 'Vestiaires', 'Parking']),
        categories: JSON.stringify(['Musculation', 'Force', 'Bodybuilding']),
        opening_hours: JSON.stringify({
            mon_fri: '05:00 - 23:00',
            sat: '06:00 - 22:00',
            sun: '07:00 - 20:00'
        }),
        coaches: [
            { name: 'Mohamed Boudiaf', specialty: 'Bodybuilding', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Rachid Hamza', specialty: 'Powerlifting', image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2070&auto=format&fit=crop' }
        ]
    },
    {
        name: 'CrossFit Constantine',
        description: 'Box CrossFit authentique avec coaching de qualité. Communauté soudée et programmes variés.',
        lat: 36.3650,
        lng: 6.6147,
        address: 'Nouvelle Ville, Constantine',
        price: 6000,
        rating: 4.9,
        images: JSON.stringify([
            'https://images.unsplash.com/photo-1517963879466-e1b54ebd6694?q=80&w=2069&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop'
        ]),
        facilities: JSON.stringify(['CrossFit Box', 'Haltérophilie', 'Cours Collectifs', 'Rameurs']),
        categories: JSON.stringify(['CrossFit', 'HIIT', 'Fonctionnel']),
        opening_hours: JSON.stringify({
            mon_fri: '06:00 - 21:00',
            sat: '08:00 - 14:00',
            sun: 'Fermé'
        }),
        coaches: [
            { name: 'Yasmine Khelifi', specialty: 'CrossFit L2', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop' }
        ]
    },
    {
        name: 'Zen Yoga Annaba',
        description: 'Espace dédié au bien-être et à la relaxation. Yoga, méditation et pilates dans un cadre apaisant.',
        lat: 36.9000,
        lng: 7.7667,
        address: 'Centre-Ville, Annaba',
        price: 5000,
        rating: 4.8,
        images: JSON.stringify([
            'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2069&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop'
        ]),
        facilities: JSON.stringify(['Yoga Chaud', 'Pilates', 'Salle Méditation', 'Salon de Thé']),
        categories: JSON.stringify(['Yoga', 'Pilates', 'Méditation']),
        opening_hours: JSON.stringify({
            mon_fri: '07:00 - 21:00',
            sat: '08:00 - 19:00',
            sun: '09:00 - 17:00'
        }),
        coaches: [
            { name: 'Leila Mansouri', specialty: 'Vinyasa Flow', image: 'https://images.unsplash.com/photo-1544367563-121910aa662f?q=80&w=1974&auto=format&fit=crop' }
        ]
    },
    {
        name: 'Power Gym Sétif',
        description: 'Salle équipée pour tous niveaux. Cardio, musculation et cours collectifs dans une ambiance conviviale.',
        lat: 36.1905,
        lng: 5.4106,
        address: 'Ain Fouara, Sétif',
        price: 3500,
        rating: 4.6,
        images: JSON.stringify([
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop'
        ]),
        facilities: JSON.stringify(['Cardio', 'Musculation', 'Cours Collectifs', 'Douches']),
        categories: JSON.stringify(['Fitness', 'Cardio', 'Musculation']),
        opening_hours: JSON.stringify({
            mon_fri: '06:00 - 22:00',
            sat: '07:00 - 21:00',
            sun: '08:00 - 19:00'
        }),
        coaches: [
            { name: 'Sofiane Meziani', specialty: 'Fitness & Cardio', image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1974&auto=format&fit=crop' }
        ]
    },
    {
        name: 'Elite Fitness Tlemcen',
        description: 'Club moderne avec piscine couverte et espace cardio-training. Idéal pour toute la famille.',
        lat: 34.8780,
        lng: -1.3157,
        address: 'Imama, Tlemcen',
        price: 5500,
        rating: 4.7,
        images: JSON.stringify([
            'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop'
        ]),
        facilities: JSON.stringify(['Piscine Couverte', 'Cardio', 'Musculation', 'Cours Aquagym']),
        categories: JSON.stringify(['Fitness', 'Natation', 'Famille']),
        opening_hours: JSON.stringify({
            mon_fri: '07:00 - 21:00',
            sat: '08:00 - 20:00',
            sun: '09:00 - 18:00'
        }),
        coaches: [
            { name: 'Nadia Belkacem', specialty: 'Aquagym & Natation', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop' }
        ]
    },
    {
        name: 'Fight Club Blida',
        description: 'Centre d\'arts martiaux et sports de combat. Boxe, MMA, et préparation physique intensive.',
        lat: 36.4703,
        lng: 2.8277,
        address: 'Bab Dzair, Blida',
        price: 4000,
        rating: 4.8,
        images: JSON.stringify([
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517963879466-e1b54ebd6694?q=80&w=2069&auto=format&fit=crop'
        ]),
        facilities: JSON.stringify(['Ring de Boxe', 'Tatami', 'Sacs de Frappe', 'Vestiaires']),
        categories: JSON.stringify(['Arts Martiaux', 'Boxe', 'MMA']),
        opening_hours: JSON.stringify({
            mon_fri: '16:00 - 22:00',
            sat: '09:00 - 20:00',
            sun: '10:00 - 18:00'
        }),
        coaches: [
            { name: 'Malik Zeroual', specialty: 'Boxe Anglaise', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop' },
            { name: 'Farid Bendjelloul', specialty: 'MMA', image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2070&auto=format&fit=crop' }
        ]
    },
    {
        name: 'Ladies Gym Béjaïa',
        description: 'Salle exclusivement féminine. Ambiance chaleureuse et programmes adaptés aux femmes.',
        lat: 36.7525,
        lng: 5.0556,
        address: 'Sidi Ahmed, Béjaïa',
        price: 4500,
        rating: 4.9,
        images: JSON.stringify([
            'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2069&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop'
        ]),
        facilities: JSON.stringify(['Cardio', 'Musculation', 'Zumba', 'Pilates']),
        categories: JSON.stringify(['Femmes', 'Fitness', 'Danse']),
        opening_hours: JSON.stringify({
            mon_fri: '08:00 - 20:00',
            sat: '09:00 - 18:00',
            sun: 'Fermé'
        }),
        coaches: [
            { name: 'Samia Ait Ali', specialty: 'Fitness & Zumba', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop' }
        ]
    }
];

for (const gym of gyms) {
    const { coaches, ...gymData } = gym;
    const info = insertGym.run(gymData);
    const gymId = info.lastInsertRowid;

    // Seed plans
    insertPlan.run({ name: 'Day Pass', price: 25, duration: 1, gym_id: gymId });
    insertPlan.run({ name: 'Monthly Membership', price: gym.price, duration: 30, gym_id: gymId });
    insertPlan.run({ name: 'Annual Membership', price: gym.price * 10, duration: 365, gym_id: gymId });

    // Seed coaches
    for (const coach of coaches) {
        insertCoach.run({ ...coach, gym_id: gymId });
    }
}

console.log('Seeded high-quality gyms, plans, and coaches.');
