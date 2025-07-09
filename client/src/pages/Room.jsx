import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../socket/socket";
import API from "../lib/api";
import { Button } from "@/components/ui/button";
import ProblemList from "../components/ProblemList";
import StandingsTable from "../components/StandingsTable";

export default function Room() {
    const { code } = useParams();
    const [problems, setProblems] = useState([]);
    const [standings, setStandings] = useState({});
    const [startTime, setStartTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    useEffect(() => {
        if (!startTime || !duration) return;

        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - new Date(startTime)) / 1000);
            const left = Math.max(duration - elapsed, 0);
            setTimeLeft(left);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, duration]);


    // Timer reference (store contest start time globally)
    // useEffect(() => {
    //     window.startTime = Date.now();
    // }, []);
    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const res = await API.get(`/contest/${code}`);
                const dbStandings = res.data.standings || {};

                // Parse MongoDB Map to plain object
                const parsed = {};
                for (const [userId, standing] of Object.entries(dbStandings)) {
                    parsed[userId] = standing;
                }

                setStandings(parsed);
            } catch (err) {
                console.error("Failed to fetch standings");
            }
        };

        fetchStandings();
    }, [code]);

    // Join socket room
    useEffect(() => {
        socket.emit("joinRoom", code);

        socket.on("standingUpdate", (data) => {
            setStandings((prev) => {
                const updated = { ...prev };
                if (!updated[data.userId]) updated[data.userId] = {};
                updated[data.userId][data.questionIndex] = data.time;
                updated[data.userId].penalty = data.penalty;
                return updated;
            });
        });

        return () => {
            socket.off("standingUpdate");
        };
    }, [code]);

    // Load contest problems from backend (if you want to support loading them later)
    useEffect(() => {
        const fetchContest = async () => {
            try {
                const res = await API.get(`/contest/${code}`);
                setProblems(res.data.problems || []);
                setStartTime(new Date(res.data.startTime));
                setDuration(res.data.duration);
            } catch (err) {
                console.error("Failed to fetch contest");
            }
        };

        fetchContest();
    }, [code]);


    const handleMarkSolved = (index) => {
        if (timeLeft <= 0) {
            alert("⛔ Contest is over. Cannot mark as solved.");
            return;
        }
        const userId = localStorage.getItem("userId") || "guest";
        const penalty = duration - timeLeft; // ⏱️ how long they took

        socket.emit("markSolved", {
            roomCode: code,
            userId,
            questionIndex: index,
            time: penalty, // penalty is the time they took
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Room: {code}</h2>

            {timeLeft !== null && (
                <div className="mb-4 text-lg font-semibold">
                    Time Left: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
                </div>
            )}
            <ProblemList
                problems={problems}
                setProblems={setProblems}
                onSolved={handleMarkSolved}
                roomCode={code}
                timeLeft={timeLeft}
                standing={standings}
            />


            <h3 className="mt-6 mb-2 font-semibold">Live Standings</h3>
            <StandingsTable standings={standings} problems={problems} />
        </div>
    );
}
