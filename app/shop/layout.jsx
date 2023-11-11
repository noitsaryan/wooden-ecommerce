import Paginate from "@/components/ShopPage/Pagination";
import RangeSlider from "@/components/ShopPage/RangeSlider";
import TabShop from "@/components/ShopPage/TabShop";

export default function RootLayout({ children }) {
    return (
        <main className='p-4 space-y-5'>
            <h2 className='font-bold text-3xl text-center'>SHOP <p className='text-sm font-medium'>Your One-Stop Shop for All Your Needs</p></h2>
            <div className='w-full flex md:justify-between  mx-auto items-center md:flex-row flex-col gap-5 justify-center'><TabShop /><RangeSlider /></div>
            <hr />
            {children}
            <span className='w-full flex items-center justify-center'>
                <Paginate />
            </span>
        </main>
    )
}
