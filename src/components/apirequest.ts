import { IMessage } from '../models/IMessage';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// export async function sendReqToOpenAIOld(message): Promise<String> {
//   try {
//     const chatCompletion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ "role": "user", "content": message }],
//     });
//     console.log(chatCompletion.choices[0].message);

//     return chatCompletion.choices[0].message.content;
//   } catch (error) {
//     console.log("Error when communicating with OPEN AI", error);
//     return "Command Failed";
//   }
// }


export async function sendReqToOpenAI(input: String, messageHistory: any[]): Promise<String> {
  try {

    const messageHistoryList = [...messageHistory , {role:"user",content:input}]
    console.log("message history: ", messageHistoryList);

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messageHistoryList,
    });
    console.log(chatCompletion.choices[0].message);

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log("Error when communicating with OPEN AI", error);
    return "";
  }
}


