export default function PageContents({ items }: { items: [string, string][] }) {
  return <nav aria-label="Table of contents" className="mx-auto my-8 max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
    <h2 className="text-lg font-bold text-slate-950">On this page</h2>
    <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
      {items.map(([id, label]) => <li key={id}><a href={`#${id}`} className="flex min-h-11 items-center py-2 text-sm font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900">{label}</a></li>)}
    </ul>
  </nav>;
}
