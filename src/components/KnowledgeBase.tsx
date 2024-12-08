import React, { useState, useEffect } from 'react';

const KnowledgeBase: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [issueId, setIssueId] = useState<string>('');

  const fetchCommentsForIssue = async () => {
    const response = await fetch('/api/fetchJiraComments', {
      method: 'POST',
      body: JSON.stringify({ issueId }),
    });
    const result = await response.json();
    setComments(result.comments);
  };

  return (
    <div>
      <h1>Knowledge Base</h1>
      <input
        type="text"
        value={issueId}
        onChange={(e) => setIssueId(e.target.value)}
        placeholder="Enter Jira Issue ID"
      />
      <button onClick={fetchCommentsForIssue}>Fetch Comments</button>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default KnowledgeBase;
