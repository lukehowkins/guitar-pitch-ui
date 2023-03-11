import { Formatter, Renderer, Stave } from 'vexflow';

const MIN_WIDTH = 250;
const MIN_WIDTH_PER_NOTE = 100;
const HEIGHT = 200;

export const generateStaveWithNotes = (ref, notes, key = 'C') => {
  ref.innerHTML = '';
  const width = Math.min(Math.max(ref.clientWidth, MIN_WIDTH), notes.length * MIN_WIDTH_PER_NOTE + 200);
  const renderer = new Renderer(ref, Renderer.Backends.SVG);
  renderer.resize(width, HEIGHT);
  const context = renderer.getContext();
  const stave = new Stave(10, 40, width - 100);
  stave.addClef('treble').addKeySignature(key);
  stave.setContext(context).draw();

  Formatter.FormatAndDraw(context, stave, notes);
};
