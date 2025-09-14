import { Settings } from './types';
import { initializeData } from './defaults';
import { defaultSettings } from './defaults';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Settings
export const getSettings = async (): Promise<Settings> => {
  await initializeData();
  const settingsStr = await AsyncStorage.getItem('settings');
  return settingsStr ? JSON.parse(settingsStr) : defaultSettings;
};

export const updateSettings = async (settings: Partial<Settings>): Promise<void> => {
  const existingSettings = await getSettings();
  const newSettings = { ...existingSettings, ...settings };
  await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
};
