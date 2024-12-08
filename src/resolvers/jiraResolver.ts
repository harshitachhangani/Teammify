import Resolver from '@forge/resolver';
import { storage } from '@forge/api';
import api from '@forge/api';

const resolver = new Resolver();

// Resolver to fetch Jira issues
resolver.define('fetchJiraIssues', async () => {
  const route = {
    value: '/rest/api/3/search', // Add 'value' property for the path
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  };

  const response = await api.asApp().requestJira(route); // Use route object
  const issues = await response.json();
  return issues.issues.map((issue) => ({
    id: issue.id,
    key: issue.key,
    summary: issue.fields.summary,
    status: issue.fields.status.name,
  }));
});

// Resolver to link a Jira issue to a goal
resolver.define('linkJiraIssueToGoal', async (req) => {
  const { goalId, issueKey } = req.payload;

  const goal = await storage.get(goalId);
  if (!goal) {
    return { success: false, message: 'Goal not found!' };
  }

  goal.linkedIssue = issueKey;
  await storage.set(goalId, goal);

  return { success: true, message: 'Jira issue linked to goal!' };
});

// Resolver to sync goal progress with Jira issue status
resolver.define('syncGoalWithJira', async (req) => {
  const { goalId } = req.payload;

  const goal = await storage.get(goalId);
  if (!goal || !goal.linkedIssue) {
    return { success: false, message: 'Goal or linked Jira issue not found!' };
  }

  const route = {
    value: `/rest/api/3/issue/${goal.linkedIssue}`, // Add 'value' property for the path
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  };

  const response = await api.asApp().requestJira(route); // Use route object
  const issue = await response.json();
  goal.status = issue.fields.status.name; // Sync goal status with issue status
  await storage.set(goalId, goal);

  return { success: true, message: 'Goal synced with Jira issue status!' };
});

export const handler = resolver.getDefinitions();
