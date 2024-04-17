"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";

export type CloudinaryUploadResult = {
  info: {
    url: string;
  };
  event: "success";
};

const formSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(500),
  category: z.string(),
  imageUrl: z.string().optional()
});

export default function UserForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      imageUrl: ""
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    try{
      setLoading(true);

      const response = await fetch('/api/publish', {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          category: data.category,
          imageUrl: imageUrl
        })
      })

      if(response.ok){
        setLoading(false);
        toast.success("Post added!");
      }
      else if( response.status === 429){
        toast.error("too many requests, try again later");
      }
      else if( response.status === 422){
        toast.error("You have reached the maximum limit of posts, please delete some posts to continue");
      }
      else{
        toast.error('Error occurred while adding post');
        
      }
    }
    catch(error){
      toast.error("An unexpected error occurred");
    }
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
                <SelectItem value="Campus">Campus</SelectItem>
                <SelectItem value="Council">Council</SelectItem>
                <SelectItem value="Creative-corner">Creative-corner</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Hostel">Hostel</SelectItem>
                <SelectItem value="Venting">Venting</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Jobs">Jobs</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

        <Suspense>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <CldUploadWidget
                onSuccess={(result: any) => {
                  const imageUrl = result?.info?.url;
                  setImageUrl(imageUrl);
                }}
                uploadPreset="kp93h5mr"
              >
                {({ open }) => {
                  return (
                    <Button type="button" variant='link' onClick={() => open()}>
                      Upload an Image
                    </Button>
                  );
                }}
              </CldUploadWidget>
            )}
          />
          </Suspense>
        <Button type="submit" className="ml-3" disabled={loading}>Submit</Button>
      
    </form>
  </Form>
  <ToastContainer position="top-center" autoClose={3000} />
  </>
  );
}
