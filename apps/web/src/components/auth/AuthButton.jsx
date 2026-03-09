export default function AuthButton({
  children,
  className = "",
  type = "submit",
  ...props
}) {
  return (
    <button
      type={type}
      className={`w-full bg-sky-400 text-white py-2 rounded-full font-medium hover:bg-sky-500 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
