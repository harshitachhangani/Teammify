const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy Data for Demonstration
const comments = {
  "TEST-123": [
    { id: 1, text: "This is a comment for issue TEST-123." },
    { id: 2, text: "Another comment for issue TEST-123." }
  ],
};

// Endpoint to fetch comments for a Jira issue
app.post('/api/fetchJiraComments', (req, res) => {
  const { issueId } = req.body;

  if (!issueId) {
    return res.status(400).json({ error: 'Issue ID is required.' });
  }

  const issueComments = comments[issueId] || [];
  res.json({ comments: issueComments });
});

// Endpoint to add a comment to a Jira issue
app.post('/api/addCommentToJira', (req, res) => {
  const { issueId, comment } = req.body;

  if (!issueId || !comment) {
    return res.status(400).json({ error: 'Issue ID and comment are required.' });
  }

  if (!comments[issueId]) {
    comments[issueId] = [];
  }

  const newComment = { id: comments[issueId].length + 1, text: comment };
  comments[issueId].push(newComment);

  res.json({ message: 'Comment added successfully.', comment: newComment });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
