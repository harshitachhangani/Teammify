import React, { useState, FormEvent } from 'react';
import invoke from '@forge/api'; // Correct
 // Import invoke from '@forge/api'
import Button from '@atlaskit/button';
import ProgressBar from '@atlaskit/progress-bar';
import TextField from '@atlaskit/textfield';
import { PageLayout } from '@atlaskit/page-layout';
import { Box } from '@atlaskit/primitives';

// Define Goal interface for type safety
interface Goal {
  id: string;
  title: string;
  description: string;
  team: string;
  owner: string;
  progress: number;
  deadline: Date;
}

const GoalTracker: React.FC<{ teamName: string }> = ({ teamName }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Omit<Goal, 'id' | 'owner' | 'progress'>>({
    title: '',
    description: '',
    team: teamName,
    deadline: new Date()
  });

  const fetchTeamGoals = async () => {
    try {
      const teamGoals = await invoke('listTeamGoals', { team: teamName }) as Goal[];
      setGoals(teamGoals);
    } catch (error) {
      console.error('Failed to fetch team goals:', error);
    }
  };

  const createGoal = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const createdGoal = await invoke('createGoal', {
        ...newGoal,
        owner: 'currentUser', // Replace with actual user context
        progress: 0
      }) as Goal;

      setGoals(prevGoals => [...prevGoals, createdGoal]);
      setNewGoal({
        title: '',
        description: '',
        team: teamName,
        deadline: new Date()
      });
    } catch (error) {
      console.error('Failed to create goal:', error);
    }
  };

  // Fetch goals when component mounts
  React.useEffect(() => {
    fetchTeamGoals();
  }, [teamName]);

  return (
    <PageLayout>
      <Box>
        <h2>Team Goals: {teamName}</h2>
        
        {goals.map(goal => (
          <div key={goal.id}>
            <h3>{goal.title}</h3>
            <ProgressBar value={goal.progress / 100} />
          </div>
        ))}
        
        <form onSubmit={createGoal}>
          <TextField
            name="goalTitle"
            label="Goal Title"
            value={newGoal.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setNewGoal(prev => ({ ...prev, title: e.target.value }))
            }
          />
          <TextField
            name="goalDescription"
            label="Goal Description"
            value={newGoal.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setNewGoal(prev => ({ ...prev, description: e.target.value }))
            }
          />
          <Button type="submit">Create Goal</Button>
        </form>
      </Box>
    </PageLayout>
  );
};

export default GoalTracker;
