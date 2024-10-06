import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "@/components/Providers";
import TProvider from "@/components/TProvider";
import Navbar from "@/components/Navbar";
import { siteConfig } from "./site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: siteConfig.metadataBase,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
        <html lang="en">
          
            <TProvider>
              <body className={`${inter?.className} min-h-screen pt-12 bg-slate-50 antialiased`}>
              <Providers>
                  <Navbar/>
                  <div className='container h-full pt-12'>
                    {children}
                  </div>
              </Providers>
              </body>
            </TProvider>
        </html>
  );
}
