import { getStepDiff } from './notes';

// Standard tuning only
export const getFretboardPosition = (note, lowestFret = 0, highestFret = 24) => {
  const string6Fret = getStepDiff('E/2', note);
  if (string6Fret < lowestFret) throw new Error('Note too low');
  const string5Fret = getStepDiff('A/2', note);
  const string4Fret = getStepDiff('D/3', note);
  const string3Fret = getStepDiff('G/3', note);
  const string2Fret = getStepDiff('B/3', note);
  const string1Fret = getStepDiff('E/4', note);
  if (string1Fret > highestFret) throw new Error('Note too high');

  if (lowestFret <= string1Fret && string1Fret <= highestFret) return { string: 1, fret: string1Fret };
  if (lowestFret <= string2Fret && string2Fret <= highestFret) return { string: 2, fret: string2Fret };
  if (lowestFret <= string3Fret && string3Fret <= highestFret) return { string: 3, fret: string3Fret };
  if (lowestFret <= string4Fret && string4Fret <= highestFret) return { string: 4, fret: string4Fret };
  if (lowestFret <= string5Fret && string5Fret <= highestFret) return { string: 5, fret: string5Fret };
  if (lowestFret <= string6Fret && string6Fret <= highestFret) return { string: 6, fret: string6Fret };

  throw new Error(`Could not place note on guitar fret between ${lowestFret} and ${highestFret}`);
};

// sort notes and do not put lowest note any higher that would block you putting next note on
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
