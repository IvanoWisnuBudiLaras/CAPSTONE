import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <section className="h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-white">

      {/* LEFT IMAGE (DESKTOP ONLY) */}
      <div className="hidden md:flex items-center justify-center">
        <div className="relative w-full h-full overflow-hidden rounded-r-[40px]">
          <Image
            src="/img/login-image.png"
            alt="Person saving money"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="relative flex items-center justify-center px-6">

        {/* Background image untuk mobile */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/img/login-image.png"
            alt="bg"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        </div>

        {/* Form */}
        <div className="relative z-10 w-full max-w-sm">
          <LoginForm />
        </div>

      </div>

    </section>
  );
}