import { IMessage } from '../models/IMessage';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function sendReqToOpenAIOld(message): Promise<String> {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": message }],
    });
    console.log(chatCompletion.choices[0].message);

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log("Error when communicating with OPEN AI", error);
    return "Command Failed";
  }
}


export async function sendReqToOpenAI(message: String, messageHistory: any[]): Promise<String> {
  try {

    console.log("message history: ", messageHistory);

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messageHistory,
    });
    console.log(chatCompletion.choices[0].message);

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log("Error when communicating with OPEN AI", error);
    return "Command Failed";
  }
}


