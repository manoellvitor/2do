import "./globals.css";
import { Anonymous_Pro } from "next/font/google";

const AnonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "2do",
  description: "Simple todo app using Next.js, Prisma and Tailwind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={AnonymousPro.className}>{children}</body>
    </html>
  );
}
