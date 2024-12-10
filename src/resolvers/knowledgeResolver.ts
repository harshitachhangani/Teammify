import { storage } from '@forge/api';

/**
 * Interface to represent an article structure.
 */
interface Article {
  id: string;
  title: string;
  content: string;
  tags: string[];
  team?: string; // Optional field for team-specific articles
}

/**
 * Fetch all articles from storage.
 */
export const fetchArticles = async (): Promise<Article[]> => {
  const articleIndex = (await storage.get('articleIndex')) as string[] || [];

  const articles = await Promise.all(
    articleIndex.map(async (articleId: string) => {
      const article = (await storage.get(`article:${articleId}`)) as Article | null;
      return article;
    })
  );

  return articles.filter((article): article is Article => article !== null);
};

/**
 * Search articles based on query and optional team filter.
 * @param query - The search query to match article titles, content, or tags.
 * @param team - (Optional) Team identifier to filter team-specific articles.
 */
export const searchArticles = async (query: string, team?: string): Promise<Article[]> => {
  const articles = await fetchArticles();

  return articles.filter((article) => {
    const matchesQuery =
      article.title.includes(query) ||
      article.content.includes(query) ||
      article.tags.some((tag: string) => tag.includes(query));

    const matchesTeam = !team || article.team === team;

    return matchesQuery && matchesTeam;
  });
};

/**
 * Add a new article to storage.
 * @param article - The article object to add.
 */
export const addArticle = async (article: Article): Promise<void> => {
  const articleIndex = (await storage.get('articleIndex')) as string[] || [];

  // Assign an ID to the article
  const articleId = article.id || `article-${Date.now()}`;
  article.id = articleId;

  // Save the article
  await storage.set(`article:${articleId}`, article);

  // Update the index
  articleIndex.push(articleId);
  await storage.set('articleIndex', articleIndex);
};

/**
 * Delete an article from storage.
 * @param articleId - The ID of the article to delete.
 */
export const deleteArticle = async (articleId: string): Promise<void> => {
  const articleIndex = (await storage.get('articleIndex')) as string[] || [];

  // Remove the article from storage
  await storage.delete(`article:${articleId}`);

  // Update the index
  const updatedIndex = articleIndex.filter((id) => id !== articleId);
  await storage.set('articleIndex', updatedIndex);
};
