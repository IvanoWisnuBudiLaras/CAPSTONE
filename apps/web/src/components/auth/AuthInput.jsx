export default function AuthInput({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
    />
  );
}