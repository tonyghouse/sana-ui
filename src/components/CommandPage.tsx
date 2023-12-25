import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'
import { IDataBlock } from "../models/IDataBlock"
import { separateContent } from "../util/GenericUtil"
import CommandBlock from "./CommandBlock"
import { sendDataReqToOpenAI } from './apirequest'
import { IDataBlockGroup } from "../models/IDataBlockGroup"
import { useKeyboardEvent } from '@react-hookz/web';

export default function MainWindow() {
  const [input, setInput] = useState("");
  const [dataBlockGroups, setDataBlockGroups] = useState<IDataBlockGroup[]>([]);
  const [loading, setLoading] = useState(false);
  

  const handleDataSubmit = async () => {


    try {
      if (input && input.trim() !== "") {
        setLoading(true);
        const response: String = await sendDataReqToOpenAI(input);
        //console.log(response);
        const newDataBlocks: IDataBlock[] = mapToDataBlocks(response, input)
        setDataBlockGroups([...dataBlockGroups, {list:newDataBlocks}]);

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
    <div className="w-full flex flex-col h-screen border-border font-mono">
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
          {loading && <div className="animate-ping text-red-600">-------------------------------------</div>}
          <Textarea onKeyDown={handleKeyDown} id="data-input"
            className="w-full border-[0.01rem] border-gray-700" placeholder=""
            onChange={(e) => setInput(e.target.value)}
          />
          {/* <div className="animate-pulse" onClick={handleDataSubmit}>
            ----
          </div > */}
        </div>
      </footer>
    </div>
  )
}

function mapToDataBlocks(response: String, input: string) {
  const contentItems = separateContent(response)

  const newDataBlocks: IDataBlock[] = []
  newDataBlocks.push({ data: { content: input, blockType: "text", language: null, user: "user" } })
  contentItems.forEach((item) => {
    if (item.isCodeBlock) {
      newDataBlocks.push({ data: { content: item.content, blockType: "code", language: item.language, user: "ai" } })
    } else {
      newDataBlocks.push({ data: { content: item.content, blockType: "text", language: null, user: "ai" } })
    }
  })
  return newDataBlocks
}

