"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
            <div className="container mx-auto h-20 flex items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary text-white p-2 rounded-lg transform group-hover:rotate-3 transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold text-gray-900 tracking-tight">Fit<span className="text-primary">Spot</span></span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link href="/search" className="font-medium text-gray-600 hover:text-primary transition">
                        Find Gyms
                    </Link>

                    {session ? (
                        <div className="flex items-center gap-4">
                            <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition">
                                {session.user?.image ? (
                                    <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                        {session.user?.name?.[0] || 'U'}
                                    </div>
                                )}
                                <span className="text-sm font-medium text-gray-700 hidden md:block">
                                    {session.user?.name || 'User'}
                                </span>
                            </Link>

                            {session.user?.role === 'ADMIN' && (
                                <Link href="/admin" className="btn btn-outline py-2 px-4 text-sm border-gray-200 hover:border-primary hover:text-primary">
                                    Admin
                                </Link>
                            )}
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="text-sm font-medium text-gray-500 hover:text-red-600 transition"
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="btn btn-outline py-2.5 px-6 text-sm border-gray-200 hover:border-primary hover:text-primary">
                                Log in
                            </Link>
                            <Link href="/register" className="btn btn-primary py-2.5 px-6 text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50">
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
