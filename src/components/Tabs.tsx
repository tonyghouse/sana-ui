import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import CommandPage from "./CommandPage";

export default function Tabs() {

  const [tab, setTab] = useState("tab1");
  const [commandPages, setCommandPages] = useState({});

  const handleTabClick = (selectedTab) => {
    setTab(selectedTab);

    if (!commandPages[selectedTab]) {
      setCommandPages((prevPages) => ({
        ...prevPages,
        [selectedTab]: <CommandPage key={selectedTab} />,
      }));
    }
  };


  return (
    <>
    <div className="flex items-center justify-between px-4 py-1 border-border">
      <div className="flex gap-2">
        <div onClick={()=>handleTabClick("tab1")} className="flex items-center gap-1  px-2 py-0.5 rounded-md">
          <span className="text-xs font-medium">Tab 1</span>
        </div>

        <div onClick={()=>handleTabClick("tab2")} className="flex items-center gap-1  px-2 py-0.5 rounded-md">
          <span className="text-xs font-medium">Tab 2</span>
        </div>

        <div onClick={()=>handleTabClick("tab3")} className="flex items-center gap-1  px-2 py-0.5 rounded-md">
          <span className="text-xs font-medium">Tab 3</span>
        </div>
      </div>
      <Button size="icon" variant="ghost">
        <PlusIcon className="h-3 w-3" />
        <span className="sr-only">Add new tab</span>
      </Button>

    </div>

    {commandPages[tab]}
    
    </>
  )
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
