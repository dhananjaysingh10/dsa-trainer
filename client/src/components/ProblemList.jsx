// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { useState } from "react";
import API from "../lib/api"; // ✅ Make sure this is set up

export default function ProblemList({ problems, setProblems, onSolved, roomCode, timeLeft, standing }) {
    const [input, setInput] = useState("");
    const userId = localStorage.getItem("userId") || "guest"
    const handleAdd = async () => {
        if (input.trim()) {
            try {
                const res = await API.put(`/contest/${roomCode}/add-problem`, {
                    problem: input.trim(),
                });

                setProblems(res.data.problems); // ✅ update from DB
                setInput("");
            } catch (err) {
                alert("Failed to add problem");
                console.error(err);
            }
        }
    };

    return (
        <div>
            <h3 className="font-semibold mb-2">Problems</h3>
            <div className="flex gap-2 mb-2">
                <input
                    placeholder="https://leetcode.com/problems/..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleAdd}>Add</button>
            </div>
            <ul className="space-y-2">
                {problems.map((url, idx) => (
                    <li
                        key={idx}
                        className="flex justify-between items-center border p-2 rounded"
                    >
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {url}
                        </a>
                        {/* <Button variant="outline" onClick={() => onSolved(idx)}>
                            Mark Solved
                        </Button> */}
                        <button
                            variant="outline"
                            onClick={() => {console.log("Mark solved clicked", idx);onSolved(idx)}}
                            disabled={!!standing[userId]?.[idx] || timeLeft <= 0}
                            className="bg-amber-400 cursor-pointer"
                        >
                            Mark Solved
                        </button>
                        {/* <Button
                            variant="outline"
                            disabled={!!standings[userId]?.[idx]} 
                            onClick={() => onSolved(idx)}
                        >
                            Mark Solved 2
                        </Button> */}

                    </li>
                ))}
            </ul>
        </div>
    );
}
