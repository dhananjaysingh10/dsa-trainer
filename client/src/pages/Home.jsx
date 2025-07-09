import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import API from "../lib/api";

export default function Home() {
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
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold">Leetcode Practice Rooms</h1>

      <Input
        placeholder="Enter Room Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <div className="flex gap-2">
        <Button onClick={() => setMode("join")} variant={mode === "join" ? "default" : "outline"}>
          Join
        </Button>
        <Button onClick={() => setMode("create")} variant={mode === "create" ? "default" : "outline"}>
          Create
        </Button>
      </div>

      <Button onClick={handleAction}>{mode === "join" ? "Join Room" : "Create Room"}</Button>
    </div>
  );
}
