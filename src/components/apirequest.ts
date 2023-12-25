import { IMessage } from '../models/IMessage';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function sendReqToOpenAI(input: String, messageHistoryList: any[]): Promise<String> {
  try {

    const messageHistoryCombo = [...messageHistoryList , {role:"user",content:input}]

    console.log("message history list: ",messageHistoryCombo);


    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messageHistoryCombo,
    });
    console.log(chatCompletion.choices[0].message);

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log("Error when communicating with OPEN AI", error);
    return "";
  }
}


