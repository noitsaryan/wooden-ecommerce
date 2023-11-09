'use client'
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";

export default function TabShop() {
  return (
      <div className="flex flex-wrap gap-4">
        <Tabs variant="light" aria-label="Tabs variants" color="primary"  classNames={{
          cursor: "w-full bg-Primary",
          tabContent: "group-data-[selected=true]:text-white"
        }}>
          <Tab key="All" title="All"  />
          <Tab key="Residence" title="Residence" />
          <Tab key="Commercial" title="Commercial" />
          <Tab key="Studios" title="Studios" />
          <Tab key="Lighting" title="Lighting" />

        </Tabs>
      </div>
  );
}

