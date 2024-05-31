"use client"
import { IMessage } from '../models/IMessage';
import axios from 'axios';


const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL;
const AUTH_TOKEN= localStorage.getItem('SanaAuthToken');

const headers = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
};


const finalUrl = `${AI_API_URL}/terminal-1`;
export async function sendReqToOpenAI(input: String, messageHistoryList: any[]): Promise<String> {
  try {
    const messageHistoryCombo = [...messageHistoryList , {role:"user",content:input}]

    const postData = {messages: messageHistoryCombo};

  
    const response = await axios.post(finalUrl, postData,{headers});
  
    return response.data.choices[0].message.content;
  } catch (error:any) {
    console.log("Error when communicating with AI", error);
    return error.toString();
  }
}




