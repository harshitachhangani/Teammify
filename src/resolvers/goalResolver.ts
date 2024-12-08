import  Resolver  from '@forge/resolver';
import { storage } from '@forge/api';

const resolver = new Resolver();

// Resolver to create a new goal
resolver.define('createGoal', async (req) => {
  const { goalId, goalTitle, description, dueDate } = req.payload;

  // Save the goal to Forge Storage
  await storage.set(goalId, {
    goalId,
    goalTitle,
    description,
    dueDate,
    status: 'Pending',
  });

  return { success: true, message: 'Goal created successfully!' };
});

// Resolver to fetch all goals
resolver.define('getGoals', async () => {
    const results: Array<{ key: string; value: any }> = [];
  
    // Use the query builder to iterate over all storage entries
    const queryResult = await storage.query().limit(50).getMany();
  
    for (const entry of queryResult.results) {
      results.push({ key: entry.key, value: entry.value });
    }
  
    return results.map((entry) => entry.value); // Return only the stored values
  });
  
  
  

// Resolver to update the status of a goal
resolver.define('updateGoalStatus', async (req) => {
  const { goalId, status } = req.payload;

  const goal = await storage.get(goalId);
  if (!goal) {
    return { success: false, message: 'Goal not found!' };
  }

  goal.status = status;
  await storage.set(goalId, goal);

  return { success: true, message: 'Goal status updated successfully!' };
});

export const handler = resolver.getDefinitions();
