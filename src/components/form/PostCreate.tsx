"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const formSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  category: z.string()
});

export default function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: ""
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    try{
      const response = await fetch("http://localhost:3000/api/publish", {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          category: data.category
        })
      })

      if(response.ok){
        toast.success("Successfully added post to the db");
      }
      else{
        toast.error('Error occurred while adding post');
        
      }
    }
    catch(error){
      toast.error("An unexpected error occurred");
    }
    console.log(data);
  };

  return (
    <>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Title" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter some message here..." {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue {...field} placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Events">Events</SelectItem>
                <SelectItem value="Academics">Academics</SelectItem>
                <SelectItem value="Relationships">Relationships</SelectItem>
                <SelectItem value="Campus-Life">Campus Life</SelectItem>
                <SelectItem value="Crushes">Crushes</SelectItem>
                <SelectItem value="Venting">Venting</SelectItem>
                <SelectItem value="Tips">Tips</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <Button type="submit">Submit</Button>
    </form>
  </Form>
  <ToastContainer position="top-center" autoClose={3000} />
  </>
  );
}
