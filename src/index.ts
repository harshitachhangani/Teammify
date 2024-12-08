import api, { route } from '@forge/api';
import  Resolver  from '@forge/resolver';
import { addJiraCommentInternal, fetchComments } from './utils/apiHelpers';

// Initialize the Resolver
const resolver = new Resolver();

// Resolver to add a comment to a Jira issue
resolver.define('addCommentToJira', async (req) => {
  const { issueId, comment } = req.payload;
  await addJiraCommentInternal(issueId, comment);
  return { success: true };
});

// Resolver to fetch all comments for a Jira issue
resolver.define('fetchJiraComments', async (req) => {
  const { issueId } = req.payload;
  const comments = await fetchComments(issueId);
  return { comments };
});

// Export resolver definitions
export const handler = resolver.getDefinitions();
