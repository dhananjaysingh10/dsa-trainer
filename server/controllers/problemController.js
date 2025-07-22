const { errorHandler } = require("../utils/error.js");
const {problemFetcher} = require("../service/problemFetcher.js");

const getProblems = async (req, res) => {
    try {
        const { noOfProblem, easyCount, medCount, hardCount } = req.body;
        console.log("in controller", req.body);
        const filteredProblems = await problemFetcher(req.body);
        console.log(filteredProblems);
        return res.status(200).json({
            total: filteredProblems.length,
            filteredProblems
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};


module.exports = {
    getProblems
}