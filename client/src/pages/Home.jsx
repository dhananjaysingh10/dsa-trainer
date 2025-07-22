// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // // import { Input } from "@/components/ui/input";
// // // import { Button } from "@/components/ui/button";
// // import API from "../lib/api";


// // export default function Home() {
// //   const [code, setCode] = useState("");
// //   const [mode, setMode] = useState("join"); // "join" or "create"
// //   const navigate = useNavigate();

// //   const handleAction = async () => {
// //     const userId = localStorage.getItem("userId") || `user-${Date.now()}`;

// //     localStorage.setItem("userId", userId);

// //     try {
// //       if (mode === "create") {
// //         await API.post("/contest/create", {
// //           code,
// //           problems: [],
// //           startTime: new Date(),
// //           duration: 3600, // default 1 hour
// //         });
// //       }

// //       await API.post("/contest/join", { code, userId });
// //       navigate(`/room/${code}`);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to join or create contest");
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center gap-4 p-8">
// //       <h1 className="text-2xl font-bold">Leetcode Practice Rooms</h1>

// //       <input
// //         placeholder="Enter Room Code"
// //         value={code}
// //         onChange={(e) => setCode(e.target.value)}
// //       />

// //       <div className="flex gap-2">
// //         <button onClick={() => setMode("join")} variant={mode === "join" ? "default" : "outline"}>
// //           Join
// //         </button>
// //         <button onClick={() => setMode("create")} variant={mode === "create" ? "default" : "outline"}>
// //           Create
// //         </button>
// //       </div>

// //       <button onClick={handleAction}>{mode === "join" ? "Join Room" : "Create Room"}</button>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../lib/api";
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import "./x.css";

// // Utility to generate a random code
// function generateRandomCode(length = 8) {
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let code = "";
//   for (let i = 0; i < length; i++) {
//     code += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return code;
// }

// export default function CreateContest() {
//   const [code, setCode] = useState("");
//   const [duration, setDuration] = useState(60);
//   const [numProblems, setNumProblems] = useState(1);
//   const [problems, setProblems] = useState([""]);
//   const [startTime, setStartTime] = useState("");
//   const [creating, setCreating] = useState(false);
//   const [showShare, setShowShare] = useState(false);
//   const [autoFetch, setAutoFetch] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setCode(generateRandomCode());
//   }, []);

//   // Keep problems array in sync with numProblems
//   useEffect(() => {
//     setProblems((prev) => {
//       const arr = [...prev];
//       while (arr.length < numProblems) arr.push("");
//       while (arr.length > numProblems) arr.pop();
//       return arr;
//     });
//   }, [numProblems]);

//   const handleProblemChange = (i, val) => {
//     setProblems((prev) => {
//       const arr = [...prev];
//       arr[i] = val;
//       return arr;
//     });
//   };

//   const handleCreate = async () => {
//     if (!code || !duration || !startTime || problems.some((p) => !p.trim())) {
//       alert("Please fill all fields.");
//       return;
//     }
//     setCreating(true);
//     const userId = localStorage.getItem("userId") || `user-${Date.now()}`;
//     localStorage.setItem("userId", userId);

//     try {
//       await API.post("/contest/create", {
//         code,
//         problems,
//         startTime: new Date(startTime),
//         duration: Number(duration),
//       });
//       await API.post("/contest/join", { code, userId });
//       setShowShare(true);
//     } catch (err) {
//       alert("Failed to create contest");
//     } finally {
//       setCreating(false);
//     }
//   };

//   const handleShare = () => {
//     const msg = `Join my contest! Code: ${code}`;
//     window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
//   };

//   return (
//     <div className="cc-container">
//       <h2 className="text-2xl font-bold mb-4">Create a New Contest</h2>
//       <div className="cc-card">
//         <div className="cc-field">
//           <label>Contest Code</label>
//           <input
//             type="text"
//             value={code}
//             readOnly
//             className="cc-readonly"
//           />
//         </div>
//         <div className="cc-field">
//           <label>Duration (minutes)</label>
//           <input
//             type="number"
//             min="1"
//             value={duration}
//             onChange={e => setDuration(e.target.value)}
//             required
//           />
//         </div>
//         <div className="cc-field">
//           <label>Number of Problems</label>

