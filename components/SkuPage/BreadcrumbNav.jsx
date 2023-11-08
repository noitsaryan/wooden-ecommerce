'use client'
import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function BreadcrumbNav() {

  return (
        <Breadcrumbs variant="light" className="w-full flex items-start justify-start py-2">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Shop</BreadcrumbItem>
          <BreadcrumbItem>Residence</BreadcrumbItem>
          <BreadcrumbItem>SKU</BreadcrumbItem>
        </Breadcrumbs>
  );
}
