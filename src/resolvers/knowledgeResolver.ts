import Resolver from '@forge/resolver';
import { storage } from '@forge/api';

const resolver = new Resolver();

interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  tags: string[];
  author: string;
  team: string;
  createdAt: Date;
}

resolver.define('createKnowledgeArticle', async (req) => {
  const article: KnowledgeArticle = req.payload as  KnowledgeArticle;
  
  // Validate article data
  if (!article.title || !article.content || !article.author) {
    throw new Error('Incomplete article information');
  }

  // Generate unique ID
  article.id = `article_${Date.now()}`;
  article.createdAt = new Date();
  
  // Store article in Forge storage
  await storage.set(`article:${article.id}`, article);
  
  // Update index for search
  const articleIndex = await storage.get('articleIndex') || [];
  articleIndex.push(article.id);
  await storage.set('articleIndex', articleIndex);
  
  return article;
});

resolver.define('searchKnowledge', async (req) => {
  const { query, team } = req.payload;
  
  const articleIndex = await storage.get('articleIndex') || [];
  
  const matchingArticles = await Promise.all(
    articleIndex.map(async (articleId) => {
      const article = await storage.get(`article:${articleId}`);
      
      // Basic search matching
      const matchesQuery = article.title.includes(query) || 
                           article.content.includes(query) ||
                           article.tags.some(tag => tag.includes(query));
      
      const matchesTeam = !team || article.team === team;
      
      return (matchesQuery && matchesTeam) ? article : null;
    })
  );
  
  return matchingArticles.filter(article => article !== null);
});

export default resolver;