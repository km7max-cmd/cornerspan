export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">
          CornerSpan
        </h1>

        <nav className="flex gap-6 text-sm font-medium text-slate-700">
          <a href="/">Home</a>
          <a href="/calculators">Calculators</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
