import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTactic = async (name, data) => {
  try {
    await AsyncStorage.setItem(`tactic_${name}`, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving tactic:', e);
  }
};

export const loadTactic = async (name) => {
  try {
    const value = await AsyncStorage.getItem(`tactic_${name}`);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Error loading tactic:', e);
    return null;
  }
};