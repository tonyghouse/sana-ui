"use client"
import axios from 'axios';


const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL;


const finalUrl = `${AI_API_URL}/terminal-1`;
export async function sendReqToOpenAI(input: String, messageHistoryList: any[], authToken:string|null): Promise<String> {
  try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
  
    const messageHistoryCombo = [...messageHistoryList , {role:"user",content:input}]

    const postData = {messages: messageHistoryCombo};

  
    const response = await axios.post(finalUrl, postData,{headers});
  
    return response.data.choices[0].message.content;
  } catch (error:any) {
    console.log("Error when communicating with AI", error);
    return error.toString();
  }
}




