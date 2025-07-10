import React from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import OAuth from "../components/OAuth";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import API from "../lib/api";
export default function Landing() {
  const { currentUser } = useSelector((state) => state.user);
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("join"); // "join" or "create"
  const navigate = useNavigate();

  const handleAction = async () => {
    const userId = localStorage.getItem("userId") || `user-${Date.now()}`;

    localStorage.setItem("userId", userId);

    try {
      if (mode === "create") {
        await API.post("/contest/create", {
          code,
          problems: [],
          startTime: new Date(),
          duration: 3600, // default 1 hour
        });
      }

      await API.post("/contest/join", { code, userId });
      navigate(`/room/${code}`);
    } catch (err) {
      console.error(err);
      alert("Failed to join or create contest");
    }
  };
  return (
    <div className='bg-zinc-700'>
      <div className='w-full flex flex-col md:flex-row items-start justify-center gap-6 p-4'>
        <div className='w-full flex flex-col md:flex-row items-center justify-center gap-6 p-4 border-2'>
          <div className='flex flex-col justify-center items-center border-2 border-red-500 p-4 md:w-1/2'>
            <h1 className='text-3xl font-bold lg:text-6xl text-center md:text-left'>
              Welcome to <span className='text-amber-500'>YetAnother</span> WeBLOG
            </h1>
            <p className='text-gray-500 text-xs sm:text-lg mt-4 text-center md:text-left'>
              Here you'll find a variety of articles, templates, and resources to help you ace your competitive programming journey and prepare for technical interviews with expert guides and curated content.
            </p>
            <div className="flex gap-4 mt-8 w-full justify-center md:justify-start">

              {
                currentUser ? (
                  <>
                  <button button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition">
                    Join
                  </button>
                  <button className="bg-white border border-amber-500 text-amber-600 hover:bg-amber-100 font-semibold py-2 px-6 rounded-lg shadow transition">
                    Create
                  </button>
                </>

                ) : (

                  <OAuth />
                )
              }
            </div>
          </div>
          <img
            src='/landing3.d22824c3a7cfe0a81e1d.png'
            className='md:w-1/2 w-full object-contain'
            alt='Hero Image'
          />
        </div>

      </div>
    </div >
  )
}
