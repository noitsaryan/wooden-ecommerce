'use client'
import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";


export default function BreadcrumbNav({pName}) {
const path = usePathname();
  return (
        <Breadcrumbs variant="light" className="w-full flex items-start justify-start py-2">
          <BreadcrumbItem><Link href="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link href="/shop">Shop</Link></BreadcrumbItem>
          <BreadcrumbItem><Link href="/">Residence</Link></BreadcrumbItem>
          <BreadcrumbItem><p className="text-Primary">{pName}</p></BreadcrumbItem>
        </Breadcrumbs>
  );
}
