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
import { useState, useTransition } from 'react';
import { CardWrapper } from './card-wrapper';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { reset } from '@/lib/reset';
const ResetSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});

const ResetForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values:z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
        reset(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
    })
    console.log(values);
  }
  return (
    <>
    <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-3/4 sm:w-1/2 h-45 hover:shadow-md p-4'>
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
        </div>
        <FormError message={error}  />
        <FormSuccess message={success} />

        <Button
        disabled={isPending}
        type='submit'
        className='w-full mt-5'
        >
            Send reset email
        </Button>
      </form>
    </Form>
    </div>
    </>
  );
};

export default ResetForm;