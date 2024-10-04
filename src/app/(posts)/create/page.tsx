import UserForm from "@/components/form/PostCreate";

const MyForm = () => { 

  return (
      <main className="flex flex-col justify-center items-center h-screen w-full mt-5">
        <h1 className="font-bold text-3xl md:text-4xl text-center mb-4">Enter post deets...</h1>
        <div className="p-4 w-3/4 sm:w-1/3 border shadow-lg">
          <UserForm />
        </div>
      </main>
  );
};

export default MyForm;