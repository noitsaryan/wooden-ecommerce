'use client'
import React from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";

export default function DataTab({des, specs}) {
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
            {des}
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="specification" title="Specification">
          <Card className="shadow-none">
            <CardBody>
             
<div classname="relative overflow-x-auto shadow sm:rounded-md">
      {
        specs && specs.map((elem, i)=>(
          <ul key={i} className="flex items-start space-x-2 text-sm">
            <li>{elem.name}</li> :
            <div dangerouslySetInnerHTML={{__html: elem.value.replace(/\|/g, '<br>')}} />
          </ul>

        ))
      }
</div>

            </CardBody>
          </Card>  
        </Tab>
      
      </Tabs>
    </div>  
  );
}
