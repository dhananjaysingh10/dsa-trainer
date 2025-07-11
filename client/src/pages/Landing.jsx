import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import API from "../lib/api";
import { FiLogIn } from "react-icons/fi";

export default function Landing() {
  const { currentUser } = useSelector((state) => state.user);
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("join");
  const navigate = useNavigate();

  const handleAction = async () => {
    const userId = localStorage.getItem("userId") || `user-${Date.now()}`;
    localStorage.setItem("userId", userId);
    if (!code.trim()) {
      alert("Please enter a valid room code.");
      return;
    }
    try {
      if (mode === "create") {
        await API.post("/contest/create", {
          code,
          problems: [],
          startTime: new Date(),
          duration: 3600,
        });
      }

      await API.post("/contest/join", { code, userId });
      navigate(`/room/${code}`);
    } catch (err) {
      console.error(err);
      alert("Failed to join or create contest");
    }
  };

  const handleCreateClick = () => {
    navigate("./home");
  };

  return (
    <div className="bg-zinc-800 min-h-screen text-white">
      <div className="w-full flex flex-col md:flex-row items-start justify-center gap-6 p-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 p-4 border border-zinc-600 rounded-lg">

          <div className="flex flex-col justify-center items-center md:items-start p-4 md:w-1/2 gap-4">
            <h1 className="text-3xl font-bold lg:text-6xl text-center md:text-left">
              Welcome to <span className="text-amber-500">Algo</span> Trainer
            </h1>
            {/* <p className="text-gray-300 text-xs sm:text-lg mt-2 text-center md:text-left">
              Here you'll find resources to ace CP & interviews—curated content, contests, and more.
            </p> */}
            <p className="text-gray-300 text-xs sm:text-lg mt-2 text-center md:text-left">
              Practice DSA with friends — create rooms, join live contests, and climb the leaderboard together. Level up your coding skills in a fun, competitive way.
            </p>
            {currentUser ? (
              <div className="w-full flex flex-col sm:flex-row items-center gap-4 mt-4">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter room code"
                  className="w-full sm:w-64 px-4 py-2 rounded-lg bg-zinc-700 border border-gray-500 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  onClick={handleAction}
                  className="w-full sm:w-auto flex items-center gap-2 justify-center bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
                >
                  <FiLogIn />
                  Join
                </button>
                <button
                  onClick={handleCreateClick}
                  className="w-full sm:w-auto bg-white border border-amber-500 text-amber-600 hover:bg-amber-100 font-semibold py-2 px-6 rounded-lg shadow transition"
                >
                  Create
                </button>
              </div>
            ) : (
              <OAuth />
            )}
          </div>

          <img
            src="/landing3.d22824c3a7cfe0a81e1d.png"
            alt="Hero"
            className="md:w-1/2 w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
