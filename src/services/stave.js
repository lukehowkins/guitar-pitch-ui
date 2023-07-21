import { Formatter, Renderer, Stave, Beam, Stem, Voice, VoiceMode } from 'vexflow';
import { KEYS } from '../constants/theory';
import { getAccidentals, getStaveChord, getStaveNote, isStaveRest } from './staveNotes';
import { getSortedChord, getStepDiff } from './notes';
import { areChordsSame } from './notes';

const MIN_WIDTH = 500;
const MIN_WIDTH_PER_NOTE = 40; // try make up to 60 if chord / accidentals?
const TREBLE_CLEF_WIDTH = 36;
const HEIGHT = 200;

const forceStemDirection = (sortedChord) => {
  if (getStepDiff('E/3', sortedChord[0]) < 0) return Stem.UP;
  if (getStepDiff('A/6', sortedChord[sortedChord.length - 1]) > 0) return Stem.DOWN;
};

const getStemDirection = (sortedChord1, sortedChord2) => {
  const forceStem = forceStemDirection(sortedChord1);
  if (forceStem) return forceStem;

  for (let i = 0; i < sortedChord1.length; i++) {
    for (let j = 0; j < sortedChord2.length; j++) {
      const diff = getStepDiff(sortedChord1[i], sortedChord2[j]);
      if (-3 < diff && diff < 3) {
        return getStepDiff('C/5', sortedChord1[i]) > 0 ? Stem.DOWN : Stem.UP;
      }
    }
  }

  if (getStepDiff(sortedChord1[0], sortedChord2[0]) === 0) return;
  return getStepDiff(sortedChord1[0], sortedChord2[0]) < 0 ? Stem.UP : Stem.DOWN;
};

const setStemDirections = (staveNotes, staveSecondVoice) => {
  if (
    staveNotes.length === staveSecondVoice.length &&
    staveNotes.every((note, index) => staveSecondVoice[index].beats === note.beats)
  ) {
    for (let i = 0; i < staveNotes.length; i++) {
      const sortedChord1 = getSortedChord(staveNotes[i].keys);
      const sortedChord2 = getSortedChord(staveSecondVoice[i].keys);

      staveNotes[i].setStemDirection(getStemDirection(sortedChord1, sortedChord2));
      staveSecondVoice[i].setStemDirection(getStemDirection(sortedChord2, sortedChord1));
    }
  } else {
    let staveDirection = '';
    let secondStaveDirection = '';
    for (let i = 0; i < Math.max(staveNotes.length, staveSecondVoice.length); i++) {
      const sortedChord1 = getSortedChord(staveNotes[i]?.keys);
      const sortedChord2 = getSortedChord(staveSecondVoice[i]?.keys);
      if (i === 0) {
        staveDirection = getStemDirection(sortedChord1, sortedChord2);
        secondStaveDirection = getStemDirection(sortedChord2, sortedChord1);
      }

      staveNotes[i]?.setStemDirection(forceStemDirection(sortedChord1) || staveDirection);
      staveSecondVoice[i]?.setStemDirection(forceStemDirection(sortedChord2) || secondStaveDirection);
    }
  }
};

const getBeamNotes = (staveNotesGrouped) => {
  if (!staveNotesGrouped?.length) return [];

  return staveNotesGrouped
    .map((staveNotesOrRests) => {
      if (!Array.isArray(staveNotesOrRests)) return;
      const staveNotes = staveNotesOrRests.filter((staveNote) => !isStaveRest(staveNote));
      if (staveNotes.length > 1 && staveNotes.every((staveNote) => +staveNote.duration >= 8)) {
        // if all same notes, then preserve stem direction. For rhythm rumble
        const allSameNotes = staveNotes.every((staveNote) => areChordsSame(staveNote.keys, staveNotes[0].keys));
        const config = allSameNotes ? undefined : { auto_stem: true, maintain_stem_directions: false };
        const beam = new Beam(staveNotes, config);
        beam.setStyle(staveNotes[0].style);
        return beam;
      }
    })
    .filter(Boolean);
};

