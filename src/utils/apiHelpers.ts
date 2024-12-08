import api, { route } from '@forge/api';

// Function to add a comment to a Jira issue
export const addJiraCommentInternal = async (issueId: string, commentText: string) => {
  const bodyData = {
    body: {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              text: commentText,
              type: "text",
            },
          ],
        },
      ],
    },
  };

  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueId}/comment`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });

  if (!response.ok) {
    console.error('Failed to add comment:', await response.text());
  }
};

// Function to fetch comments for a Jira issue
export const fetchComments = async (issueId: string) => {
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueId}/comment`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  return response.json();
};
