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
  (staveNote, keySignature, currentAccidentals) =>
  (pitch, index = 0) => {
    const { note } = getNoteInfo(pitch);
    const accidental = getAccidental(note, keySignature);
    const letter = pitch[0];

    if (accidental && !currentAccidentals.includes(`${letter}${accidental}`)) {
      staveNote.addModifier(new Accidental(accidental), index);
    } else if (
      !accidental &&
      (currentAccidentals.includes(`${letter}#`) || currentAccidentals.includes(`${letter}b`))
    ) {
      staveNote.addModifier(new Accidental('n'), index);
    }
  };

export const getStaveNote = (pitch, keySignature = 'C', color = 'black', currentAccidentals = []) => {
  const staveNote = new StaveNote({ keys: [pitch], duration: 4, auto_stem: true });
  staveNote.setStyle({ fillStyle: color, strokeStyle: color });
  addModifier(staveNote, keySignature, currentAccidentals)(pitch);

  return staveNote;
};

export const getStaveChord = (keys, keySignature = 'C', color = 'black', currentAccidentals = []) => {
  const staveNote = new StaveNote({ keys, duration: 4, auto_stem: true });
  staveNote.setStyle({ fillStyle: color, strokeStyle: color });
  keys.forEach(addModifier(staveNote, keySignature, currentAccidentals));

  return staveNote;
};

export const getAccidentals = (staveChord, keySignature = 'C', previousAccidentals = []) => {
  let newAccidentals = staveChord.keys
    ?.map?.(([letter, char2], index) => {
      const accidental = char2 === '#' || char2 === 'b' ? char2 : 'n';
      const modifier = staveChord.modifiers.find((mod) => mod.index === index);
      const modAccidental = modifier?.type;

      if (modAccidental) return `${letter}${modAccidental}`;

      if (previousAccidentals.find(([prevLetter]) => letter === prevLetter)) {
        const nonAccidentals = KEYS[keySignature];
        const keyAccidental = nonAccidentals.find(([keyLetter]) => letter === keyLetter);
        return keyAccidental || `${letter}${accidental}`;
      }
    })
    .filter(Boolean);

  const filteredAccidentals = previousAccidentals.filter(
    ([letter]) => !newAccidentals.find(([newLetter]) => newLetter === letter)
  );

  return [...filteredAccidentals, ...newAccidentals];
};
