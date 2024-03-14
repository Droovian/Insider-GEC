import { FC, ReactNode } from 'react';
import { Button } from './button';
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
    children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({children}) => {
    const loginWithGoogle = () => signIn('google', { callbackUrl : 'http://localhost:3000/'})
    
    return (
        <Button onClick={loginWithGoogle} className='w-full'>
            {children}
        </Button>
    )
}
export default GoogleSignInButton;