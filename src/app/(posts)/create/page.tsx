"use client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import React, { useState } from 'react';
import { useSession } from "next-auth/react"
import UserForm from "@/components/form/PostCreate";

interface PageProps {
    session?: { user: { email: string , username: string } }; 
} 

const MyForm: React.FC<PageProps> = ({}) => {

  return (
    <main className="flex justify-center items-center h-screen w-full mt-5">
      <div className="p-4 w-3/4 sm:w-1/3 border shadow-lg">
        <UserForm/>
      </div>
    </main>
  );
};


export default MyForm;
