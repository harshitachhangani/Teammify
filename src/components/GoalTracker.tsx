import React, { useState } from 'react';

const GoalTracker: React.FC = () => {
  const [goal, setGoal] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleAddComment = async () => {
    const response = await fetch('/api/addCommentToJira', {
      method: 'POST',
      body: JSON.stringify({ issueId: goal, comment }),
    });

    const result = await response.json();
    if (result.success) {
      console.log('Comment added successfully!');
    } else {
      console.log('Failed to add comment');
    }
  };

  return (
    <div>
      <h1>Goal Tracker</h1>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter Jira Issue ID"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your comment"
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default GoalTracker;
