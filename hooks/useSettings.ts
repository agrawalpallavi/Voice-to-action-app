import { useState, useEffect, useCallback } from 'react';
import { storage, Settings } from '../lib/storage';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    darkMode: false,
    autoSave: true,
    businessModel: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setError(null);
      const savedSettings = await storage.getSettings();
      setSettings(savedSettings);
    } catch (err) {
      setError('Failed to load settings');
      console.error('Load settings error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = useCallback(async (updates: Partial<Settings>) => {
    try {
      setError(null);
      await storage.updateSettings(updates);
      setSettings((prev) => ({ ...prev, ...updates }));
    } catch (err) {
      setError('Failed to update settings');
      console.error('Update settings error:', err);
    }
  }, []);

  return {
    settings,
    loading,
    error,
    updateSettings,
  };
}