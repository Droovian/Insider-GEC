"use client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import React, { useState } from 'react';
import { useSession } from "next-auth/react"
import UserForm from "@/components/form/PostCreate";

interface PageProps {
    session?: { user: { email: string , username: string } }; 
} // Empty interface for clarity


const MyForm: React.FC<PageProps> = ({}) => {
    
    const { data: session } = useSession();

  const [formData, setFormData] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    
    console.log('Form submitted with data:', formData);

    setFormData('');
  };

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div className="p-4 w-3/4 sm:w-1/3 border shadow-lg">
        <UserForm/>
      </div>
    </main>
  );
};


export default MyForm;
