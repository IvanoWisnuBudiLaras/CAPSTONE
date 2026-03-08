"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center">
      <p className="text-yellow-200/40">loading...</p>
    </div>
  );
}