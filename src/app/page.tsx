import Hero from '@/components/Hero';
import GymCard from '@/components/GymCard';
import MapWrapper from '@/components/MapWrapper';
import db from '@/lib/db';

async function getFeaturedGyms() {
  // In a real app we would query the DB.
  // Since we might be having DB init issues, let's wrap this in a try/catch or just return mock data if DB fails.
  // But for now let's try to query.
  try {
    const stmt = db.prepare('SELECT * FROM gyms LIMIT 3');
    return stmt.all();
  } catch (e) {
    console.error("DB Error:", e);
    return [];
  }
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/search");
  }

  const gyms = await getFeaturedGyms();

  return (
    <main>
      <Hero />

      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Gyms</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Explore our hand-picked selection of premium fitness centers designed to help you achieve your goals.</p>
        </div>

        {gyms.length === 0 ? (
          <p>No gyms found. (Database might not be initialized)</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {gyms.map((gym: any) => (
              <GymCard
                key={gym.id}
                id={gym.id}
                name={gym.name}
                location={gym.address}
                price={gym.price}
                rating={gym.rating}
                image={JSON.parse(gym.images)[0]}
              />
            ))}
          </div>
        )}

        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Find gyms near you</h2>
              <p className="text-gray-300 text-lg mb-8">
                Our interactive map helps you locate the best fitness centers in your area.
                Filter by price, facilities, and rating to find your perfect match.
              </p>
              <a href="/search" className="btn btn-primary inline-flex items-center gap-2">
                Explore Map
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
            <div className="w-full md:w-1/2 h-[400px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 relative z-10">
              <MapWrapper gyms={gyms as any} />
            </div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/20 to-transparent pointer-events-none"></div>
        </div>
      </section>
    </main>
  );
}
