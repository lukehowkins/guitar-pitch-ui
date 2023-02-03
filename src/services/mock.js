import { NOTES, KEYS, INTERVALS } from '../constants/theory';

const getRandomEl = (arr) => arr[Math.round(Math.random() * arr.length)];

export const getRandomKey = () => {
  const keys = Object.keys(KEYS);
  return getRandomEl(keys);
};

export const getRandomNote = () => getRandomEl(NOTES);

export const getRandomInterval = (min, max) => {
  const intervals = Object.keys(INTERVALS).slice(min, max);
  return getRandomEl(intervals);
};
