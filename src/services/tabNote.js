import { TabNote } from 'vexflow';
import { getFretboardPosition, getFretboardPositions } from './guitar';

export const getTabNote = (note, lowestFret = 0, highestFret = 24) => {
  const position = getFretboardPosition(note, lowestFret, highestFret);
  return new TabNote({ positions: [position], duration: 4 });
};

export const getTabChord = (notes, lowestFret = 0, highestFret = 24) => {
  const positions = getFretboardPositions(notes, lowestFret, highestFret);
  return new TabNote({ positions, duration: 4 });
};
