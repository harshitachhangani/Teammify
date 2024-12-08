import api, { route } from '@forge/api';

// Function to fetch Jira issues
export const fetchJiraIssues = async () => {
  const response = await api.asApp().requestJira(route`/rest/api/3/search`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  const data = await response.json();
  return data.issues.map((issue: any) => ({
    id: issue.id,
    key: issue.key,
    summary: issue.fields.summary,
    status: issue.fields.status.name,
  }));
};
