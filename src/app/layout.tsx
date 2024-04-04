import type { Metadata } from "next";
import { Inter, Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Provider from "./context/client-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "@/components/Providers";
import TProvider from "@/components/TProvider";

const inter = Inter({ subsets: ["latin"] });
const OpenSans = Open_Sans({subsets: ["latin"]});
const montserrat = Montserrat({subsets: ["latin"]});
export const metadata: Metadata = {
  title: "Insider GEC",
  description: "Anonymous posting app for Goa College Of Engineering Students",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const session = getServerSession(authOptions);

  return (

  <Provider session={session}>
    <html lang="en">
      <Providers >
        <TProvider>
          <body className={inter.className}>{children}</body>
        </TProvider>
      </Providers>
    </html>
    </Provider>

  );
}
