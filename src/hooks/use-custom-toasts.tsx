import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'Login required.',
      description: 'You need to be logged in to do that.',
      variant: 'destructive',
      action: (
        <Link
          onClick={() => dismiss()}
          href='/sign-in'>
          Login
        </Link>
      ),
    })
  }

  return { loginToast }
}