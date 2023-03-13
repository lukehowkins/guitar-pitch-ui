import { getStepDiff, shiftNote, shiftOct } from './notes';

const STANDARD_TUNING = ['E/4', 'B/3', 'G/3', 'D/3', 'A/2', 'E/2'];

// Standard tuning only
// takes a display note and transposes to pitch
export const getFretboardPosition = (note, lowestFret = 0, highestFret = 24) => {
  const transposedNote = shiftOct(note, -1); // to pitch
  const string6Fret = getStepDiff(STANDARD_TUNING[5], transposedNote);
  if (string6Fret < lowestFret) throw new Error('Note too low');
  const string5Fret = getStepDiff(STANDARD_TUNING[4], transposedNote);
  const string4Fret = getStepDiff(STANDARD_TUNING[3], transposedNote);
  const string3Fret = getStepDiff(STANDARD_TUNING[2], transposedNote);
  const string2Fret = getStepDiff(STANDARD_TUNING[1], transposedNote);
  const string1Fret = getStepDiff(STANDARD_TUNING[0], transposedNote);
  if (string1Fret > highestFret) throw new Error('Note too high');

  if (lowestFret <= string1Fret && string1Fret <= highestFret) return { string: 1, fret: string1Fret };
  if (lowestFret <= string2Fret && string2Fret <= highestFret) return { string: 2, fret: string2Fret };
  if (lowestFret <= string3Fret && string3Fret <= highestFret) return { string: 3, fret: string3Fret };
  if (lowestFret <= string4Fret && string4Fret <= highestFret) return { string: 4, fret: string4Fret };
  if (lowestFret <= string5Fret && string5Fret <= highestFret) return { string: 5, fret: string5Fret };
  if (lowestFret <= string6Fret && string6Fret <= highestFret) return { string: 6, fret: string6Fret };

  throw new Error(`Could not place note on guitar fret between ${lowestFret} and ${highestFret}`);
};

// TODO sort notes and do not put lowest note any higher that would block you putting next note on
export const getFretboardPositions = (notes, lowestFret = 0, highestFret = 24) => {
  if (lowestFret >= highestFret) throw new Error('Could not position on fretboard');
  let ranges = [];

  const positions = notes.map((note) => {
    const lowest = ranges.reduce((acc, [current]) => Math.min(acc, current), lowestFret);
    const highest = ranges.reduce((acc, [, current]) => Math.max(acc, current), highestFret);
    const position = getFretboardPosition(note, lowest, highest);
    ranges.push([Math.max(lowestFret, position.fret - 4), Math.min(highestFret, position.fret + 4)]);
    return position;
  });

  const strings = positions.map(({ string }) => string);
  const distinctStrings = [...new Set(strings)];
  if (strings.length !== distinctStrings.length) {
    try {
      return getFretboardPositions(notes, lowestFret + 1, highestFret);
    } catch {
      throw new Error('Could not place notes on guitar fret');
    }
  }

  return positions.sort((a, b) => b.string - a.string);
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
