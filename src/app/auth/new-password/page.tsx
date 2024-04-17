import Loading from "@/app/(posts)/my-posts/loading";
import NewPassForm from "@/components/auth/new-password-form";
import { Suspense } from "react";


const NewPasswordPage = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <NewPassForm/>
        </Suspense>
    )
}

export default NewPasswordPage;