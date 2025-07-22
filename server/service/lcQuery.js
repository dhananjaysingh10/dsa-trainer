// const lqQuery = async (req, res) => {
//     try {
//         const { noOfProblem, easyCount, medCount, hardCount } = req.body; 



//     } catch (err) {
//         res.send(500).json({ message: "Something went wrong", erroe: err.message });
//     }
// };

// module.exports = {
//     problemFetcher
// }

// If Node < 18

// const fetch = require('node-fetch');

const query = `
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList: questionList(
    categorySlug: $categorySlug
    limit: $limit
    skip: $skip
    filters: $filters
  ) {
    total: totalNum
    questions: data {
      difficulty
      frontendQuestionId: questionFrontendId
      paidOnly: isPaidOnly
      title
      titleSlug
    }
  }
}
`;

const recentACProblemsQuery = `query recentAcSubmissions($username: String!, $limit: Int!) {
  recentAcSubmissionList(username: $username, limit: $limit) {
    title
    titleSlug
    timestamp
  }
}`;


// const variables = {
//   categorySlug: "",   // Example: "algorithms"
//   skip: 0,
//   limit: 10,
//   filters: {}
// };

const headers = {
  'Content-Type': 'application/json'
};

const fetchLeetCodeQuestions = async (variables)=> {
  try {    
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables })
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
  }
}

const recentACProblems = async (variables) => {
  try {    
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ recentACProblemsQuery, variables })
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
  }
}

module.exports = {
  fetchLeetCodeQuestions,
  recentACProblems
}
