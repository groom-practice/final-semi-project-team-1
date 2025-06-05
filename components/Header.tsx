"use client";

import Link from "next/link";
import useAuthStore from "@/store/userStore";

export default function Header() {
  const { isLoggedIn, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 z-100 w-screen flex justify-between bg-slate-100 px-8 py-4">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/photos">Photos</Link>
        <Link href="/posts">Posts</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <Link href="/" onClick={logout}>
            Logout
          </Link>
        ) : (
          <div className="flex flex-row gap-4">
            <Link href="/signup" className="hover:text-blue-400">
              Signup
            </Link>
            <Link href="/login" className="hover:text-blue-400">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
