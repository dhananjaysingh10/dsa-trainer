const {fetchLeetCodeQuestions} = require('./lcQuery');

const problemFetcher = async (data) => {
    try {
        const { noOfProblem, easyCount, medCount, hardCount } = data;
        if(noOfProblem !== easyCount + medCount + hardCount) {
            return res.status(500).json({ message: "count mismatch" });
        }
        // difficulty
        //       frontendQuestionId: questionFrontendId
        //       paidOnly: isPaidOnly
        //       title
        //       titleSlug
        const limit = 50; // buffer to account for paid questions
        const getRandomSkip = (max) => Math.floor(Math.random() * max);

        // Fetch EASY
        let variables = {
            categorySlug: "algorithms",
            skip: getRandomSkip(700),
            limit: limit + easyCount,
            filters: { difficulty: "EASY" }
        };
        const easyRes = await fetchLeetCodeQuestions(variables);

        // Fetch MEDIUM
        variables = {
            categorySlug: "algorithms",
            skip: getRandomSkip(1600),
            limit: limit + medCount,
            filters: { difficulty: "MEDIUM" }
        };
        const medRes = await fetchLeetCodeQuestions(variables);

        // Fetch HARD
        variables = {
            categorySlug: "algorithms",
            skip: getRandomSkip(700),
            limit: limit + hardCount,
            filters: { difficulty: "HARD" }
        };
        const hardRes = await fetchLeetCodeQuestions(variables);

        const filterAndLimit = (questions, count) =>
            questions
                .filter(q => !q.paidOnly)
                .slice(0, count)
                .map(({ title, titleSlug, difficulty, frontendQuestionId}) => ({
                    title,
                    titleSlug,
                    difficulty,
                    frontendQuestionId
                }));

        const easyProblems = filterAndLimit(easyRes.data.problemsetQuestionList.questions, easyCount);
        const medProblems = filterAndLimit(medRes.data.problemsetQuestionList.questions, medCount);
        const hardProblems = filterAndLimit(hardRes.data.problemsetQuestionList.questions, hardCount);

        const filteredProblems = [...easyProblems, ...medProblems, ...hardProblems];

        // return res.status(200).json({
        //     total: filteredProblems.length,
        //     filteredProblems
        // });
        // console.log("in funn,", filteredProblems);
        return filteredProblems;
    } catch (err) {
        console.error(err);
        // return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

module.exports = {
    problemFetcher
};
