const Contest = require('../models/Contest');

const socketHandlers = (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('joinRoom', (roomCode) => {
            socket.join(roomCode);
        });

        // socket.on('markSolved', async ({ roomCode, userId, questionIndex, time }) => {
        //   try {
        //     const contest = await Contest.findOne({ code: roomCode });
        //     if (!contest) return;

        //     const standings = contest.standings.get(userId) || {};
        //     standings[questionIndex] = time;
        //     standings.penalty = (standings.penalty || 0) + time;

        //     contest.standings.set(userId, standings);
        //     await contest.save();

        //     io.to(roomCode).emit('standingUpdate', {
        //       userId,
        //       questionIndex,
        //       time,
        //       penalty: standings.penalty
        //     });
        //   } catch (err) {
        //     console.error(err.message);
        //   }
        // });

        // socket.on("markSolved", async ({ roomCode, userId, questionIndex, time }) => {

        //     try {
        //         const contest = await Contest.findOne({ code: roomCode });
        //         if (!contest) return;

        //         if (!contest.standings.has(userId)) {
        //             contest.standings.set(userId, {});
        //         }
        //         const standing = contest.standings.get(userId);
        //         const prev = contest.standings.get(userId) || {};

        //         // 🛡️ Don't overwrite if already solved
        //         if (standing[questionIndex] !== undefined) return;
        //         console.log(`markSolved received - room: ${roomCode}, user: ${userId}, Q${questionIndex}, time: ${time}`);

        //         const updatedStanding = {
        //             ...prev,
        //             [questionIndex]: time,
        //             penalty: (prev.penalty || 0) + time,
        //         };

        //         contest.standings.set(userId, updatedStanding);
        //         await contest.save();

        //         io.to(roomCode).emit("standingUpdate", {
        //             userId,
        //             questionIndex,
        //             time,
        //             penalty: standing.penalty,
        //         });
        //     } catch (err) {
        //         console.error("Error updating standing:", err);
        //     }
        // });
        socket.on("markSolved", async ({ roomCode, userId, questionIndex, time }) => {
            try {
                const contest = await Contest.findOne({ code: roomCode });
                if (!contest) return;

                const now = new Date();
                const endTime = new Date(contest.startTime.getTime() + contest.duration * 1000);

                // ❌ Contest is over
                if (now > endTime) {
                    socket.emit("errorMessage", "⛔ Contest is over. No more submissions allowed.");
                    return;
                }

                const prev = contest.standings.get(userId) || {};
                if (prev[questionIndex] !== undefined) return;

                const updatedStanding = {
                    ...prev,
                    [questionIndex]: time,
                    penalty: (prev.penalty || 0) + time,
                };

                contest.standings.set(userId, updatedStanding);
                await contest.save();

                io.to(roomCode).emit("standingUpdate", {
                    userId,
                    questionIndex,
                    time,
                    penalty: updatedStanding.penalty,
                });
            } catch (err) {
                console.error("Error in markSolved:", err);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

module.exports = socketHandlers;
