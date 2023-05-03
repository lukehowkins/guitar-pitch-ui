import { Renderer, TabNote, TabStave, TickContext } from 'vexflow';
import { getTabChord, getTabNote } from './tabNote';

const MIN_WIDTH = 250;
const MIN_WIDTH_PER_NOTE = 40;
const TAB_CLEF_WIDTH = 20;
const HEIGHT = 90;

function showNote(tabNote, stave, ctx, x) {
  const tickContext = new TickContext();
  tickContext.addTickable(tabNote).preFormat().setX(x);
  tabNote.setContext(ctx).setStave(stave);
  tabNote.draw();
  return tabNote;
}

export const generateTabWithTabNotes = (ref, tabNotes) => {
  ref.innerHTML = '';
  const width = Math.min(Math.max(ref.clientWidth, MIN_WIDTH), tabNotes.length * MIN_WIDTH_PER_NOTE + TAB_CLEF_WIDTH);
  const renderer = new Renderer(ref, Renderer.Backends.SVG);
  renderer.resize(width, HEIGHT);
  const context = renderer.getContext();

  const stave = new TabStave(0, -40, width - 1);
  stave.addClef('tab');
  stave.setContext(context).draw();

  tabNotes.map((tabNote, index) => showNote(tabNote, stave, context, 25 + (index * width) / tabNotes.length));
};

export const generateTabWithPositions = (ref, positions) => {
  const tabNotes = positions.map((position) => {
    if (Array.isArray(position)) {
      return new TabNote({ positions: position, duration: 4 });
    }
    return new TabNote({ positions: [position], duration: 4 });
  });

  return generateTabWithTabNotes(ref, tabNotes);
};

export const generateTabWithNotes = (ref, notes, lowestFret, highestFret) => {
  const tabNotes = notes.map((note) => {
    if (typeof note === 'string') return getTabNote(note, lowestFret, highestFret);
    return getTabChord(note, lowestFret, highestFret);
  });

  return generateTabWithTabNotes(ref, tabNotes);
};