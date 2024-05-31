"use client"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { IDataBlockGroup } from '../models/IDataBlockGroup';
import { useRef } from 'react';
import { findDOMNode } from 'react-dom';

interface ICommandBlockProps {
  dataBlockGroup: IDataBlockGroup
}

function CommandBlock({ dataBlockGroup }: ICommandBlockProps) {
  const textRef = useRef<any>(null);

  const handleCopy = () => {
    console.log('Text copied to clipboard!');
  };

  const clickToCopy = () => {
    console.log("clicked to copy");

    if (textRef.current) {
      const domNode = findDOMNode(textRef.current);
      const textToCopy = domNode?.textContent || '';

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            console.log('Text copied to clipboard:', textToCopy);
            handleCopy();
          })
          .catch((error) => {
            console.error('Error copying text:', error);
          });
      }
    }
  };

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
                  <div className="flex items-start w-[90%] whitespace-pre" onClick={clickToCopy}>
                    <SyntaxHighlighter
                      ref={textRef}
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
