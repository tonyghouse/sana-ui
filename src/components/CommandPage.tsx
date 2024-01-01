import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from 'react'
import { IDataBlock } from "../models/IDataBlock"
import CommandBlock from "./CommandBlock"
//testing branch changes from github app
import React from "react"
import { sendReqToOpenAI } from './apirequest'
import { IDataBlockGroup } from "../models/IDataBlockGroup"
import { useKeyboardEvent } from '@react-hookz/web';
import { IMessage } from "../models/IMessage"
import { Input } from "./ui/input"
import { mapToDataBlocks } from "../services/DataBlockService"

function CommandPage() {
  const [input, setInput] = useState("");
  const [dataBlockGroups, setDataBlockGroups] = useState<IDataBlockGroup[]>([]);
  const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [slashbar,setSlashbar] = useState<boolean>(false);

  useKeyboardEvent(
    true,
    (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === '/') {
        setSlashbar((prev)=>!prev);
      }
      
    },
    [],
    { eventOptions: { passive: true } }
  );

  const handleDataSubmit = async () => {

    try {
      if (input && input.trim() !== "") {
        setLoading(true);
        const response: String = await sendReqToOpenAI(input, messageHistory);
        
        if (["clear", "clear context", "clear the context"].includes(input)) {
          setMessageHistory([]);
        } 
        else {
          setMessageHistory([...messageHistory,
            { role: "user", content: input }, { role: "assistant", content: response }]);
        }

        const newDataBlocks: IDataBlock[] = mapToDataBlocks(response, input)
        setDataBlockGroups([...dataBlockGroups, { list: newDataBlocks }]);

        setInput("");
      }
    } catch (error) {
      console.error("Error mapping data:", error);
    } finally {
      setLoading(false);
    }

  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleDataSubmit();
    }
  };



  return (
    <div className="w-[100vw] flex flex-col h-screen border-border font-mono">
      <main className="flex-1  px-2 py-2 overflow-auto">
        <ScrollArea className="h-full w-full px-2 ">
          <div>
            {dataBlockGroups.map((dataBlockGroup, index) => (
              <CommandBlock key={index} dataBlockGroup={dataBlockGroup} />
            ))}
          </div>
        </ScrollArea>
      </main>
      <footer className="px-2 pt-1 border-border">
        <div className="flex flex-col items-center justify-center w-full">
          {loading && <div className="animate-ping text-red-600">-----------------------------</div>}
          {slashbar && <Input placeholder="/" className=" border-[0.01rem] border-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0 " />}
          <Textarea onKeyDown={handleKeyDown} id="data-input"
            className="w-full border-[0.01rem] border-gray-700
            focus-visible:ring-0 focus-visible:ring-offset-0 " placeholder=""
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </footer>
    </div>
  )
}

export default CommandPage;


