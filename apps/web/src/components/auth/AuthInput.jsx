export default function AuthInput({ className = "", ...props }) {
  return (
    <input
      className={`w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 ${className}`}
      {...props}
    />
  );
}