/**
 * staveNotesGrouped is either
 * an array of arrays, representing a list of beamed notes
 * an array, representing a list of notes
 */
export const generateStaveWithStaveNotes = (
  ref,
  staveNotesGrouped,
  key = 'C',
  timeSignature = '4/4',
  staveSecondVoiceGrouped,
  ties,
) => {
  ref.innerHTML = '';

  const staveNotes = staveNotesGrouped.flat();
  const staveSecondVoice = staveSecondVoiceGrouped?.length && staveSecondVoiceGrouped.flat();
  const keySignatureWidth = KEYS[key].length * 20;
  const minWidthPerNote = staveSecondVoice ? 2 * MIN_WIDTH_PER_NOTE : MIN_WIDTH_PER_NOTE;
  const calcWidth =
    Math.max(staveNotes.length, staveSecondVoice?.length || 0) * minWidthPerNote +
    TREBLE_CLEF_WIDTH +
    keySignatureWidth;
  const width = Math.max(MIN_WIDTH, Math.min(ref.clientWidth, calcWidth));
  const renderer = new Renderer(ref, Renderer.Backends.SVG);
  renderer.resize(width, HEIGHT); // Total img size
  const context = renderer.getContext();
  // context.fillStyle = getDefaultColor();
  // context.strokeStyle = getDefaultColor();

  const stave = new Stave(0, 40, width - 1);
  stave.addClef('treble').addKeySignature(key).addTimeSignature(timeSignature);
  stave.setContext(context).draw();

  if (staveSecondVoice) {
    setStemDirections(staveNotes, staveSecondVoice);

    const [numbBeats] = timeSignature.split('/')[0];
    const voice1 = new Voice({ num_beats: numbBeats });
    voice1.setMode(VoiceMode.SOFT);
    voice1.addTickables(staveNotes);

    const voice2 = new Voice({ num_beats: numbBeats });
    voice2.setMode(VoiceMode.SOFT);
    voice2.addTickables(staveSecondVoice);

    const voices = [voice1, voice2];
    const beams = getBeamNotes(staveNotesGrouped);
    const beams2 = getBeamNotes(staveSecondVoiceGrouped);
    const noteAreaWidth = Math.floor(stave.getNoteEndX() - stave.getNoteStartX() - 10);
    new Formatter().joinVoices(voices).format(voices, noteAreaWidth);
    voices.forEach((voice) => voice.draw(context, stave));
    [...beams, ...beams2].forEach((b) => b.setContext(context).draw());
  } else {
    const beams = getBeamNotes(staveNotesGrouped);
    Formatter.FormatAndDraw(context, stave, staveNotes);
    beams.forEach((b) => b.setContext(context).draw());
  }

  if (ties?.length) {
    ties.forEach((t) => {
      t.setStyle(t.notes.first_note.style);
      t.setContext(context).draw();
    });
  }
};

export const generateStaveWithNotes = (ref, notes, key, timeSignature, secondVoice, secondVoiceColor) => {
  let currentAccidentals = [];
  const beats = 4;

  const convertToStave = (note, color) => {
    if (typeof note === 'string') {
      const staveNote = getStaveNote(note, beats, key, color, currentAccidentals);
      currentAccidentals = getAccidentals(staveNote, key, currentAccidentals);
      return staveNote;
    }
    const staveChord = getStaveChord(note, beats, key, color, currentAccidentals);
    currentAccidentals = getAccidentals(staveChord, key, currentAccidentals);
    return staveChord;
  };
  const staveNotes = notes.map((note) => convertToStave(note));
  currentAccidentals = [];
  const staveSecondVoice = secondVoice && secondVoice.map((note) => convertToStave(note, secondVoiceColor));
  return generateStaveWithStaveNotes(ref, staveNotes, key, timeSignature, staveSecondVoice);
};
