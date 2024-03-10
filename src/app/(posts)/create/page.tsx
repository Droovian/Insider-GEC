"use client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import React, { useState } from 'react';
import { useSession } from "next-auth/react"

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
    <form onSubmit={handleSubmit}>
       
      <textarea
        value={formData}
        onChange={handleChange}
        placeholder="Enter your text here..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};


export default MyForm;
