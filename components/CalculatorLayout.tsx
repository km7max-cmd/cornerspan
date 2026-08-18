import FavoriteButton from "./FavoriteButton";

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
      
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="mt-2 text-slate-600">
            {description}
          </p>
        </div>

        <FavoriteButton title={title} />
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        {children}
      </div>

    </main>
  );
}
