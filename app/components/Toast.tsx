type ToastProps = {
  message: string;
  show: boolean;
};

export default function Toast({ message, show }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-xl">
      ✅ {message}
    </div>
  );
}
