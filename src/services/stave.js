import { Formatter, Renderer, Stave, Stem, Voice, VoiceMode } from 'vexflow';
import { KEYS } from '../constants/theory';
import { getAccidentals, getStaveChord, getStaveNote } from './staveNotes';
import { getSortedChord, getStepDiff } from './notes';

const MIN_WIDTH = 500;
const MIN_WIDTH_PER_NOTE = 40;
const TREBEL_CLEF_WIDTH = 36;
const HEIGHT = 200;

const forceStemDirection = (sortedChord) => {
  if (getStepDiff('E/3', sortedChord[0]) < 0) return Stem.UP;
  if (getStepDiff('A/6', sortedChord[sortedChord.length - 1]) > 0) return Stem.DOWN;
};

const getStemDirection = (sortedChord1, sortedChord2) => {
  for (let i = 0; i < sortedChord1.length; i++) {
    for (let j = 0; j < sortedChord2.length; j++) {
      const diff = getStepDiff(sortedChord1[i], sortedChord2[j]);
      if (-3 < diff && diff < 3) {
        return getStepDiff('C/5', sortedChord1[i]) > 0 ? Stem.DOWN : Stem.UP;
      }
    }
  }

  if (getStepDiff(sortedChord1[0], sortedChord2[0]) === 0) return;
  return forceStemDirection(sortedChord1) || getStepDiff(sortedChord1[0], sortedChord2[0]) < 0 ? Stem.UP : Stem.DOWN;
};

const setStemDirections = (staveNotes, staveSecondVoice) => {
  if (
    staveNotes.length === staveSecondVoice.length &&
    staveNotes.every((note, index) => staveSecondVoice[index].duration === note.duration)
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

export const generateStaveWithStaveNotes = (ref, staveNotes, key = 'C', timeSignature = '4/4', staveSecondVoice) => {
  ref.innerHTML = '';
  const keySignatureWidth = KEYS[key].length * 20;
  const minWidthPerNote = staveSecondVoice ? 2 * MIN_WIDTH_PER_NOTE : MIN_WIDTH_PER_NOTE;
  const width = Math.max(
    Math.min(MIN_WIDTH, ref.clientWidth),
    Math.max(staveNotes.length, staveSecondVoice?.length || 0) * minWidthPerNote + TREBEL_CLEF_WIDTH + keySignatureWidth
  );
  const renderer = new Renderer(ref, Renderer.Backends.SVG);
  renderer.resize(width, HEIGHT);
  const context = renderer.getContext();

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
    new Formatter().joinVoices(voices).format(voices, width);
    voices.forEach((voice) => voice.draw(context, stave));
  } else {
    Formatter.FormatAndDraw(context, stave, staveNotes);
  }
};

export const generateStaveWithNotes = (ref, notes, key, timeSignature, secondVoice, secondVoiceColor) => {
  let currentAccidentals = [];
  const duration = 4;

  const convertToStave = (note, color) => {
    if (typeof note === 'string') {
      const staveNote = getStaveNote(note, duration, key, color, currentAccidentals);
      currentAccidentals = getAccidentals(staveNote, key, currentAccidentals);
      return staveNote;
    }
    const staveChord = getStaveChord(note, duration, key, color, currentAccidentals);
    currentAccidentals = getAccidentals(staveChord, key, currentAccidentals);
    return staveChord;
  };
  const staveNotes = notes.map((note) => convertToStave(note));
  currentAccidentals = [];
  const staveSecondVoice = secondVoice && secondVoice.map((note) => convertToStave(note, secondVoiceColor));
  return generateStaveWithStaveNotes(ref, staveNotes, key, timeSignature, staveSecondVoice);
};
