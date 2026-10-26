import CalculatorActions from "./CalculatorActions";
import Link from "next/link";
import { blogPosts } from "../data/blog";

export default function CalculatorReading({ href }: { href: string }) {
  const articles = blogPosts.filter((post) => post.calculatorHref === href);
  if (!articles.length) return null;
  return (
    <section className="mx-auto my-10 max-w-5xl rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-8" aria-label="Worked project examples">
      <h2 className="text-2xl font-bold text-slate-950">Check your estimate with a worked example</h2>
      <p className="mt-3 leading-7 text-slate-700">Follow the measurements, assumptions and purchase rounding before using your result to place an order.</p>
      <CalculatorActions href={href} />
      <ul className="mt-4 space-y-4">
        {articles.map((post) => <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="font-semibold text-blue-800 underline">{post.title}</Link>
          <p className="mt-1 text-sm leading-6 text-slate-700">{post.description}</p>
        </li>)}
      </ul>
      <p className="mt-5 text-sm"><Link href="/about#content-method" className="text-blue-800 underline">How our estimates are prepared</Link> · <Link href="/contact" className="text-blue-800 underline">Report an issue</Link></p>
    </section>
  );
}
