import { Accidental, StaveNote } from 'vexflow';
import { KEYS } from '../constants/theory';
import { getNoteInfo } from './notes';

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

const addModifier =
  (staveNote, keySignature) =>
  (pitch, index = 0) => {
    const { note } = getNoteInfo(pitch);
    const accidental = getAccidental(note, keySignature);

    if (accidental) staveNote.addModifier(new Accidental(accidental), index);
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
