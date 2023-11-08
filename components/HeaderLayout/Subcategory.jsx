'use client'
import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const Subcategory = () => {

    const pathname = usePathname();
    return (
        pathname === '/admin-panel' ?
            null
            :
            <>
                <Navbar
                    classNames={{
                        item: [
                            "flex",
                            "relative",
                            "h-full",
                            "items-center",
                            "data-[active=true]:after:content-['']",
                            "data-[active=true]:after:absolute",
                            "data-[active=true]:after:bottom-0",
                            "data-[active=true]:after:left-0",
                            "data-[active=true]:after:right-0",
                            "data-[active=true]:after:h-[2px]",
                            "data-[active=true]:after:rounded-[2px]",
                            "data-[active=true]:after:bg-primary",
                        ],
                    }}
                >

            <NavbarContent className=" mx-auto sm:flex gap-8" justify="center">
                <NavbarItem isActive={ pathname === '/shop/residence' ? true : false }>
                    <Link color="foreground" href="/shop/residence">
                        Residence
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={ pathname === '/shop/commercial' ? true : false } >
                    <Link href="/shop/commercial" aria-current="page">
                        Commercial

                            </Link>
                        </NavbarItem >
                        <NavbarItem isActive={pathname === '/shop/studios' ? true : false} className="ring-b-offset-8">
                            <Link color="foreground" href="/shop/studios">
                                Studios
                            </Link>
                        </NavbarItem>
                    </NavbarContent>

                </Navbar>
                <hr />
            </>
    )
}

export default Subcategory