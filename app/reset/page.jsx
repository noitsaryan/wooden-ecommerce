
import ResetForm from "@/components/forms/ResetForm";
import Image from "next/image";


function Page() {

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-slate-50 p-2">
      <section className="h-auto md:h-3/4 md:w-1/2 w-full rounded-md flex overflow-hidden bg-white shadow-md ">
      <div className="h-full w-2/5 hidden md:flex bg-slate-50 p-1">
          <Image src="/FormsImg/photo-1556020685-ae41abfc9365.webp"  width={500} height={500} alt="image"/>
        </div>
         <ResetForm/>
      </section>
    </main>
  );
}
export default Page;
