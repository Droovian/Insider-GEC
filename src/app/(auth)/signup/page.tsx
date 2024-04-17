import Loading from "@/app/(posts)/my-posts/loading";
import SignUpForm from "@/components/auth/SignUpForm";
import { Suspense } from "react";

export default function SignUp(){
    return (
        <Suspense fallback={<Loading/>}>
            <div className="w-1/2">
                <SignUpForm/>
            </div>
        </Suspense>
    )
}