"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  Input,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { RiSearchLine } from "react-icons/ri";
import DropMenu from "./DropMenu";
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Home", "Shop", "Contact", "About", "Log Out"];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="text-Primary text-3xl font-bold drop-shadow">KASHO</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem  isActive>
          <Link color="foreground" href="#"   className="text-Primary">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <DropMenu/>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Shop
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <Input
        placeholder="Search products"
        size="sm"
        startContent={<RiSearchLine className="text-Border text-xl" />}
        type="search"
        className="max-w-xs text-black h md:flex"
      />

      <Dropdown placement="bottom-end" justify="end">
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform p-1 border-Primary border bg-white outline-none hidden md:flex  "
            size="sm"
            src="https://img.icons8.com/puffy/32/experimental-user-puffy.png"
            alt="experimental-user-puffy"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="text-black rounded-none "

        >
          <DropdownItem
            key="settings"
            className="flex items-center justify-center border-b rounded-none rounded-t-lg"
          >
            <Button
              as={Link}
              className="bg-Primary text-white rounded-md "
              href="/login"
              variant="flat"
              size="sm"
            >
              Log In
            </Button>
            <p className="text-[12px] opacity-70">
              New Customer?{" "}
              <Link href="signup" className="text-Primary text-[12px]  hover:underline font-semibold">Sign Up</Link>
            </p>
          </DropdownItem>

          <DropdownItem key="settings">My Profile</DropdownItem>
          <DropdownItem key="my_cart">My Cart</DropdownItem>
          <DropdownItem key="my_orders">My Orders</DropdownItem>
          <DropdownItem key="track_order">Tack Order</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
