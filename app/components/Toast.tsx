type ToastProps = {
  show: boolean;
  message: string;
  type?: "success" | "error";
};

export default function Toast({
  show,
  message,
  type = "success",
}: ToastProps) {
  if (!show) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-xl transition-all ${
        type === "success"
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {type === "success" ? "✅" : "❌"} {message}
    </div>
  );
}
