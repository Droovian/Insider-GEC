import UserForm from "@/components/form/PostCreate";

const MyForm = () => { 

  return (
      <main className="flex justify-center items-center h-screen w-full mt-5">
        <div className="p-4 w-3/4 sm:w-1/3 border shadow-lg">
          <UserForm />
        </div>
      </main>
  );
};

export default MyForm;