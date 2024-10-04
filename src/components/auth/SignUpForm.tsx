'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import axios, { Axios, AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { generateRandomUsername } from '@/lib/generateRandomUsername';

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
  })

const generateRandomUser = () => {
    const gibberish = Math.random().toString(36).substring(2, 8); 
    return `gec${gibberish}`; 
};
const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: generateRandomUser(),
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    setError(undefined);
    setLoading(true);

    sessionStorage.setItem('username', values.username);

    router.push('/'); 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl mb-5 flex justify-center">
      GEC - Insider
      </h1>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Continue with a randomly generated username...</FormLabel>
                <FormControl>
                  <Input placeholder='johndoe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error}/>
        <FormSuccess message={success}/>

        <Button className='w-full mt-6' type='submit' disabled={loading}>
          Continue
        </Button>
      </form>
      {/* <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/signin'>
          Sign in
        </Link>
      </p> */}
    </Form>
  );
};

export default SignUpForm;