import ForgetForm from "@/components/forms/forgetForm";
import Image from "next/image";

function Page() {

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-slate-50 p-2">
      <section className="h-auto md:h-3/4 md:w-1/2 w-full rounded-md flex overflow-hidden bg-white shadow-md ">
        <div className="h-full w-2/5 hidden md:flex">
          <Image src="/formsImg/ionut-vlad-idXQEOxhmvU-unsplash.webp"  width={500} height={500} alt="image"/>
        </div>
        <ForgetForm/>
      </section>
    </main>
  );
}
export default Page;
