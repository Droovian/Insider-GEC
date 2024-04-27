import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./context/client-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "@/components/Providers";
import TProvider from "@/components/TProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Insider GEC",
  description: "A safe and anonymous platform for Goa College Of Engineering students to share their thoughts and opinions without fear of judgment or exposure.",
  keywords: [
    "GEC Insider",
    "Insider for GEC",
    "Anonymous posting",
    "Safe sharing",
    "Goa College Of Engineering",
    "GEC Farmagudi"
  ],
  metadataBase: new URL("https://gecinsider.in"),
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const session = await getServerSession(authOptions);

  return (
    <Provider session={session}>
        <html lang="en">
          <Providers>
            <TProvider>
              <body className={inter.className}>{children}</body>
            </TProvider>
          </Providers>
        </html>
      </Provider>
  );
}
