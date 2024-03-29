import { Accidental, StaveNote, StaveTie, Dot } from 'vexflow';
import { BEATS_TO_DURATIONS_MAP, DURATION_LABELS, WHOLE_BEATS, KEYS } from '../constants/theory';
import { ERROR_INVALID_BEATS, ERROR_INVALID_KEY } from '../constants/errors';
import { getNoteInfo } from './notes';
import { getBeats, isRest } from './rhythm';
import { THEMES, getDefaultColor } from './color';

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

// TODO shouldn't be based on a label
const isDottedDuration = (beats) => DURATION_LABELS[beats]?.includes('Dotted');

export const isStaveRest = (staveNote) => staveNote.noteType === 'r';

export const getStaveRest = (beats = 4, color = getDefaultColor(THEMES.LIGHT), key = 'B/4') => {
  const keys = [key];
  const duration = BEATS_TO_DURATIONS_MAP[beats];
  if (!duration) throw ERROR_INVALID_BEATS;
  const isDotted = isDottedDuration(beats);
  const staveRest = new StaveNote({
    keys,
    duration: isDotted ? `${duration}dr` : `${duration}r`,
    dots: isDotted ? 1 : 0,
  });
  staveRest.setStyle({ fillStyle: color, strokeStyle: color });
  if (isDotted) Dot.buildAndAttach([staveRest]);

  return staveRest;
};

export const getStaveNote = (
  pitch,
  beats = 4,
  keySignature = 'C',
  color = getDefaultColor(THEMES.LIGHT),
  currentAccidentals = [],
) => {
  const absBeats = getBeats(beats);
  if (isRest(beats)) return getStaveRest(absBeats, color, pitch);
  if (!WHOLE_BEATS.includes(absBeats)) throw ERROR_INVALID_BEATS;
  const isDotted = isDottedDuration(beats);
  const duration = BEATS_TO_DURATIONS_MAP[absBeats];
  const staveNote = new StaveNote({
    keys: [pitch],
    duration: isDotted ? `${duration}d` : duration,
    auto_stem: true,
    dots: isDotted ? 1 : 0,
  });
  staveNote.setStyle({ fillStyle: color, strokeStyle: color });
  addModifier(staveNote, keySignature, currentAccidentals)(pitch);
  if (isDotted) Dot.buildAndAttach([staveNote]);

  return staveNote;
};

export const getStaveChord = (
  keys,
  beats = 4,
  keySignature = 'C',
  color = getDefaultColor(THEMES.LIGHT),
  currentAccidentals = [],
) => {
  const absBeats = getBeats(beats);
  if (isRest(beats)) return getStaveRest(absBeats, color, keys[0]);
  if (!WHOLE_BEATS.includes(absBeats)) throw ERROR_INVALID_BEATS;
  const isDotted = isDottedDuration(beats);
  const duration = BEATS_TO_DURATIONS_MAP[absBeats];
  const staveChord = new StaveNote({
    keys,
    duration: isDotted ? `${duration}d` : duration,
    auto_stem: true,
    dots: isDotted ? 1 : 0,
  });
  staveChord.setStyle({ fillStyle: color, strokeStyle: color });
  keys.forEach(addModifier(staveChord, keySignature, currentAccidentals));
  if (isDotted) Dot.buildAndAttach([staveChord], { all: true });

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
    ([letter]) => !newAccidentals.find(([newLetter]) => newLetter === letter),
  );

  return [...filteredAccidentals, ...newAccidentals];
};

export const getStaveTie = (firstNote, lastNote) => {
  const indices = firstNote.keys.map((_, i) => i);
  return new StaveTie({
    first_note: firstNote,
    last_note: lastNote,
    first_indices: indices,
    last_indices: indices,
  });
};
