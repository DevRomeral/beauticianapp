import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="flex flex-wrap gap-3 bg-slate-400 p-2">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/profile" prefetch={false}>
        Profile
      </Link>
    </nav>
  );
}