//           <input
//             type="number"
//             min="1"
//             max="20"
//             value={numProblems}
//             onChange={e => setNumProblems(Number(e.target.value))}
//             required
//           />
//         </div>
//         <div className="cc-field">
//           <label>Problems</label>
//           {problems.map((p, idx) => (
//             <input
//               key={idx}
//               type="text"
//               placeholder={`Problem ${idx + 1} Title`}
//               value={p}
//               onChange={e => handleProblemChange(idx, e.target.value)}
//               className="cc-problem-input"
//               required
//             />
//           ))}
//         </div>
//         <div className="cc-field">
//           <label>Start Time</label>
//           <input
//             type="datetime-local"
//             value={startTime}
//             onChange={e => setStartTime(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           className="cc-btn cc-create"
//           onClick={handleCreate}
//           disabled={creating}
//         >
//           {creating ? "Creating..." : "Create Contest"}
//         </button>
//       </div>
//       {showShare && (
//         <div className="cc-popup">
//           <div className="cc-popup-content">
//             <h3>Contest Created!</h3>
//             <p>Share this code: <b>{code}</b></p>
//             <button className="cc-btn cc-share" onClick={handleShare}>
//               Share on WhatsApp
//             </button>
//             <button className="cc-btn" onClick={() => {
//               setShowShare(false);
//               navigate(`/room/${code}`);
//             }}>
//               Go to Room
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../lib/api";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import "./x.css";

