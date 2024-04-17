import Loading from "@/app/(posts)/my-posts/loading";
import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { Suspense } from "react";


const NewVerificationPage = () => {
    return ( 
      <Suspense fallback={<Loading/>}>
          <NewVerificationForm />
      </Suspense>
    );
  }
   
  export default NewVerificationPage;