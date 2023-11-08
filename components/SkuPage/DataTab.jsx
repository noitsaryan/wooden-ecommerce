'use client'
import React from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";

export default function DataTab() {
  const [selected, setSelected] = React.useState("photos");

  return (
    <div className="flex w-full flex-col">
      <Tabs 
        aria-label="Options"         
        selectedKey={selected}
        onSelectionChange={setSelected}
        variant="underlined"
        classNames={{
            cursor:"bg-Primary",
        }}
      >
        <Tab key="description" title="Description" className="text-sm">
          <Card  className="shadow-none">
            <CardBody>
            The GetRest® Adapt 5" Ortho mattress is a 4-layered cooling memory foam mattress with Biocrystal® Stress Relief Technology. It offers optimal comfort, support, and temperature regulation for a restful sleep. The Ortho design aligns the spine and relieves pressure points, while the Biocrystal® technology promotes relaxation and well-being.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="specification" title="Specification">
          <Card className="shadow-none">
            <CardBody>
             
<div class="relative overflow-x-auto shadow sm:rounded-md">
    <table class="w-full text-sm text-left text-black dark:text-blue-100">
 
        <tbody>
            <tr class="bg-white border-b border-slate-100">
                <th scope="row" class="px-6 py-4 font-medium bg-slate-50 text-black whitespace-nowrap dark:text-black">
                Type
                </th>
                <td class="px-6 py-4">
                Memory Foam
                </td>
                <td class="px-6 py-4 bg-slate-50">
                Spine Alignment
                </td>
                <td class="px-6 py-4">
                    Yes
                </td>
              
            </tr>
            <tr class="bg-white border-b border-slate-100">
                <th scope="row" class="px-6 py-4 font-medium bg-slate-50 text-black whitespace-nowrap dark:text-black">
                Layers
                </th>
                <td class="px-6 py-4">
                    4
                </td>
                <td class="px-6 py-4 bg-slate-50">
                Cover Material
                </td>
                <td class="px-6 py-4">
                Not specified
                </td>
              
            </tr>
          
        
           
        </tbody>
    </table>
</div>

            </CardBody>
          </Card>  
        </Tab>
      
      </Tabs>
    </div>  
  );
}
