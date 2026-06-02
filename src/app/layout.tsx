import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpelarDNA · VM 2026",
  description:
    "Visuell spelarprofil med tre-lagrad formradar, momentum-kurva och xT-viktad heatmap.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
