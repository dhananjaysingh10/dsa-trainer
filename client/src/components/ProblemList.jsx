// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { useState } from "react";
import API from "../lib/api"; // ✅ Make sure this is set up
import { useSelector } from "react-redux";

export default function ProblemList({ problems, setProblems, onSolved, roomCode, timeLeft, standing }) {
    const [input, setInput] = useState("");
    const { currentUser } = useSelector((state) => state.user);
    const userId = currentUser?.username;
    const handleAdd = async () => {
        if (input.trim()) {
            try {
                const res = await API.put(`/contest/${roomCode}/add-problem`, {
                    problem: input.trim(),
                });

                setProblems(res.data.problems);
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
            {/* <div className="flex gap-2 mb-2">
                <input
                    placeholder="https://leetcode.com/problems/..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleAdd}>Add</button>
            </div> */}
            <ul className="space-y-2">
                {problems.map((url, idx) => {
                    const slug = url.split("/problems/")[1]?.split("/")[0] || "";
                    const displayName = slug
                        .split("-")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ");

                    return (
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
                                {displayName}
                            </a>

                            <button
                                onClick={() => {
                                    onSolved(idx);
                                }}
                                disabled={!!standing[userId]?.[idx] || timeLeft <= 0}
                                className={`cursor-pointer px-4 py-2 rounded font-semibold transition
            ${!!standing[userId]?.[idx] || timeLeft <= 0
                                        ? "bg-green-300 text-gray-700 cursor-not-allowed border-2"
                                        : "bg-amber-400 hover:bg-amber-500 text-white"
                                    }`}
                            >
                                Mark Solved
                            </button>
                        </li>
                    );
                })}
            </ul>

        </div>
    );
}
