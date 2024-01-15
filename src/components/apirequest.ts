import { IMessage } from '../models/IMessage';
import axios from 'axios';


const AI_API_URL = import.meta.env.VITE_AI_API_URL;
const AUTH_TOKEN= localStorage.getItem('AuthToken');

const headers = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
};


export async function sendReqToOpenAI(input: String, messageHistoryList: any[]): Promise<String> {
  try {
    const messageHistoryCombo = [...messageHistoryList , {role:"user",content:input}]

    console.log("Message history list: ",messageHistoryCombo);
    

    const postData = {messages: messageHistoryCombo};

  
    const response = await axios.post(`${AI_API_URL}/terminal-1`, postData,{headers});

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("Error when communicating with OPEN AI", error);
    return error.toString();
  }
}


