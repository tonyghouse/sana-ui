export function separateContent(input) {
    // The regular expression to match code blocks
    const regex = /```(\w+)\s*([\s\S]*?)```/g;
  
    // List to store content items
    const contentItems = [];
  
    let lastIndex = 0;
  
    // Find all matches
    let match;
    while ((match = regex.exec(input)) !== null) {
      // Add preceding text as a text content item
      if (match.index > lastIndex) {
        contentItems.push({
          isCodeBlock: false,
          content: input.substring(lastIndex, match.index).trim(),
          language: null,
        });
      }
  
      // Add code block content item
      contentItems.push({
        isCodeBlock: true,
        content: match[2].trim(),
        language: match[1].toLowerCase(), // Store the language in lowercase
      });
  
      lastIndex = regex.lastIndex;
    }
  
    // Add the remaining text after the last code block
    if (lastIndex < input.length) {
      contentItems.push({
        isCodeBlock: false,
        content: input.substring(lastIndex).trim(),
        language: null,
      });
    }
  
    return contentItems;
  }
  

