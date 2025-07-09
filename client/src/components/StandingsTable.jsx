// export default function StandingsTable({ standings }) {
//   const users = Object.entries(standings);

//   return (
//     <table className="w-full table-auto border">
//       <thead>
//         <tr className="bg-gray-100">
//           <th className="p-2 border">User</th>
//           <th className="p-2 border">Solved</th>
//           <th className="p-2 border">Penalty</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map(([user, data]) => {
//           const solved = Object.keys(data).filter(k => k !== 'penalty').length;
//           return (
//             <tr key={user}>
//               <td className="p-2 border">{user}</td>
//               <td className="p-2 border">{solved}</td>
//               <td className="p-2 border">{data.penalty}</td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }

import React from "react";

export default function StandingsTable({ standings, problems }) {
  const problemCount = problems?.length || 0;
  const userId = localStorage.getItem("userId") || "guest";

  // Convert standings object to array with additional metadata
  const entries = Object.entries(standings || {}).map(([uid, data]) => {
    const solved = Object.keys(data)
      .filter((key) => key !== "penalty" && data[key] !== undefined)
      .map(Number);
    return {
      userId: uid,
      solvedCount: solved.length,
      penalty: data.penalty || 0,
      times: data, // includes problem times
    };
  });

  // Sort: first by solvedCount DESC, then by penalty ASC
  entries.sort((a, b) => {
    if (b.solvedCount !== a.solvedCount) {
      return b.solvedCount - a.solvedCount;
    }
    return a.penalty - b.penalty;
  });

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 font-semibold">User</th>
            {Array.from({ length: problemCount }).map((_, idx) => (
              <th key={idx} className="px-4 py-2 font-semibold">Q{idx + 1}</th>
            ))}
            <th className="px-4 py-2 font-semibold">Solved</th>
            <th className="px-4 py-2 font-semibold">Penalty</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.userId}
              className={entry.userId === userId ? "bg-yellow-100" : ""}
            >
              <td className="px-4 py-2 font-mono">{entry.userId}</td>
              {Array.from({ length: problemCount }).map((_, idx) => (
                <td key={idx} className="px-4 py-2 text-center">
                  {entry.times[idx] !== undefined ? `${entry.times[idx]}s` : "–"}
                </td>
              ))}
              <td className="px-4 py-2 text-center font-semibold">
                {entry.solvedCount}
              </td>
              <td className="px-4 py-2 text-center">{entry.penalty}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
