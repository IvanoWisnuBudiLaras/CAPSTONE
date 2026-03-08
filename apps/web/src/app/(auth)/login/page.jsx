import LoginForm from "@/components/auth/LoginForm";
export default function LoginPage() {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT IMAGE */}
      <div className="hidden md:block">
        <img
          src="/images/login-image.jpg"
          alt="saving money"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6 bg-white">
        <LoginForm />
      </div>

    </section>
  );
}