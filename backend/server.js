const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { api } = require('@forge/api'); // Forge API for Jira interactions

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Fetch Jira comments from an issue
app.get('/api/fetchJiraComments', async (req, res) => {
  try {
    const issueKey = req.query.issueKey;  // Example: "PROJECT-123"
    const response = await api.asApp().requestJira(`/rest/api/3/issue/${issueKey}/comment`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching Jira comments:', error);
    res.status(500).json({ error: 'Failed to fetch Jira comments' });
  }
});

// Add a comment to a Jira issue
app.post('/api/addCommentToJira', async (req, res) => {
  try {
    const { issueKey, comment } = req.body;
    const response = await api.asApp().requestJira({
      method: 'POST',
      url: `/rest/api/3/issue/${issueKey}/comment`,
      body: JSON.stringify({ body: comment }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error adding comment to Jira:', error);
    res.status(500).json({ error: 'Failed to add comment to Jira' });
  }
});

// Start the backend server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
