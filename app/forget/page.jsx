import ForgetForm from "@/components/forms/forgetForm";
import Image from "next/image";

function Page() {

  return (
    <main className="w-screen h-screen flex items-center justify-center ">
      <section className="h-auto md:h-3/4 md:w-1/2 w-full rounded-md flex overflow-hidden bg-white shadow-md ">
        <div className="h-full w-2/5 hidden md:flex bg-slate-50 p-1 ">
          <Image src="/formsImg/Forgot password-cuate.svg"  width={500} height={500} alt="image"/>
        </div>
        <ForgetForm/>
      </section>
    </main>
  );
}
export default Page;
