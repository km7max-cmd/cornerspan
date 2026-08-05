import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-extrabold text-blue-600"
        >
          CornerSpan
        </Link>

        <nav className="hidden gap-8 font-medium text-slate-700 md:flex">
          <Link href="/">Home</Link>
          <Link href="/#calculators">Calculators</Link>
          <Link href="/">Categories</Link>
          <Link href="/">About</Link>
        </nav>

        <button className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700">
          Explore
        </button>
      </div>
    </header>
  );
}
