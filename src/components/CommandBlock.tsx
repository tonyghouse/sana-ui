"use client"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { IDataBlockGroup } from '../models/IDataBlockGroup';

interface ICommandBlockProps {
  dataBlockGroup: IDataBlockGroup
}

function CommandBlock({ dataBlockGroup }: ICommandBlockProps) {
 

  return (
    <div className="mb-8 pb-2 border-y-[0.01rem] hover:border-[0.01rem] border-gray-700 hover:border-sky-500">
      {
        dataBlockGroup.list.map((dataBlock: any, index) => {
          return (
            <div key={index} className="flex justify-start">
              <div className="pr-1">
                {dataBlock.data.role === "user" ? <pre> &gt; </pre> : <pre> ~ </pre>}
              </div>
              {
                dataBlock.data.blockType === "code" ?
                  <div className="flex items-start w-[90%] whitespace-pre">
                    <SyntaxHighlighter
                    
                      language={dataBlock.data.language}
                      style={hybrid}
                    >
                      {dataBlock.data.content}
                    </SyntaxHighlighter>
                  </div>
                  :
                  <div className="flex items-start whitespace-pre-wrap">
                    {dataBlock.data.content}
                  </div>
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default CommandBlock;
