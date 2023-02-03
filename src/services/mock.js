import { NOTES, KEYS, INTERVALS } from '../constants/theory';
import { getNoteAbove, getNoteBelow } from './notes';

const getRandomNumber = (n) => Math.floor(Math.random() * n);

const getRandomEl = (arr) => arr[getRandomNumber(arr.length)];

export const getRandomKey = () => {
  const keys = Object.keys(KEYS);
  return getRandomEl(keys);
};

export const getRandomNote = () => `${getRandomEl(NOTES)}/${getRandomNumber(2) + 4}`;

export const getRandomInterval = (min = 0, max = undefined) => {
  const intervals = Object.keys(INTERVALS).slice(min, max);
  return getRandomEl(intervals);
};

const root = (baseNote, isMajor) => {
  const third = getNoteAbove(baseNote, isMajor ? 'M3' : 'm3');
  const fifth = getNoteAbove(baseNote, 'P5');
  return [baseNote, third, fifth];
};

const firstInversion = (baseNote, isMajor) => {
  const third = getNoteBelow(baseNote, isMajor ? 'm6' : 'M6');
  const fifth = getNoteBelow(baseNote, 'P4');
  return [third, fifth, baseNote];
};

const secondInversion = (baseNote, isMajor) => {
  const third = getNoteAbove(baseNote, isMajor ? 'M3' : 'm3');
  const fifth = getNoteBelow(baseNote, 'P4');
  return [fifth, baseNote, third];
};

export const getRandomTriad = () => {
  const isMajor = Math.random() > 0.5;
  const baseNote = getRandomNote();

  const fn = getRandomEl([root, firstInversion, secondInversion]);
  return fn(baseNote, isMajor);
};
