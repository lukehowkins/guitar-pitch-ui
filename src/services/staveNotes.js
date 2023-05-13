import { Accidental, StaveNote, Dot } from 'vexflow';
import { BEATS_TO_DURATIONS_MAP, BEATS_LABEL, BEATS, KEYS } from '../constants/theory';
import { ERROR_INVALID_BEATS, ERROR_INVALID_KEY } from '../constants/errors';
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

export const getStaveNote = (pitch, beats = 4, keySignature = 'C', color = 'black', currentAccidentals = []) => {
  if (!BEATS.includes(+beats)) throw ERROR_INVALID_BEATS;
  const staveNote = new StaveNote({ keys: [pitch], duration: BEATS_TO_DURATIONS_MAP[beats], auto_stem: true });
  staveNote.setStyle({ fillStyle: color, strokeStyle: color });
  addModifier(staveNote, keySignature, currentAccidentals)(pitch);
  // TODO shouldn't be based on a label
  if (BEATS_LABEL[beats].includes('Dotted')) Dot.buildAndAttach([staveNote]);

  return staveNote;
};

export const getStaveChord = (keys, beats = 4, keySignature = 'C', color = 'black', currentAccidentals = []) => {
  if (!BEATS.includes(+beats)) throw ERROR_INVALID_BEATS;
  const staveChord = new StaveNote({ keys, duration: BEATS_TO_DURATIONS_MAP[beats], auto_stem: true });
  staveChord.setStyle({ fillStyle: color, strokeStyle: color });
  keys.forEach(addModifier(staveChord, keySignature, currentAccidentals));
  // TODO shouldn't be based on a label
  if (BEATS_LABEL[beats].includes('Dotted')) Dot.buildAndAttach([staveChord], { all: true });

  return staveChord;
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
