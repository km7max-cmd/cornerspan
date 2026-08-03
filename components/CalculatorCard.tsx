type Props = {
  title: string;
};

export default function CalculatorCard({ title }: Props) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>USA Construction Calculator</p>
    </div>
  );
}
