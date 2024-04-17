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
import { useState, useTransition } from 'react';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { newPassword } from '@/lib/new-password';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const NewPassForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values:z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
        newPassword(values, token)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
    })
    router.push("/");
  }
  return (
    <>
    <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-3/4 sm:w-1/2 h-45 hover:shadow-md p-4'>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl mb-5 flex justify-center">
      Reset Password
      </h1>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='******' {...field} type='password' />
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
            Reset Password
        </Button>
      </form>
    </Form>
    </div>
    </>
  );
};

export default NewPassForm;