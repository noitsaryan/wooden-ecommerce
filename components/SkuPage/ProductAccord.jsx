"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function ProductAccord({warranty, maintenance}) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion>
      <AccordionItem key="1" aria-label="Maintenance" title="Maintenance">
        <ul className="list-disc text-sm opacity-75 space-y-2">
          {
            maintenance
          }
        </ul>
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Warranty Summary"
        title="Warranty Summary"
      >
        <h2 className="text-sm opacity-75 "> {warranty} </h2>
      </AccordionItem>
      <AccordionItem key="3" aria-label="Return Policy" title="Return Policy">
        <h2>
          <ul className="list-disc text-sm opacity-75 space-y-2">
            <li> The product cannot be returned ones ordered since all the product on the website are MAKE TO ORDER (MTO)
            </li>
          </ul>
        </h2>
      </AccordionItem>
    </Accordion>
  );
}
