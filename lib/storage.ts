import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Recording {
  id: string;
  text: string;
  audioUri: string;
  timestamp: number;
  duration: number;
}

export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  completed: boolean;
  recordingId?: string;
}

export interface Meeting {
  id: string;
  date: string;
  time: string;
  location: string;
  duration: string;
  recordingId?: string;
}

export interface KeyPoint {
  id: string;
  text: string;
  recordingId: string;
}

const STORAGE_KEYS = {
  RECORDINGS: '@echotalk_recordings',
  TASKS: '@echotalk_tasks',
  MEETINGS: '@echotalk_meetings',
  KEY_POINTS: '@echotalk_key_points',
  SETTINGS: '@echotalk_settings',
};

export interface Settings {
  darkMode: boolean;
  autoSave: boolean;
  businessModel: boolean;
}

// Simple ID generator that works in React Native
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

class Storage {
  async getRecordings(): Promise<Recording[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.RECORDINGS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting recordings:', error);
      return [];
    }
  }

  async addRecording(recording: Omit<Recording, 'id'>): Promise<Recording> {
    try {
      const recordings = await this.getRecordings();
      const newRecording = { ...recording, id: generateId() };
      await AsyncStorage.setItem(
        STORAGE_KEYS.RECORDINGS,
        JSON.stringify([...recordings, newRecording])
      );
      return newRecording;
    } catch (error) {
      console.error('Error adding recording:', error);
      throw error;
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting tasks:', error);
      return [];
    }
  }

  async addTask(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      const tasks = await this.getTasks();
      const newTask = { ...task, id: generateId() };
      await AsyncStorage.setItem(
        STORAGE_KEYS.TASKS,
        JSON.stringify([...tasks, newTask])
      );
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      );
      await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async getMeetings(): Promise<Meeting[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MEETINGS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting meetings:', error);
      return [];
    }
  }

  async addMeeting(meeting: Omit<Meeting, 'id'>): Promise<Meeting> {
    try {
      const meetings = await this.getMeetings();
      const newMeeting = { ...meeting, id: generateId() };
      await AsyncStorage.setItem(
        STORAGE_KEYS.MEETINGS,
        JSON.stringify([...meetings, newMeeting])
      );
      return newMeeting;
    } catch (error) {
      console.error('Error adding meeting:', error);
      throw error;
    }
  }

  async getKeyPoints(): Promise<KeyPoint[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.KEY_POINTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting key points:', error);
      return [];
    }
  }

  async addKeyPoint(keyPoint: Omit<KeyPoint, 'id'>): Promise<KeyPoint> {
    try {
      const keyPoints = await this.getKeyPoints();
      const newKeyPoint = { ...keyPoint, id: generateId() };
      await AsyncStorage.setItem(
        STORAGE_KEYS.KEY_POINTS,
        JSON.stringify([...keyPoints, newKeyPoint])
      );
      return newKeyPoint;
    } catch (error) {
      console.error('Error adding key point:', error);
      throw error;
    }
  }

  async getSettings(): Promise<Settings> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data
        ? JSON.parse(data)
        : {
            darkMode: false,
            autoSave: true,
            businessModel: true,
          };
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        darkMode: false,
        autoSave: true,
        businessModel: true,
      };
    }
  }

  async updateSettings(settings: Partial<Settings>): Promise<void> {
    try {
      const currentSettings = await this.getSettings();
      const updatedSettings = { ...currentSettings, ...settings };
      await AsyncStorage.setItem(
        STORAGE_KEYS.SETTINGS,
        JSON.stringify(updatedSettings)
      );
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
}

export const storage = new Storage();