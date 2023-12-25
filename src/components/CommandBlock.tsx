import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { IDataBlockGroup } from '../models/IDataBlockGroup';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRef } from 'react';

interface ICommandBlockProps {
  dataBlockGroup: IDataBlockGroup

}

function CommandBlock({ dataBlockGroup }: ICommandBlockProps) {
  const textRef = useRef<HTMLElement | null>(null);

  const handleCopy = () => {
    alert('Text copied to clipboard!');
  };


  const clickToCopy = () => {
    console.log("clicked to copy")
    const textToCopy = textRef?.current?.textContent;

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log('Text copied to clipboard:', textToCopy);
        })
        .catch((error) => {
          console.error('Error copying text:', error);
        });
    }
  };

    return (
      <div className="mb-8 pb-2 border-y-[0.01rem] hover:border-[0.01rem] border-gray-700
                      hover:border-sky-500  ">
        {
          dataBlockGroup.list.map((dataBlock, index) => {
            return <div className="flex justify-start">
              <div className="pr-1">
                {dataBlock.data.role === "user" ? <pre> &gt; </pre> : <pre> ~ </pre>}
              </div>
              {
                dataBlock.data.blockType === "code" ?
                  <>
                    <SyntaxHighlighter ref={textRef} className="flex items-start w-[70%] whitespace-pre "
                      language={dataBlock.data.language} style={hybrid}>
                      {dataBlock.data.content}
                    </SyntaxHighlighter>
                  </>
                  :
                  <div className="flex items-start whitespace-pre-wrap ">
                    {dataBlock.data.content}
                  </div>
              }
            </div>
          })
        }
      </div>
    )
  }

  export default CommandBlock;