"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix Leaflet icon issue
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface Gym {
    id: number;
    name: string;
    lat: number;
    lng: number;
    price: number;
}

interface MapProps {
    gyms: Gym[];
}

export default function Map({ gyms }: MapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl"></div>;
    }

    // Center of Algeria (between Alger and Constantine)
    const center: [number, number] = [36.0, 3.0];
    const zoom = 6;

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: "100%", width: "100%", borderRadius: "12px" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {gyms.map((gym) => (
                <Marker key={gym.id} position={[gym.lat, gym.lng]} icon={icon}>
                    <Popup>
                        <div className="font-sans">
                            <h3 className="font-bold">{gym.name}</h3>
                            <p>{gym.price} DZD / mois</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
