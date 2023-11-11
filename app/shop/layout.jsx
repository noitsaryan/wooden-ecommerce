import Head1 from "@/components/ShopPage/Head1";
import Paginate from "@/components/ShopPage/Pagination";
import RangeSlider from "@/components/ShopPage/RangeSlider";
import TabShop from "@/components/ShopPage/TabShop";

export default function RootLayout({ children }) {
    return (
        <main className='p-4 space-y-5'>
           <Head1/>
            <div className='w-full flex md:justify-between  mx-auto items-center md:flex-row flex-col gap-5 justify-center'><TabShop /><RangeSlider /></div>
            <hr />
            {children}
            <span className='w-full flex items-center justify-center'>
                <Paginate />
            </span>
        </main>
    )
}
