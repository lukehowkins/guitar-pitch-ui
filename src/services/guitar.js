import { getSortedChord, getStepDiff, shiftNote, shiftOct } from './notes';

const STANDARD_TUNING = ['E/4', 'B/3', 'G/3', 'D/3', 'A/2', 'E/2'];
const NUMBER_OF_GUITAR_STRINGS = STANDARD_TUNING.length;

// TODO make error file?
const ERROR_TOO_LOW = new Error('Note too low');
const ERROR_TOO_HIGH = new Error('Note too high');
const ERROR_FRETBOARD_POSITION = new Error('Could not position on guitar fretboard');

const getFretboardPostionOnString = (transposedNote, str, lowestFret = 0, highestFret = 24) => {
  const fret = getStepDiff(STANDARD_TUNING[str - 1], transposedNote);
  if (fret < lowestFret) throw ERROR_TOO_LOW;
  if (fret > highestFret) throw ERROR_TOO_HIGH;
  return { str, fret };
};

const getFretboardPostionBetweenStringRange = (note, strRange, lowestFret = 0, highestFret = 24) => {
  const transposedNote = shiftOct(note, -1); // to pitch
  const positions = strRange
    .map((str) => {
      try {
        return getFretboardPostionOnString(transposedNote, str, lowestFret, highestFret);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  if (!positions?.length) throw ERROR_FRETBOARD_POSITION;

  return positions[0];
};

const getStringRange = (i, totalCount) => {
  const lowestStr = NUMBER_OF_GUITAR_STRINGS - i;
  const highestStr = totalCount - i;
  return Array(1 + lowestStr - highestStr)
    .fill(0)
    .map((a, i) => highestStr + i);
};

// Standard tuning only
// takes a display note and transposes to pitch
export const getFretboardPosition = (note, lowestFret = 0, highestFret = 24) => {
  const transposedNote = shiftOct(note, -1); // to pitch
  for (let str = 1; str <= 6; str++) {
    try {
      return getFretboardPostionOnString(transposedNote, str, lowestFret, highestFret);
    } catch (e) {
      if ((str === 6 && e === ERROR_TOO_LOW) || (str === 1 && e === ERROR_TOO_HIGH)) throw e;
    }
  }
  throw new Error(`Could not place note ${note} on guitar fret between ${lowestFret} and ${highestFret}`);
};

export const getFretboardPositions = (notes, lowestFret = 0, highestFret = 24) => {
  if (lowestFret >= highestFret) throw ERROR_FRETBOARD_POSITION;
  if (notes.length > NUMBER_OF_GUITAR_STRINGS) throw new Error('Too many notes');
  let ranges = [];

  const positions = getSortedChord(notes).map((note, index) => {
    const lowest = ranges.reduce((acc, [current]) => Math.min(acc, current), lowestFret);
    const highest = ranges.reduce((acc, [, current]) => Math.max(acc, current), highestFret);

    const range = getStringRange(index, notes.length);
    let position = getFretboardPosition(note, lowest, highest);
    if (position.str < range[0] || position.str > range[1]) {
      position = getFretboardPostionBetweenStringRange(note, range, lowest, highest);
    }

    ranges.push([Math.max(lowestFret, position.fret - 4), Math.min(highestFret, position.fret + 4)]);
    return position;
  });

  const strings = positions.map(({ str }) => str);
  const distinctStrings = [...new Set(strings)];
  if (strings.length !== distinctStrings.length) {
    try {
      return getFretboardPositions(notes, lowestFret + 1, highestFret);
    } catch {
      throw ERROR_FRETBOARD_POSITION;
    }
  }
  return positions;
};

export const getFret = (note, string) => {
  const openNote = STANDARD_TUNING[string - 1];
  const fret = getStepDiff(openNote, note);
  if (fret < 0 || fret > 24) throw new Error('Note can not be placed on string');
  return fret;
};

export const getNote = (fret, string) => {
  if (fret < 0 || fret > 24 || string < 1 || string > 6) throw new Error('Can not get note');
  const openNote = STANDARD_TUNING[string - 1];
  return shiftNote(openNote, fret);
};

export const getNoteRange = (lowestFret = 0, highestFret = 24) => {
  if (lowestFret > highestFret || lowestFret < 0 || highestFret > 24) throw new Error('Invalid fret');

  return [getNote(lowestFret, 6), getNote(highestFret, 1)];
};
