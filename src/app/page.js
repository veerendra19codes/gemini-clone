"use client";

import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown"

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setAnswer("Loading...")
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_PRO_API_KEY}`,
      method: "post",
      data: { "contents": [{ "parts": [{ "text": question }] }] }
    })
    
    setAnswer(response.data.candidates[0].content.parts[0].text);
  }
  return (
    <div className="w-full min-h-screen sm:p-24 p-4 flex flex-col gap-4 justify-start items-center overflow-hidden">
      <textarea name="question" className="border-2 border-gray-500 p-2 rounded-lg sm:w-1/2 w-full" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="question"/>
      <button className="bg-blue-500 hover:bg-blue-400 rounded-lg py-2 px-4 text-white" onClick={handleSubmit}>Submit</button>
      {answer &&
      <div className="sm:w-1/2 w-full flex flex-wrap overflow-x-hidden overflow-y-auto h-auto">
        <ReactMarkdown className="">{answer}</ReactMarkdown>
      </div>
      }
    </div>
  );
}
