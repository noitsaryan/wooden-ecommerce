import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import LoginForm from '@/components/forms/LoginForm';
import Image from "next/image";


async function page() {

    
    const session = await getServerSession(authOptions);
    if (session) redirect('/account') 
    return (
        <>
         <main className="w-screen h-screen flex items-center justify-center bg-slate-50 p-2">
      <section className="h-auto md:h-3/4 md:w-1/2 w-full rounded-md flex overflow-hidden bg-white shadow-md ">
      <div className="h-full w-2/5 hidden md:flex">
          <Image src="/formsImg/collov-home-design-H-1j_s0dhCw-unsplash.webp"  width={500} height={500} alt="image"/>
        </div>
         <LoginForm/>
      </section>
    </main>
        </>
    )
}

export default page