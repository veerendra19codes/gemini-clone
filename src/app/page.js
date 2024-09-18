"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    setAnswer("Loading")
    const response = axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_PRO_API_KEY}`,
      method: "post",
      data: { "contents": [{ "parts": [{ "text": "Explain how AI works" }] }] }
    })
    console.log("response:", response);
    setAnswer("done")
  }
  return (
    <div className="size-full p-24 flex flex-col gap-8 justify-start items-center">
      <textarea name="question" className="border-2 border-gray-500 p-2 rounded-lg" value={question} onChange={(e) => setQuestion(e.target.value)} />
      <button className="bg-blue-500 hover:bg-blue-400 rounded-lg py-2 px-4" onClick={handleSubmit}>Submit</button>
      {answer &&
        <pre>{answer}</pre>
      }
    </div>
  );
}
