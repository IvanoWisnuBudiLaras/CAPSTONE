import "../styles/global.css";

export const metadata = {
  title: "CAPSTONE",
  description: "My Capstone Project",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}