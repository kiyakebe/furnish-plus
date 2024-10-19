import SigninForm from "@/components/forms/auth_forms/SigninForm";
import AuthProvider from "@/Providers/AuthProvider";

const Page = () => {
  return (
    <div className="w-[100vw] min-h-[100vh] lg:h-[100vh] flex flex-col lg:flex-row items-center lg:justify-center gap-10 lg:gap-28 p-10 lg:p-40 lg:py-10 bg-slate">
      <div className="lg:w-1/2 grow-0">
        <img
          className=" hidden lg:block m-2 my-4 w-3/4"
          src="/auth.svg"
          alt=""
        />
      </div>

      <div className="w-full mx-20 md:mx-auto md:w-2/3 lg:w-1/2 lg:my-10 h-[100%] border lg:border-0 rounded-lg flex items-center justify-center">
        <AuthProvider>
          <SigninForm />
        </AuthProvider>
      </div>
    </div>
  );
};

export default Page;
