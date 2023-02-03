import { KEYS } from '../constants/theory';

const NOTES = ['A', 'Bb', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#'];

export const getRandomKey = () => {
  const keys = Object.keys(KEYS);
  return keys[Math.round(Math.random() * keys.length)];
};

export const getRandomNote = () => {
  return NOTES[Math.round(Math.random() * NOTES.length)];
};
