import LoginForm from "@/components/auth/LoginForm";
export default function LoginPage() {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT IMAGE */}
      <div className="hidden md:block">
        <img
          src="/img/login-image.png"
          alt="saving money"
          className="w-238 h-238 object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6 bg-white">
        <LoginForm />
      </div>

    </section>
  );
}