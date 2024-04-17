import Loading from "@/app/(posts)/my-posts/loading"
import SignInForm from "@/components/auth/SignInForm"
import { Suspense } from "react"

export default function SignIn(){
    return (
        <Suspense fallback={<Loading/>}>
        <div className="w-1/2">
            <SignInForm/>
        </div>
        </Suspense>
    )
}