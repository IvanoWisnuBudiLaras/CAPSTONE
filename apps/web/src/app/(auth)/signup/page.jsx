import Image from "next/image";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <section className="h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      
      {/* LEFT IMAGE (DESKTOP) */}
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

      {/* RIGHT / MOBILE BACKGROUND */}
      <div className="relative flex items-center justify-center px-6 bg-white">
        
        {/* BACKGROUND IMAGE (MOBILE ONLY) */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/img/login-image.png"
            alt="bg"
            fill
            className="object-cover"
          />

          {/* KABUT PUTIH (SUDAH DI-OPTIMASI) */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        </div>

        {/* FORM */}
        <div className="relative z-10 w-full max-w-sm">
          <SignupForm />
        </div>

      </div>

    </section>
  );
}