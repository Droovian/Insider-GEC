"use client";

import Link from "next/link";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8 rounded-xl ">
        <div className="container mx-auto px-4 flex justify-between">
        <div className="flex flex-col space-y-4">
            <Link href="/team" className="text-gray-600 hover:text-gray-800 text-sm underline">Team</Link>
            
            <div className="text-center text-gray-600 text-sm">
                2024 GEC Insider, Inc.
            </div>
        </div>
        </div>
  </footer>
  );
};

export default Footer;