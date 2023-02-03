import { Accidental, StaveNote } from 'vexflow';
import { EQUIVALENT_NOTES, INTERVALS, KEYS, NOTES } from '../constants/theory';

const getAccidental = (note, key = 'C') => {
  const nonAccidentals = KEYS[key];
  if (!nonAccidentals) throw new Error(`key ${key} is unknown`);
  if (note.includes('#') && !nonAccidentals.includes(note)) {
    return '#';
  }

  if (note.includes('b') && !nonAccidentals.includes(note)) {
    return 'b';
  }

  if (
    (!note.includes('b') && nonAccidentals.includes(`${note}b`)) ||
    (!note.includes('#') && nonAccidentals.includes(`${note}#`))
  ) {
    return 'n';
  }
  return '';
};

const getNoteInfo = (key = '') => {
  const [note, oct] = key.split('/');
  if (!oct) throw new Error('Note missing octave value');
  return { note, oct: +oct };
};

const addModifier =
  (staveNote, keySignature) =>
  (pitch, index = 0) => {
    const { note } = getNoteInfo(pitch);
    const accidental = getAccidental(note, keySignature);

    if (accidental) staveNote.addModifier(new Accidental(accidental), index);
  };

export const getNoteAbove = (baseNote, interval) => {
  const { note, oct } = getNoteInfo(baseNote);
  const index = NOTES.findIndex((value) => value === note || value === EQUIVALENT_NOTES[note]);
  const step = INTERVALS[interval];

  if (!step) throw new Error(`unknown interval ${interval}`);

  const newIndex = index + step;
  const octIncrease = Math.floor(newIndex / 12);

  if (octIncrease) {
    return `${NOTES[newIndex % 12]}/${oct + octIncrease}`;
  }
  return `${NOTES[newIndex]}/${oct}`;
};

export const getStaveNote = (pitch, keySignature = 'C') => {
  const staveNote = new StaveNote({ keys: [pitch], duration: 4 });
  addModifier(staveNote, keySignature)(pitch);

  return staveNote;
};

export const getStaveChord = (keys, keySignature = 'C') => {
  const staveNote = new StaveNote({ keys, duration: 4 });

  keys.forEach(addModifier(staveNote, keySignature));

  return staveNote;
};
