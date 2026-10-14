import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Dabbulu Kavali | Money & Finance Made Simple", template: "%s | Dabbulu Kavali" },
  description: "Practical financial education in simple language: saving, budgeting, banking, investing basics, tax awareness and money habits.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}