import { Accidental, StaveNote } from 'vexflow';
import { KEYS } from '../constants/theory';

const getAccidental = (note, key = 'C') => {
  const nonAccidentals = KEYS[key];
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

export const getNote = (note, oct, key = 'C') => {
  const staveNote = new StaveNote({ keys: [`${note}/${oct}`], duration: 4 });
  const accidental = getAccidental(note, key);

  if (accidental) staveNote.addModifier(new Accidental(accidental));

  return staveNote;
};
