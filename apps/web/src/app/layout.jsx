import "./global.css";
import { AuthProvider } from "@/app/context/AuthContext";
import LayoutContent from "@/components/layout/LayoutContent";

export const metadata = {
  title: "CAPSTONE",
  description: "My Capstone Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}