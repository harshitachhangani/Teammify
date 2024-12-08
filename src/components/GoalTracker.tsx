// GoalTracker.tsx

import React, { useState, useEffect } from 'react';
import { useStateValue } from './StateProvider'; // Assuming you're using a context or global state
import { createJiraRoute, makeJiraApiRequest } from './apiHelper';
import { validateLinkJiraIssueToGoalPayload } from './resolver/validations';

interface Goal {
  id: string;
  name: string;
  status: string;
  linkedIssue?: string;
}

const GoalTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [jiraIssueKey, setJiraIssueKey] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch goals from the backend or local storage (use appropriate method here)
  useEffect(() => {
    const fetchGoals = async () => {
      // Replace with actual logic to fetch goals
      const fetchedGoals = await fetch('/api/goals').then(res => res.json());
      setGoals(fetchedGoals);
    };

    fetchGoals();
  }, []);

  // Handle linking a Jira issue to a goal
  const handleLinkJiraIssue = async () => {
    if (selectedGoal) {
      try {
        // Validate the payload
        validateLinkJiraIssueToGoalPayload({
          goalId: selectedGoal.id,
          issueKey: jiraIssueKey,
        });

        // Link Jira issue to goal
        await fetch(`/api/link-jira-issue`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ goalId: selectedGoal.id, issueKey: jiraIssueKey }),
        });

        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === selectedGoal.id ? { ...goal, linkedIssue: jiraIssueKey } : goal
          )
        );
      } catch (error) {
        console.error('Error linking Jira issue:', error);
      }
    }
  };

  // Handle syncing goal progress with Jira issue status
  const handleSyncGoalProgress = async () => {
    if (selectedGoal?.linkedIssue) {
      setLoading(true);

      try {
        const route = createJiraRoute(`/rest/api/3/issue/${selectedGoal.linkedIssue}`);
        const jiraData = await makeJiraApiRequest(route);

        // Assuming that the Jira response contains the issue status
        const updatedStatus = jiraData.fields.status.name;
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === selectedGoal.id ? { ...goal, status: updatedStatus } : goal
          )
        );
      } catch (error) {
        console.error('Error syncing goal with Jira issue:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Goal Tracker</h1>

      <div>
        <h2>Goals</h2>
        <ul>
          {goals.map((goal) => (
            <li key={goal.id} onClick={() => setSelectedGoal(goal)}>
              {goal.name} - Status: {goal.status}
            </li>
          ))}
        </ul>
      </div>

      {selectedGoal && (
        <div>
          <h3>Selected Goal: {selectedGoal.name}</h3>
          <p>Status: {selectedGoal.status}</p>
          <p>Linked Jira Issue: {selectedGoal.linkedIssue || 'Not Linked'}</p>

          {/* Input for Jira issue key */}
          <input
            type="text"
            placeholder="Enter Jira Issue Key"
            value={jiraIssueKey}
            onChange={(e) => setJiraIssueKey(e.target.value)}
          />

          <button onClick={handleLinkJiraIssue}>Link Jira Issue</button>
          <button onClick={handleSyncGoalProgress} disabled={loading}>
            {loading ? 'Syncing...' : 'Sync Goal with Jira'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;
