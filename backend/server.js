const express = require('express');
const cors = require('cors');
const { api } = require('@forge/api'); // Used to interact with Jira via Forge API

const app = express();
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());

// Endpoint to fetch Jira comments
app.get('/api/fetchJiraComments', async (req, res) => {
  try {
    // Replace with your Jira API call logic here
    const response = await api.asApp().requestJira('/rest/api/3/issue/{issueKey}/comment');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching Jira comments:', error);
    res.status(500).json({ error: 'Error fetching Jira comments' });
  }
});

// Endpoint to add a comment to Jira
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
    console.error('Error adding Jira comment:', error);
    res.status(500).json({ error: 'Error adding Jira comment' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
