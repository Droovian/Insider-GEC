import SignInForm from "@/components/auth/SignInForm"
import { Suspense } from "react"

export default function SignIn(){
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div className="w-1/2">
            <SignInForm/>
        </div>
        </Suspense>
    )
}