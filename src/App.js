import React, { useState, useEffect } from 'react';
import { fetchJiraComments, addCommentToJira } from './api';

const App = () => {
  const [issueKey, setIssueKey] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch Jira comments when the component mounts
  useEffect(() => {
    const loadComments = async () => {
      if (issueKey) {
        try {
          const data = await fetchJiraComments(issueKey);
          setComments(data);
        } catch (error) {
          console.error('Error loading comments:', error);
        }
      }
    };

    loadComments();
  }, [issueKey]);

  const handleAddComment = async () => {
    try {
      if (issueKey && newComment) {
        const data = await addCommentToJira(issueKey, newComment);
        setComments((prevComments) => [...prevComments, data]);
        setNewComment('');
      } else {
        alert('Please provide both Issue Key and Comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <h1>Jira Comments</h1>
      <div>
        <input
          type="text"
          placeholder="Issue Key (e.g., PROJECT-123)"
          value={issueKey}
          onChange={(e) => setIssueKey(e.target.value)}
        />
        <textarea
          placeholder="Add your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <h2>Comments for {issueKey}</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
