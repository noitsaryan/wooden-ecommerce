import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import LoginForm from '@/components/forms/LoginForm';

async function page() {

    
    const session = await getServerSession(authOptions);
    if (session) redirect('/dashboard') 
    return (
        <>
            <LoginForm />
        </>
    )
}

export default page