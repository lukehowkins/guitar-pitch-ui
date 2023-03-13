import { EQUIVALENT_NOTES, INTERVALS, NOTES } from '../constants/theory';

export const getNoteAboveBelow = (isAbove, baseNote, interval) => {
  const { note, oct } = getNoteInfo(baseNote);
  const index = NOTES.findIndex((value) => value === note || value === EQUIVALENT_NOTES[note]);
  const step = INTERVALS[interval];

  if (!step) throw new Error(`unknown interval ${interval}`);

  const newIndex = isAbove ? index + step : index - step;
  const octChange = Math.floor(newIndex / 12);
  let mod = newIndex % 12;
  if (mod < 0) mod += 12;
  let newNote = NOTES[mod];
  if (newNote.includes('b') && baseNote.includes('#')) newNote = EQUIVALENT_NOTES[newNote];
  else if (newNote.includes('#') && baseNote.includes('b')) newNote = EQUIVALENT_NOTES[newNote];

  return `${newNote}/${oct + octChange}`;
};

export const getNoteAbove = getNoteAboveBelow.bind(null, true);
export const getNoteBelow = getNoteAboveBelow.bind(null, false);

const getNoteIndex = (noteInfo) =>
  NOTES.findIndex((note) => noteInfo.note === note || EQUIVALENT_NOTES[noteInfo.note] === note);

// should this be unrelated to guitar limitations?
export const getNoteInfo = (key) => {
  const [note, oct] = key?.split('/') || [];
  if (!note) throw new Error('Note missing');
  if (!oct) throw new Error('Octave missing');
  if (oct < 2) throw new Error('Octave too low');
  if (oct > 7) throw new Error('Octave too high');
  if (note[0] > 'G' || note.length > 2 || (note[1] && note[1] !== '#' && note[1] !== 'b')) {
    throw new Error('Invalid note');
  }
  return { note: note, oct: +oct };
};

export const getStepDiff = (baseNote, note) => {
  const baseNoteInfo = getNoteInfo(baseNote);
  const noteInfo = getNoteInfo(note);

  const octDiff = (noteInfo.oct - baseNoteInfo.oct) * 12;
  const indexDiff = getNoteIndex(noteInfo) - getNoteIndex(baseNoteInfo);

  return octDiff + indexDiff;
};

export const areNotesSame = (note1, note2) => {
  if (!note1 && !note2) return true;

  const note1Info = getNoteInfo(note1);
  const note2Info = getNoteInfo(note2);

  return (
    note1Info.oct === note2Info.oct &&
    (note1Info.note === note2Info.note || EQUIVALENT_NOTES[note1Info.note] === note2Info.note)
  );
};

export const areChordsSame = (chord1, chord2) => {
  if (!chord1 && !chord2) return true;

  return (
    chord1?.length === chord2?.length &&
    chord1.every((note1) => chord2.some((note2) => areNotesSame(note1, note2))) &&
    chord2.every((note2) => chord1.some((note1) => areNotesSame(note1, note2)))
  );
};

const makeNote = ({ note, oct }) => `${note}/${oct}`;

export const getSortedChord = (chord) => {
  return chord
    .map(getNoteInfo)
    .sort((a, b) => {
      const isOctDiff = a.oct - b.oct;
      if (isOctDiff) return isOctDiff;
      const noteAIndex = getNoteIndex(a);
      const noteBIndex = getNoteIndex(b);
      return noteAIndex - noteBIndex;
    })
    .map(makeNote);
};

export const shiftOct = (note, octShift) => {
  const noteInfo = getNoteInfo(note);
  return `${noteInfo.note}/${noteInfo.oct + octShift}`;
};

export const shiftNote = (note, stepShift) => {
  const noteInfo = getNoteInfo(note);
  const noteIndex = getNoteIndex(noteInfo);
  const newNoteIndex = noteIndex + stepShift;
  const octShift = Math.floor(newNoteIndex / 12);
  let noteShift = newNoteIndex % 12;
  if (noteShift < 0) noteShift += 12;
  const newNote = NOTES[noteShift];
  return `${newNote}/${noteInfo.oct + octShift}`;
};
