type Props = {
  current: string;
};

export default function Breadcrumb({ current }: Props) {
  return (
    <nav className="mb-6 text-sm text-slate-500">
      <a href="/" className="hover:text-blue-600">
        Home
      </a>

      <span className="mx-2">/</span>

      <a
        href="/#calculators"
        className="hover:text-blue-600"
      >
        Calculators
      </a>

      <span className="mx-2">/</span>

      <span className="font-medium text-slate-900">
        {current}
      </span>
    </nav>
  );
}
