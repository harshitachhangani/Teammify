// apiHelper.ts

import api from '@forge/api';

// Helper function to make a Jira API request
export const makeJiraApiRequest = async (route: { value: string, method: string, headers: object }) => {
  try {
    const response = await api.asApp().requestJira(route);
    if (!response.ok) {
      throw new Error(`Error fetching data from Jira: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Jira API Request failed:', error);
    throw new Error('Failed to make Jira API request');
  }
};

// Helper function to create a route for Jira API requests
export const createJiraRoute = (path: string) => {
  return {
    value: path,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  };
};
