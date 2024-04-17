import SignUpForm from "@/components/auth/SignUpForm";
import { Suspense } from "react";

export default function SignUp(){
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="w-1/2">
                <SignUpForm/>
            </div>
        </Suspense>
    )
}