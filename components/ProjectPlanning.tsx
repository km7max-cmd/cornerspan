import Link from "next/link";
import { planningArticles } from "../data/planning-articles";

const tasks = [
  { title: "Measure a room or irregular area", detail: "Find square feet first. Add or subtract sections, then use the measured area for a material estimate.", href: "/calculators/area", label: "Area calculator" },
  { title: "Estimate a slab or footing", detail: "Use the specified length, width and thickness to estimate concrete volume. Review the allowance before ordering.", href: "/calculators/concrete", label: "Concrete calculator" },
  { title: "Plan a patio or paved surface", detail: "Calculate paver coverage and pieces, then estimate the base separately using its specified depth.", href: "/calculators/paver", label: "Paver calculator" },
  { title: "Estimate paint for a room", detail: "Separate paintable walls from openings and check the selected paint’s coverage and number of coats.", href: "/calculators/paint", label: "Paint calculator" },
];

export default function ProjectPlanning() {
  return <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-6 sm:py-20" aria-labelledby="project-planning-title">
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-700">From measurements to a material list</p>
      <h2 id="project-planning-title" className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-slate-950">Choose a construction calculator for your project</h2>
      <p className="mt-4 max-w-3xl leading-8 text-slate-600">Start with the quantity you need: area, volume, pieces or coverage. CornerSpan supports US project measurements, with metric options where shown. Material estimates use your inputs; a whole-project budget also needs labor, equipment, delivery and other costs.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tasks.map(task => <div key={task.href} className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-bold text-slate-950">{task.title}</h3>
          <p className="mb-5 mt-3 text-sm leading-7 text-slate-600">{task.detail}</p>
          <Link href={task.href} className="mt-auto font-semibold text-blue-700 underline underline-offset-4">{task.label} →</Link>
        </div>)}
      </div>
      <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
        <h3 className="text-xl font-bold text-slate-950">New to construction estimating?</h3>
        <p className="mt-2 leading-7 text-slate-600">Follow a calculation, prepare a takeoff, then compare a budget. Each walkthrough shows its inputs, assumptions and checks.</p>
        <ol className="mt-5 grid gap-5 md:grid-cols-3">
          {planningArticles.map((article, i) => <li key={article.slug}>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Step {i + 1}</p>
            <Link href={`/blog/${article.slug}`} className="mt-2 block font-bold leading-6 text-slate-950 underline underline-offset-4">{article.title}</Link>
            <p className="mt-2 text-sm leading-6 text-slate-600">{article.description}</p>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
