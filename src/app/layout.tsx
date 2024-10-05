import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "@/components/Providers";
import TProvider from "@/components/TProvider";
import Navbar from "@/components/Navbar";

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
        <html lang="en" className="bg-gray-100">
          
            <TProvider>
              <body className="bg-gray-100">
              <Providers>
                  {/* <Navbar/> */}
                  <div className='container h-full '>
                    {children}
                  </div>
              </Providers>
              </body>
            </TProvider>
        </html>
  );
}
