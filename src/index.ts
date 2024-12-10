import Resolver from '@forge/resolver';
import { searchArticles, addArticle, deleteArticle } from './resolvers/knowledgeResolver';
import { fetchGoals, updateGoalStatus, createGoal } from './resolvers/goalResolver';

const resolver = new Resolver();

// Define resolver for searching articles
resolver.define('searchArticles', async (req) => {
    const { query = '', team = '' } = req.payload;
    return await searchArticles(query, team);
});

// Define resolver for adding an article
resolver.define('addArticle', async (req) => {
    const { article } = req.payload;
    const articleWithId = {
        ...article,
        id: article.id || `article-${Date.now()}` // Generate ID if not provided
    };
    return await addArticle(articleWithId);
});

// Define resolver for deleting an article
resolver.define('deleteArticle', async (req) => {
    const { articleId } = req.payload;
    return await deleteArticle(articleId);
});

// Define resolver for fetching goals
resolver.define('fetchGoals', async () => {
    return await fetchGoals();
});

// Define resolver for updating goal status
resolver.define('updateGoalStatus', async (req) => {
    const { goalId, status } = req.payload;
    return await updateGoalStatus(goalId, status);
});

// Define resolver for creating a goal
resolver.define('createGoal', async (req) => {
    const { goal } = req.payload;
    return await createGoal(goal);
});

// Export the resolver
export const handler = resolver.getDefinitions();
