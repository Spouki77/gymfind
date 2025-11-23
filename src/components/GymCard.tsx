import Link from 'next/link';

interface GymCardProps {
    id: number;
    name: string;
    location: string;
    price: number;
    rating: number;
    image: string;
}

export default function GymCard({ id, name, location, price, rating, image }: GymCardProps) {
    return (
        <Link href={`/gyms/${id}`} className="group block h-full">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 mb-3 shadow-sm group-hover:shadow-md transition-all duration-300">
                <img
                    src={image}
                    alt={name}
                    className="object-cover w-full h-full group-hover:scale-105 transition duration-500 ease-out"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
                    <span className="text-yellow-500">★</span> {rating}
                </div>
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition text-lg">{name}</h3>
                    <p className="text-gray-500 text-sm">{location}</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">{price} DZD</p>
                    <p className="text-gray-500 text-xs">par mois</p>
                </div>
            </div>
        </Link>
    );
}