// Utility to generate a random code
function generateRandomCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function CreateContest() {
  const [code, setCode] = useState("");
  const [duration, setDuration] = useState(60);
  const [numProblems, setNumProblems] = useState(1);
  const [problems, setProblems] = useState([""]);
  const [startTime, setStartTime] = useState("");
  const [creating, setCreating] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // New states for problem selection mode and difficulty counts
  const [selectMode, setSelectMode] = useState("manual"); // 'manual' or 'auto'
  const [easyCount, setEasyCount] = useState(0);
  const [medCount, setMedCount] = useState(0);
  const [hardCount, setHardCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setCode(generateRandomCode());
  }, []);

  // Keep problems array in sync with numProblems (only relevant for manual mode)
  useEffect(() => {
    if (selectMode === "manual") {
      setProblems((prev) => {
        const arr = [...prev];
        while (arr.length < numProblems) arr.push("");
        while (arr.length > numProblems) arr.pop();
        return arr;
      });
    }
  }, [numProblems, selectMode]);

  // Reset problems if mode changed to manual
  useEffect(() => {
    if (selectMode === "manual") {
      setProblems(Array(numProblems).fill(""));
    }
  }, [selectMode, numProblems]);

  const handleProblemChange = (i, val) => {
    setProblems((prev) => {
      const arr = [...prev];
      arr[i] = val;
      return arr;
    });
  };

  const handleCreate = async () => {
    // Basic validation
    if (!code || !duration || !startTime) {
      alert("Please fill all required fields.");
      return;
    }

    setCreating(true);
    const userId = localStorage.getItem("userId") || `user-${Date.now()}`;
    localStorage.setItem("userId", userId);

    let finalProblems = problems;

    try {
      if (selectMode === "auto") {
        const totalCount = easyCount + medCount + hardCount;
        if (totalCount <= 0) {
          alert("Please enter at least one problem count for difficulties.");
          setCreating(false);
          return;
        }

        // Call backend API to get random problems
        const response = await API.post("/problems/getProblems", {
          noOfProblem: totalCount,
          easyCount,
          medCount,
          hardCount,
        });
        console.log(response);

        // if (
        //   !response.data ||
        //   !response.data.filteredProblems ||
        //   response.data.filteredProblems.length === 0
        // ) {
        //   alert("No problems fetched from backend for the specified criteria.");
        //   setCreating(false);
        //   return;
        // }

        // Assuming backend problem objects have 'title' or 'name'
        finalProblems = response.data.filteredProblems.map(
          (p) => `https://leetcode.com/problems/${p.titleSlug}/description/`
        );


        if (finalProblems.some((p) => !p || !p.trim())) {
          alert("Some fetched problems are invalid.");
          setCreating(false);
          return;
        }
      } else {
        // Manual mode validation
        if (problems.length === 0 || problems.some((p) => !p.trim())) {
          alert("Please fill all problem titles.");
          setCreating(false);
          return;
        }
      }

      // Create contest with finalProblems array
      await API.post("/contest/create", {
        code,
        problems: finalProblems,
        startTime: new Date(startTime),
        duration: Number(duration),
      });

      // Join the contest
      await API.post("/contest/join", { code, userId });

      setShowShare(true);
    } catch (err) {
      console.error(err);
      alert("Failed to create contest.");
    } finally {
      setCreating(false);
    }
  };

  const handleShare = () => {
    const msg = `Join my contest! Code: ${code}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div className="cc-container">
      <h2 className="text-2xl font-bold mb-4">Create a New Contest</h2>
      <div className="cc-card">
        <div className="cc-field">
          <label>Contest Code</label>
          <input type="text" value={code} readOnly className="cc-readonly" />
        </div>

        <div className="cc-field">
          <label>Duration (minutes)</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div className="cc-field">
          <label>Number of Problems</label>
          <input
            type="number"
            min="1"
            max="20"
            value={numProblems}
            onChange={(e) => setNumProblems(Number(e.target.value))}
            required
            disabled={selectMode === "auto"} // disable this input in auto mode
          />
        </div>

        {/* Select Problem Entry Mode */}
        <div className="cc-field">
          <label>Select Problem Mode</label>
          <RadioGroup
            row
            value={selectMode}
            onChange={(e) => setSelectMode(e.target.value)}
          >
            <label style={{ marginRight: "1rem" }}>
              <Radio value="manual" /> Manual
            </label>
            <label>
              <Radio value="auto" /> Auto (randomly fetch)
            </label>
          </RadioGroup>
        </div>

        {/* Problem Inputs or Difficulty Counts */}
        {selectMode === "manual" ? (
          <div className="cc-field">
            <label>Problems</label>
            {problems.map((p, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Problem ${idx + 1} Title`}
                value={p}
                onChange={(e) => handleProblemChange(idx, e.target.value)}
                className="cc-problem-input"
                required
              />
            ))}
          </div>
        ) : (
          <div className="cc-field">
            <label>Difficulty Distribution (auto fetch)</label>
            <div className="flex flex-col gap-1">
              <h1>Easy</h1>
              <input
                type="number"
                min="0"
                placeholder="Easy"
                value={easyCount}
                onChange={(e) => setEasyCount(Number(e.target.value))}
              />
              <h1>Medium</h1>
              <input
                type="number"
                min="0"
                placeholder="Medium"
                value={medCount}
                onChange={(e) => setMedCount(Number(e.target.value))}
              />
              <h1>Hard</h1>
              <input
                type="number"
                min="0"
                placeholder="Hard"
                value={hardCount}
                onChange={(e) => setHardCount(Number(e.target.value))}
              />
            </div>
          </div>
        )}

        <div className="cc-field">
          <label>Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <button
          className="cc-btn cc-create"
          onClick={handleCreate}
          disabled={creating}
        >
          {creating ? "Creating..." : "Create Contest"}
        </button>
      </div>

      {showShare && (
        <div className="cc-popup">
          <div className="cc-popup-content">
            <h3>Contest Created!</h3>
            <p>
              Share this code: <b>{code}</b>
            </p>
            <button className="cc-btn cc-share" onClick={handleShare}>
              Share on WhatsApp
            </button>
            <button
              className="cc-btn"
              onClick={() => {
                setShowShare(false);
                navigate(`/room/${code}`);
              }}
            >
              Go to Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
