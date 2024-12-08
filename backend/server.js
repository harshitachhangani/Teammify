const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON

// Add a comment to Jira issue
app.post('/api/addCommentToJira', (req, res) => {
  const { issueId, comment } = req.body;

  if (issueId && comment) {
    // Simulate adding a comment
    console.log(`Adding comment: ${comment} to issue: ${issueId}`);
    res.json({ success: true, message: 'Comment added successfully!' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid input' });
  }
});

// Fetch comments for a Jira issue
app.post('/api/fetchJiraComments', (req, res) => {
  const { issueId } = req.body;

  if (issueId) {
    // Simulate fetching comments
    console.log(`Fetching comments for issue: ${issueId}`);
    res.json({
      comments: [
        { body: 'This is a sample comment 1' },
        { body: 'This is a sample comment 2' },
      ],
    });
  } else {
    res.status(400).json({ success: false, message: 'Invalid input' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
