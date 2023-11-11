'use client'
import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { usePathname } from "next/navigation";


export default function BreadcrumbNav({pName}) {
const path = usePathname();
  return (
        <Breadcrumbs variant="light" className="w-full flex items-start justify-start py-2">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Shop</BreadcrumbItem>
          <BreadcrumbItem>Residence</BreadcrumbItem>
          <BreadcrumbItem>{pName}</BreadcrumbItem>
        </Breadcrumbs>
  );
}
