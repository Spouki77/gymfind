import db from "@/lib/db";
import GymCard from "@/components/GymCard";
import MapWrapper from "@/components/MapWrapper";

async function getGyms() {
    try {
        const stmt = db.prepare("SELECT * FROM gyms");
        return stmt.all();
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default async function SearchPage() {
    const gyms = await getGyms();

    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-80px)]">
            <div className="flex flex-col lg:flex-row gap-8 h-full">
                {/* List View */}
                <div className="w-full lg:w-3/5 overflow-y-auto pr-4 custom-scrollbar">
                    <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 py-4 border-b">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {gyms.length > 0 ? `${gyms.length} gyms found` : 'No gyms found'}
                        </h1>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border rounded-full text-sm font-medium hover:border-black transition bg-white">Price</button>
                            <button className="px-4 py-2 border rounded-full text-sm font-medium hover:border-black transition bg-white">Facilities</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
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
                </div>

                {/* Map View */}
                <div className="hidden lg:block w-2/5 h-full sticky top-0 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                    <MapWrapper gyms={gyms as any} />
                </div>
            </div>
        </div>
    );
}
