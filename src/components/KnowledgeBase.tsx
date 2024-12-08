// KnowledgeBase.tsx

import React, { useState, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
}

const KnowledgeBase: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch articles from an API or local storage
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // Replace with actual API call to fetch articles
        const fetchedArticles = await fetch('/api/articles').then((res) => res.json());
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Knowledge Base</h1>

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <div>
          {articles.length > 0 ? (
            <ul>
              {articles.map((article) => (
                <li key={article.id}>
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No articles available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
