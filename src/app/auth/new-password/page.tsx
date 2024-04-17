import NewPassForm from "@/components/auth/new-password-form";
import { Suspense } from "react";

const NewPasswordPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NewPassForm/>
        </Suspense>
    )
}

export default NewPasswordPage;