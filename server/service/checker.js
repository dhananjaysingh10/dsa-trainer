const {recentACProblems} = require('./lcQuery');

let variables = {
    username,
    limit,
    room,
    leetcodeId
}

const checkSubmission = async (data) => {
    const {username, limit, room, leetcodeId} = data;
    try {
        variables.username = username;
        variables.limit = limit;
        variables.room = room;
        variables.leetcodeId = leetcodeId;
        const recentAC = recentACProblems(variables);
        const result = recentAC.data.recentAcSubmissionList;
        return result;
    } catch (err) {
        console.log(err);
    }
};
module.exports = {
    checkSubmission
}