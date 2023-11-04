'use client'
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Link} from "@nextui-org/react";
import {RiArrowDownSLine } from "react-icons/ri";


export default function DropMenu() {
  return (
    <Dropdown>
      <DropdownTrigger>
      <Link color="foreground" href="#">
            Category <RiArrowDownSLine className="text-xl"/>
          </Link>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="residence">Residence</DropdownItem>
        <DropdownItem key="commercial">Commercial</DropdownItem>
        <DropdownItem key="studios">Studios</DropdownItem>
       
      </DropdownMenu>
    </Dropdown>
  );
}
