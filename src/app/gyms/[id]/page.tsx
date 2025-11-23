import db from "@/lib/db";
import BookingForm from "@/components/BookingForm";
import { notFound } from "next/navigation";



async function getGym(id: string) {
    const stmt = db.prepare("SELECT * FROM gyms WHERE id = ?");
    return stmt.get(id);
}

async function getPlans(gymId: number) {
    const stmt = db.prepare("SELECT * FROM plans WHERE gym_id = ?");
    return stmt.all(gymId);
}

async function getCoaches(gymId: number) {
    const stmt = db.prepare("SELECT * FROM coaches WHERE gym_id = ?");
    return stmt.all(gymId);
}

export default async function GymPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const gym: any = await getGym(id);

    if (!gym) return notFound();

    const plans = await getPlans(gym.id);
    const coaches = await getCoaches(gym.id);
    const images = JSON.parse(gym.images);
    const facilities = JSON.parse(gym.facilities);
    const categories = gym.categories ? JSON.parse(gym.categories) : [];
    const openingHours = gym.opening_hours ? JSON.parse(gym.opening_hours) : null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((cat: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                            {cat}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{gym.name}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                    <span className="flex items-center gap-1 font-bold text-gray-900">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        {gym.rating}
                    </span>
                    <span>•</span>
                    <span className="underline">{gym.address}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 mb-12 rounded-3xl overflow-hidden h-[400px] md:h-[500px] shadow-xl">
                <div className="col-span-2 row-span-2 relative">
                    <img src={images[0]} alt={gym.name} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                </div>
                {images.slice(1, 5).map((img: string, i: number) => (
                    <div key={i} className="col-span-1 row-span-1 relative overflow-hidden">
                        <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
                <div className="w-full lg:w-2/3 space-y-12">
                    {/* About */}
                    <section className="border-b border-gray-100 pb-12">
                        <h2 className="text-2xl font-bold mb-4">About this place</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">{gym.description}</p>
                    </section>

                    {/* Facilities */}
                    <section className="border-b border-gray-100 pb-12">
                        <h3 className="text-2xl font-bold mb-6">What this place offers</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {facilities.map((fac: string, i: number) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-primary">✓</div>
                                    <span className="font-medium">{fac}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Coaches */}
                    {coaches.length > 0 && (
                        <section className="border-b border-gray-100 pb-12">
                            <h3 className="text-2xl font-bold mb-6">Meet the Coaches</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {coaches.map((coach: any) => (
                                    <div key={coach.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition">
                                        <img src={coach.image} alt={coach.name} className="w-16 h-16 rounded-full object-cover" />
                                        <div>
                                            <h4 className="font-bold text-lg">{coach.name}</h4>
                                            <p className="text-primary text-sm font-medium">{coach.specialty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Opening Hours */}
                    {openingHours && (
                        <section>
                            <h3 className="text-2xl font-bold mb-6">Opening Hours</h3>
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                    <div className="p-4 bg-white rounded-xl shadow-sm">
                                        <div className="text-sm text-gray-500 mb-1">Mon - Fri</div>
                                        <div className="font-bold text-lg">{openingHours.mon_fri}</div>
                                    </div>
                                    <div className="p-4 bg-white rounded-xl shadow-sm">
                                        <div className="text-sm text-gray-500 mb-1">Saturday</div>
                                        <div className="font-bold text-lg">{openingHours.sat}</div>
                                    </div>
                                    <div className="p-4 bg-white rounded-xl shadow-sm">
                                        <div className="text-sm text-gray-500 mb-1">Sunday</div>
                                        <div className="font-bold text-lg">{openingHours.sun}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                <div className="w-full lg:w-1/3">
                    <div className="sticky top-24">
                        <BookingForm gymId={gym.id} plans={plans as any} />
                    </div>
                </div>
            </div>
        </div>
    );
}
