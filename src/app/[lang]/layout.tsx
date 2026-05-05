import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Palapita Maya | Naturaleza y Lujo en la Ruta de los Cenotes",
  description: "Descubre Palapita Maya, una casa rural ideal para explorar los cenotes, relajarse y reconectar con la naturaleza. Reserva directa.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
