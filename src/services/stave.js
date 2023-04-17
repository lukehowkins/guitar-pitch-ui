import { Formatter, Renderer, Stave, Stem, Voice, VoiceMode } from 'vexflow';
import { getAccidentals, getStaveChord, getStaveNote } from './staveNotes';

const MIN_WIDTH = 250;
const MIN_WIDTH_PER_NOTE = 100;
const HEIGHT = 200;

export const generateStaveWithStaveNotes = (ref, staveNotes, key = 'C', secondVoice) => {
  ref.innerHTML = '';
  const width = Math.min(Math.max(ref.clientWidth, MIN_WIDTH), staveNotes.length * MIN_WIDTH_PER_NOTE + 200);
  const renderer = new Renderer(ref, Renderer.Backends.SVG);
  renderer.resize(width, HEIGHT);
  const context = renderer.getContext();

  const stave = new Stave(10, 40, width - 80);
  stave.addClef('treble').addKeySignature(key);
  stave.setContext(context).draw();

  if (secondVoice) {
    staveNotes.forEach((note) => note.setStemDirection(Stem.UP));
    secondVoice.forEach((note) => note.setStemDirection(Stem.DOWN));

    const formatter = new Formatter();
    const voice1 = new Voice();
    voice1.setMode(VoiceMode.FULL);
    voice1.addTickables(staveNotes);

    const voice2 = new Voice();
    voice2.setMode(VoiceMode.FULL);
    voice2.addTickables(secondVoice);
    formatter.joinVoices([voice1, voice2]);

    formatter.format([voice1, voice2], width);
    voice1.draw(context, stave);
    voice2.draw(context, stave);
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
