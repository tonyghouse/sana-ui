import { IDataBlock } from "../models/IDataBlock"

import { separateContent } from "../util/GenericUtil"


export function mapToDataBlocks(response: String, input: string) {
    const contentItems = separateContent(response)

    const newDataBlocks: IDataBlock[] = []
    newDataBlocks.push({ data: { content: input, blockType: "text", language: null, role: "user" } })
    contentItems.forEach((item) => {
        if (item.isCodeBlock) {
            newDataBlocks.push({ data: { content: item.content, blockType: "code", language: item.language, role: "assistant" } })
        } else {
            newDataBlocks.push({ data: { content: item.content, blockType: "text", language: null, role: "assistant" } })
        }
    })
    return newDataBlocks
}