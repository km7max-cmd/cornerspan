export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">

        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          Loading...
        </h2>

        <p className="mt-2 text-slate-600">
          Preparing your construction calculators.
        </p>

      </div>
    </main>
  );
}
