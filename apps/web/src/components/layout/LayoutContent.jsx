"use client"

import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";

const AUTH_ROUTES = ["/login", "/signup"];

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main>{children}</main>
    </>
  );
}