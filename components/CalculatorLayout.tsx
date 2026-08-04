type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function CalculatorLayout({
  title,
  description,
  children,
}: Props) {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-2 text-4xl font-bold">
        {title}
      </h1>

      <p className="mb-8 text-slate-600">
        {description}
      </p>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        {children}
      </div>
    </main>
  );
}
