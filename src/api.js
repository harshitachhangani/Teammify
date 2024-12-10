import axios from 'axios';

const backendUrl = 'https://swift-owls-see.loca.lt'; // Replace with your ngrok/localtunnel URL

// Fetch Jira comments
export const fetchJiraComments = async (issueKey) => {
  try {
    const response = await axios.get(`${backendUrl}/api/fetchJiraComments?issueKey=${issueKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Jira comments:', error);
    throw error;
  }
};

// Add comment to Jira
export const addCommentToJira = async (issueKey, comment) => {
  try {
    const response = await axios.post(`${backendUrl}/api/addCommentToJira`, { issueKey, comment });
    return response.data;
  } catch (error) {
    console.error('Error adding comment to Jira:', error);
    throw error;
  }
};
