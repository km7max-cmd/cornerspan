"use client";

import Link from "next/link";

const faqs = [
  {
    question: "How much paint do I need for a room?",
    answer:
      "It depends on the room dimensions, number of coats, and the paint coverage rate. Enter your length, width and height above to get a personalized estimate.",
  },
  {
    question: "How many coats of paint should I use?",
    answer:
      "Two coats are commonly used for interior walls, but the ideal number depends on the existing surface, paint type, color change and desired finish.",
  },
  {
    question: "Should doors and windows be subtracted?",
    answer:
      "Yes. Subtracting doors and windows gives a more realistic paintable-area estimate. Our calculator automatically accounts for them when you enter their quantities.",
  },
  {
    question: "Can I use metric measurements?",
    answer:
      "Yes. You can switch between US and Metric measurements and enter your dimensions using the available measurement units.",
  },
  {
    question: "Can I calculate paint cost in my local currency?",
    answer:
      "Yes. Select your preferred currency and enter the local paint and labor prices. The calculator does not apply exchange-rate conversion, so your entered prices remain local.",
  },
  {
    question: "Why is the recommended purchase amount rounded up?",
    answer:
      "Paint is normally purchased in practical container quantities. Rounding up helps ensure you have enough paint for the complete job and minor touch-ups.",
  },
];

export default function PaintGuide() {
  return (
    <section className="mt-6 space-y-5">

      {/* How we calculate */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
            🧠
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-950">
              How We Calculate Your Paint Estimate
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              A simple calculation based on your space, paint coverage and
              project settings.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["01", "Measure", "Enter your space dimensions."],
            ["02", "Calculate area", "We determine the paintable area."],
            ["03", "Apply coats", "Your selected coats are included."],
            ["04", "Estimate paint", "Area is divided by paint coverage."],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-xl bg-slate-50 p-4"
            >
              <span className="text-xs font-bold text-blue-600">
                {number}
              </span>

              <h3 className="mt-1 font-bold text-slate-900">
                {title}
              </h3>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl">
            📐
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-950">
              Paint Calculator Formula
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              The estimate is based on paintable surface area and the coverage
              specified for your paint.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Formula
            title="Room walls"
            formula="Wall area = 2 × (Length + Width) × Height"
          />

          <Formula
            title="Ceiling"
            formula="Ceiling area = Length × Width"
          />

          <Formula
            title="Paint required"
            formula="Paint required = Paintable area × Coats ÷ Coverage"
          />

          <Formula
            title="Paint cost"
            formula="Paint cost = Paint required × Price per unit"
          />
        </div>

        <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800">
          💡 Doors and windows are subtracted from wall area when applicable.
          The calculator then applies your selected number of coats.
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xl">
            ❓
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-950">
              Paint Calculator FAQ
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Common questions about estimating paint quantity and cost.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group py-3"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-800">
                <span>{faq.question}</span>

                <span className="shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180">
                  ↓
                </span>
              </summary>

              <p className="mt-2 pr-6 text-sm leading-6 text-slate-500">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Related calculators */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 sm:p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            More Construction Calculators
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            Continue planning your project with other CornerSpan calculators.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <RelatedCalculator
            href="/calculators/brick"
            icon="🧱"
            title="Brick Calculator"
          />

          <RelatedCalculator
            href="/calculators/concrete"
            icon="🏗️"
            title="Concrete Calculator"
          />

          <RelatedCalculator
            href="/calculators/tile"
            icon="◻️"
            title="Tile Calculator"
          />

          <RelatedCalculator
            href="/calculators/flooring"
            icon="📐"
            title="Flooring Calculator"
          />
        </div>
      </div>

    </section>
  );
}

function Formula({
  title,
  formula,
}: {
  title: string;
  formula: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-sm font-bold text-slate-800">
        {title}
      </p>

      <p className="mt-1 overflow-x-auto text-sm font-medium text-blue-700">
        {formula}
      </p>
    </div>
  );
}

function RelatedCalculator({
  href,
  icon,
  title,
}: {
  href: string;
  icon: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/80 px-4 py-3 font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-white hover:text-blue-700"
    >
      <span className="text-lg">{icon}</span>
      <span>{title}</span>
      <span className="ml-auto text-slate-400">→</span>
    </Link>
  );
}
