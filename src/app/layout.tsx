import ThemeContextDefaultProvider from "@/context/ThemeContextProvider";
import "../styles/globals.css";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Sana AI",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeContextDefaultProvider>
      <body>{children}</body>
      </ThemeContextDefaultProvider>
    </html>
  );
}


