export default function AuthButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-sky-400 text-white py-2 rounded-full font-medium hover:bg-sky-500 transition"
    >
      {text}
    </button>
  );
}