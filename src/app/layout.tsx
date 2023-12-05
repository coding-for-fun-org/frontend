import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { getServerAuthSession } from "~/server/auth";
import Provider from "./_context/client-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Coding For Fun",
  description: "My personal playground for coding and learning.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
