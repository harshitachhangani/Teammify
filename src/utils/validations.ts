// validations.ts

// Function to validate if a goal ID is valid
export const isValidGoalId = (goalId: string): boolean => {
    return typeof goalId === 'string' && goalId.length > 0;
  };
  
  // Function to validate if a Jira issue key is valid
  export const isValidJiraIssueKey = (issueKey: string): boolean => {
    const jiraIssueKeyPattern = /^[A-Z]+-\d+$/; // Jira issue keys usually follow a pattern like "PROJ-123"
    return jiraIssueKeyPattern.test(issueKey);
  };
  
  // Function to validate request payload for linking Jira issues to goals
  export const validateLinkJiraIssueToGoalPayload = (payload: { goalId: string, issueKey: string }) => {
    if (!isValidGoalId(payload.goalId)) {
      throw new Error('Invalid Goal ID');
    }
    if (!isValidJiraIssueKey(payload.issueKey)) {
      throw new Error('Invalid Jira Issue Key');
    }
  };
  
  // Function to validate request payload for syncing goal progress
  export const validateSyncGoalWithJiraPayload = (payload: { goalId: string }) => {
    if (!isValidGoalId(payload.goalId)) {
      throw new Error('Invalid Goal ID');
    }
  };
  