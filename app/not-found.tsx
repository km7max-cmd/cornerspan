import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-xl text-center">

        <h1 className="text-8xl font-black text-blue-600">
          404
        </h1>

        <h2 className="mt-6 text-4xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
        >
          Back to Homepage
        </Link>

      </div>
    </main>
  );
}
