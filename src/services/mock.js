import { NOTES, KEYS, INTERVALS } from '../constants/theory';
import { getNoteAbove, getNoteBelow, getNoteInfo, getStepDiff } from './notes';

const getRandomNumber = (n) => Math.floor(Math.random() * n);

const getRandomEl = (arr) => arr[getRandomNumber(arr.length)];

export const getRandomKey = () => {
  const keys = Object.keys(KEYS);
  return getRandomEl(keys);
};

export const getRandomNote = (lowestNote = 'E/2', highestNote = 'E/6') => {
  const { oct: lowestOct } = getNoteInfo(lowestNote);
  const { oct: highestOct } = getNoteInfo(highestNote);
  const note = `${getRandomEl(NOTES)}/${getRandomNumber(1 + highestOct - lowestOct) + lowestOct}`;

  if (getStepDiff(lowestNote, note) < 0) return getRandomNote(lowestNote, highestNote);
  if (getStepDiff(highestNote, note) > 0) return getRandomNote(lowestNote, highestNote);

  return note;
};

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
  const baseNote = getRandomNote('D/3', 'G/5');

  const fn = getRandomEl([root, firstInversion, secondInversion]);
  const triad = fn(baseNote, isMajor);

  try {
    triad.map(getNoteInfo);
  } catch {
    return getRandomTriad();
  }

  return triad;
};
