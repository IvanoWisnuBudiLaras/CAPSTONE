import Image from "next/image";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block">
        <Image
          src="/img/login-image.png"
          alt="Person saving money"
          width={1200}
          height={1400}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <div className="flex items-center justify-center px-6 bg-white">
        <SignupForm />
      </div>
    </section>
  );
}
