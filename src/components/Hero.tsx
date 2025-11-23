export default function Hero() {
    return (
        <div className="relative h-[600px] flex items-center justify-center bg-slate-900 text-white">
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                    alt="Gym background"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
            </div>

            <div className="relative z-10 text-center max-w-3xl px-4 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                    Find your perfect <span className="text-primary">place to train</span>
                </h1>
                <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light">
                    Discover top-rated gyms near you and book instantly.
                </p>

                <div className="bg-white p-2 rounded-full flex items-center max-w-2xl mx-auto shadow-2xl transform hover:scale-[1.02] transition duration-300">
                    <div className="pl-6 pr-2 py-2 flex-1 text-left">
                        <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">Where</label>
                        <input
                            type="text"
                            placeholder="Search destinations"
                            className="w-full text-gray-900 outline-none font-medium placeholder:text-gray-400"
                        />
                    </div>
                    <button className="bg-primary text-white p-4 rounded-full hover:bg-primary-hover transition shadow-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
