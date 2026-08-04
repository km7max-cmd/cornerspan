type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FAQItem[];
};

export default function FAQ({ items }: Props) {
  return (
    <section className="mt-12 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <details
            key={index}
            className="rounded-lg border p-4"
          >
            <summary className="cursor-pointer font-semibold">
              {item.question}
            </summary>

            <p className="mt-3 text-slate-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
