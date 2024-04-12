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
import { signIn } from 'next-auth/react';
import { FormError } from '../form-error';
import { useSearchParams } from 'next/navigation';
import { FormSuccess } from '../form-success';
import { useState } from 'react';

const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {

  const searchParams = useSearchParams();

  const errorMessage = searchParams.get("error") || undefined;

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async(values: z.infer<typeof LoginSchema>) => {

    try{
     await signIn('credentials', {
        email: values.email,
        password: values.password,
      }).then(() => {
        setError("");
        setSuccess("");
      }).catch((error) => {
        setError(error)
      });
    }
    catch(error){
      setError('Error occured during sign in');
    }
      
  };

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl mb-5 flex justify-center">
      GEC - Insider
      </h1>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@example.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {

        <FormError message={errorMessage}/>
        }
        <Button size='sm' className='mt-3' variant='link'>
          <Link href="/auth/reset">
              Forgot Password?
          </Link>
        </Button>
        <Button className='w-full mt-6' type='submit'>
          Sign in
        </Button>
      </form>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/signup'>
          Sign up
        </Link>
      </p>
    </Form>
    </>
  );
};

export default SignInForm;