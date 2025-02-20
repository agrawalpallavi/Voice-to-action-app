import { useState, useEffect, useCallback } from 'react';
import { storage, Task } from '../lib/storage';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setError(null);
      const savedTasks = await storage.getTasks();
      setTasks(savedTasks);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Load tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = useCallback(async (task: Omit<Task, 'id'>) => {
    try {
      setError(null);
      const newTask = await storage.addTask(task);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError('Failed to add task');
      console.error('Add task error:', err);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (taskId: string, updates: Partial<Task>) => {
    try {
      setError(null);
      await storage.updateTask(taskId, updates);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        )
      );
    } catch (err) {
      setError('Failed to update task');
      console.error('Update task error:', err);
      throw err;
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    refreshTasks: loadTasks,
  };
}