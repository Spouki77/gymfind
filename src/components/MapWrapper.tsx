"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl"></div>
});

export default function MapWrapper(props: any) {
    return <Map {...props} />;
}
