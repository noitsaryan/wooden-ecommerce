'use client'
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import {usePathname} from "next/navigation";

export default function TabShop() {
  const pathname = usePathname();
  return (
      <div className="flex flex-wrap gap-4">
        <Tabs variant="light" aria-label="Tabs variants" selectedKey={pathname} color="primary"
        classNames={{
          cursor: "w-full bg-Primary",
          tabContent: "group-data-[selected=true]:text-white",
          tabList:"grid md:grid-cols-5 grid-cols-4 gap-2"
        }}>
          <Tab key="/shop/all" title="All" href="/shop/all" />
          <Tab key="/shop/residence" title="Residence" href="/shop/residence" />
          <Tab key="/shop/commercial" title="Commercial" href="/shop/commercial" />
          <Tab key="/shop/studio" title="Studio" href="/shop/studio" />

        </Tabs>
      </div>
  );
}

