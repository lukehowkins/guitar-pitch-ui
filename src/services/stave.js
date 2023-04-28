import { Formatter, Renderer, Stave, Stem, Voice, VoiceMode } from 'vexflow';
import { getAccidentals, getStaveChord, getStaveNote } from './staveNotes';
import { getSortedChord, getStepDiff } from './notes';

const MIN_WIDTH = 250 + Stave.defaultPadding;
const MIN_WIDTH_PER_NOTE = 100;
const HEIGHT = 200;

const getStemDirection = (sortedChord1, sortedChord2) => {
  for (let i = 0; i < sortedChord1.length; i++) {
    for (let j = 0; j < sortedChord2.length; j++) {
      const diff = getStepDiff(sortedChord1[i], sortedChord2[j]);
      if (-3 < diff && diff < 3) {
        return getStepDiff('C/5', sortedChord1[i]) > 0 ? Stem.DOWN : Stem.UP;
      }
    }
  }

  if (getStepDiff('Ab/2', sortedChord1[0]) < 0) return Stem.UP;
  if (getStepDiff('A/6', sortedChord1[sortedChord1.length - 1]) > 0) return Stem.DOWN;
  if (getStepDiff(sortedChord1[0], sortedChord2[0]) === 0) return;
  return getStepDiff(sortedChord1[0], sortedChord2[0]) < 0 ? Stem.UP : Stem.DOWN;
};

export const generateStaveWithStaveNotes = (ref, staveNotes, key = 'C', staveSecondVoice) => {
  ref.innerHTML = '';
  const width = Math.min(Math.max(ref.clientWidth, MIN_WIDTH), staveNotes.length * MIN_WIDTH_PER_NOTE + 200);
  const staveWidth = width - 80;
  const renderer = new Renderer(ref, Renderer.Backends.SVG);
  renderer.resize(width, HEIGHT);
  const context = renderer.getContext();

  const stave = new Stave(10, 40, staveWidth);
  stave.addClef('treble').addKeySignature(key);
  stave.setContext(context).draw();

  if (staveSecondVoice) {
    if (staveNotes.length !== staveSecondVoice.length) throw new Error('voices should have same length');

    for (let i = 0; i < staveNotes.length; i++) {
      const sortedChord1 = getSortedChord(staveNotes[i].keys);
      const sortedChord2 = getSortedChord(staveSecondVoice[i].keys);

      staveNotes[i].setStemDirection(getStemDirection(sortedChord1, sortedChord2));
      staveSecondVoice[i].setStemDirection(getStemDirection(sortedChord2, sortedChord1));
    }

    const voice1 = new Voice({ num_beats: staveNotes.length });
    voice1.setMode(VoiceMode.FULL);
    voice1.addTickables(staveNotes);

    const voice2 = new Voice({ num_beats: staveSecondVoice.length });
    voice2.setMode(VoiceMode.FULL);
    voice2.addTickables(staveSecondVoice);

    const voices = [voice1, voice2];
    new Formatter().joinVoices(voices).format(voices, staveWidth);
    voices.forEach((voice) => voice.draw(context, stave));
  } else {
    Formatter.FormatAndDraw(context, stave, staveNotes);
  }
};

export const generateStaveWithNotes = (ref, notes, key, secondVoice, secondVoiceColor) => {
  let currentAccidentals = [];
  const convertToStave = (note, color) => {
    if (typeof note === 'string') {
      const staveNote = getStaveNote(note, key, color, currentAccidentals);
      currentAccidentals = getAccidentals(staveNote, key, currentAccidentals);
      return staveNote;
    }
    const staveChord = getStaveChord(note, key, color, currentAccidentals);
    currentAccidentals = getAccidentals(staveChord, key, currentAccidentals);
    return staveChord;
  };
  const staveNotes = notes.map((note) => convertToStave(note));
  currentAccidentals = [];
  const staveSecondVoice = secondVoice && secondVoice.map((note) => convertToStave(note, secondVoiceColor));
  return generateStaveWithStaveNotes(ref, staveNotes, key, staveSecondVoice);
};
