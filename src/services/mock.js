import { ERROR_TOO_MANY_BEATS } from '../constants/errors';
import { NOTES, KEYS, INTERVALS, TIMESIGNATURES, BEATS } from '../constants/theory';
import { getNoteAbove, getNoteBelow, getNoteInfo, getSortedChord, getStepDiff } from './notes';

const getRandomNumber = (n) => Math.floor(Math.random() * n);

const getRandomEl = (arr) => arr[getRandomNumber(arr.length)];

export const getRandomKey = (highestNumberOfAccidentals = 7) => {
  const keys = Object.entries(KEYS)
    .filter(([key, value]) => value.length <= highestNumberOfAccidentals)
    .map(([key]) => key);
  return getRandomEl(keys);
};

export const getRandomTimeSignature = (difficulty) => getRandomEl(TIMESIGNATURES.slice(0, 1 + difficulty));

// staved note
export const getRandomNote = (lowestNote = 'E/3', highestNote = 'E/7') => {
  const { oct: lowestOct } = getNoteInfo(lowestNote);
  const { oct: highestOct } = getNoteInfo(highestNote);
  const note = `${getRandomEl(NOTES)}/${getRandomNumber(1 + highestOct - lowestOct) + lowestOct}`;

  if (getStepDiff(lowestNote, note) < 0) return getRandomNote(lowestNote, highestNote);
  if (getStepDiff(highestNote, note) > 0) return getRandomNote(lowestNote, highestNote);

  return note;
};

export const getRandomInterval = (min = 'P1', max = undefined) => {
  const minVal = INTERVALS[min];
  const maxVal = INTERVALS[max];
  const intervals = Object.keys(INTERVALS).slice(minVal, maxVal);
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

export const getRandomTriad = (lowestNote = 'E/3', highestNote = 'E/6') => {
  const isMajor = Math.random() > 0.5;
  const baseNote = getRandomNote(getNoteAbove(lowestNote, 'M6'), 'G/6');

  const fn = getRandomEl([root, firstInversion, secondInversion]);
  const triad = fn(baseNote, isMajor);
  const orderedTriad = getSortedChord(triad);

  try {
    if (getStepDiff(lowestNote, orderedTriad[0]) < 0) return getRandomTriad();
    if (getStepDiff(highestNote, orderedTriad[2]) > 0) return getRandomTriad();
  } catch {
    return getRandomTriad();
  }

  return triad;
};

const rhythmHelper = (totalBeats, supportedBeats, rhythm = []) => {
  const currentDuration = rhythm.reduce((sum, current) => sum + current, 0);
  if (currentDuration === totalBeats) return rhythm;
  if (currentDuration > totalBeats) throw ERROR_TOO_MANY_BEATS;
  const beatsLeft = totalBeats - currentDuration;
  const supportedPossibleBeats = supportedBeats.filter((beats) => beats <= beatsLeft);
  if (!supportedPossibleBeats.length) return rhythmHelper(totalBeats, supportedBeats);
  if (supportedPossibleBeats.includes(beatsLeft) && getRandomNumber(2) > 1) return [...rhythm, beatsLeft];
  const nextDuration = getRandomEl(supportedPossibleBeats);
  if (nextDuration + currentDuration > totalBeats) return rhythmHelper(totalBeats, supportedPossibleBeats, rhythm);
  const newRhythm = [...rhythm, nextDuration];
  return rhythmHelper(totalBeats, supportedBeats, newRhythm);
};

export const getRandomRhythm = (timeSignature, difficulty) => {
  const [numerator, denominator] = timeSignature.split('/');
  const beats = BEATS.slice(0, 2 + difficulty);
  const totalBeats = (16 * numerator) / denominator;

  return rhythmHelper(totalBeats, beats);
};
