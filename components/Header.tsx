"use client"; 

import Link from "next/link";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 w-screen flex justify-between bg-slate-100 px-8 py-4">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/photos">Photos</Link>
        <Link href="/posts">Posts</Link>
      </div>
      <div>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}