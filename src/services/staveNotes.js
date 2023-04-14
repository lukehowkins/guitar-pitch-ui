import { Accidental, StaveNote } from 'vexflow';
import { KEYS } from '../constants/theory';
import { ERROR_INVALID_KEY } from '../constants/errors';
import { getNoteInfo } from './notes';

const getAccidental = (note, key = 'C') => {
  const nonAccidentals = KEYS[key];
  if (!nonAccidentals) throw ERROR_INVALID_KEY;
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

export const getStaveNote = (pitch, keySignature = 'C', color = 'black') => {
  const staveNote = new StaveNote({ keys: [pitch], duration: 4, auto_stem: true });
  staveNote.setStyle({ fillStyle: color, strokeStyle: color });
  addModifier(staveNote, keySignature)(pitch);

  return staveNote;
};

export const getStaveChord = (keys, keySignature = 'C', color = 'black') => {
  const staveNote = new StaveNote({ keys, duration: 4, auto_stem: true });
  staveNote.setStyle({ fillStyle: color, strokeStyle: color });
  keys.forEach(addModifier(staveNote, keySignature));

  return staveNote;
};
