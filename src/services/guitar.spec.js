import { describe, it, expect } from 'vitest';
import { getFretboardPosition, getFretboardPositions } from './guitar';

describe('guitar', () => {
  describe('getFretboardPosition()', () => {
    it('get fret across whole guitar fretboard', () => {
      expect(() => getFretboardPosition('D/2')).toThrowError(new Error('Note too low'));
      expect(getFretboardPosition('E/2')).toEqual({ string: 6, fret: 0 });
      expect(getFretboardPosition('C#/3')).toEqual({ string: 5, fret: 4 });
      expect(getFretboardPosition('D#/3')).toEqual({ string: 4, fret: 1 });
      expect(getFretboardPosition('A/3')).toEqual({ string: 3, fret: 2 });
      expect(getFretboardPosition('D/4')).toEqual({ string: 2, fret: 3 });
      expect(getFretboardPosition('E/4')).toEqual({ string: 1, fret: 0 });
      expect(getFretboardPosition('C/5')).toEqual({ string: 1, fret: 8 });
      expect(getFretboardPosition('E/5')).toEqual({ string: 1, fret: 12 });
      expect(getFretboardPosition('E/6')).toEqual({ string: 1, fret: 24 });
      expect(() => getFretboardPosition('F/6')).toThrowError(new Error('Note too high'));
    });

    it('get fret between 0 and 5', () => {
      expect(() => getFretboardPosition('D/2', 0, 5)).toThrowError(new Error('Note too low'));
      expect(getFretboardPosition('E/2', 0, 5)).toEqual({ string: 6, fret: 0 });
      expect(getFretboardPosition('C#/3', 0, 5)).toEqual({ string: 5, fret: 4 });
      expect(getFretboardPosition('D#/3', 0, 5)).toEqual({ string: 4, fret: 1 });
      expect(getFretboardPosition('A/3', 0, 5)).toEqual({ string: 3, fret: 2 });
      expect(getFretboardPosition('D/4', 0, 5)).toEqual({ string: 2, fret: 3 });
      expect(getFretboardPosition('E/4', 0, 5)).toEqual({ string: 1, fret: 0 });
      expect(() => getFretboardPosition('C/5', 0, 5)).toThrowError(new Error('Note too high'));
      expect(() => getFretboardPosition('E/5', 0, 5)).toThrowError(new Error('Note too high'));
      expect(() => getFretboardPosition('E/6', 0, 5)).toThrowError(new Error('Note too high'));
      expect(() => getFretboardPosition('F/6', 0, 5)).toThrowError(new Error('Note too high'));
    });

    it('get fret between 5 and 12', () => {
      expect(() => getFretboardPosition('D/2', 5, 12)).toThrowError(new Error('Note too low'));
      expect(() => getFretboardPosition('E/2', 5, 12)).toThrowError(new Error('Note too low'));
      expect(getFretboardPosition('C#/3', 5, 12)).toEqual({ string: 6, fret: 9 });
      expect(getFretboardPosition('D#/3', 5, 12)).toEqual({ string: 5, fret: 6 });
      expect(getFretboardPosition('A/3', 5, 12)).toEqual({ string: 4, fret: 7 });
      expect(getFretboardPosition('D/4', 5, 12)).toEqual({ string: 3, fret: 7 });
      expect(getFretboardPosition('E/4', 5, 12)).toEqual({ string: 2, fret: 5 });
      expect(getFretboardPosition('C/5', 5, 12)).toEqual({ string: 1, fret: 8 });
      expect(getFretboardPosition('E/5', 5, 12)).toEqual({ string: 1, fret: 12 });
      expect(() => getFretboardPosition('E/6', 5, 12)).toThrowError(new Error('Note too high'));
      expect(() => getFretboardPosition('F/6', 5, 12)).toThrowError(new Error('Note too high'));
    });

    it('get fret between 11 and 13', () => {
      expect(() => getFretboardPosition('D/2', 11, 13)).toThrowError(new Error('Note too low'));
      expect(() => getFretboardPosition('E/2', 11, 13)).toThrowError(new Error('Note too low'));
      expect(() => getFretboardPosition('C#/3', 11, 13)).toThrowError(new Error('Note too low'));
      expect(getFretboardPosition('D#/3', 11, 13)).toEqual({ string: 6, fret: 11 });
      expect(getFretboardPosition('A/3', 11, 13)).toEqual({ string: 5, fret: 12 });
      expect(getFretboardPosition('D/4', 11, 13)).toEqual({ string: 4, fret: 12 });
      expect(() => getFretboardPosition('E/4', 11, 13)).toThrowError(
        new Error('Could not place note on guitar fret between 11 and 13')
      );
      expect(getFretboardPosition('C/5', 11, 13)).toEqual({ string: 2, fret: 13 });
      expect(getFretboardPosition('E/5', 11, 13)).toEqual({ string: 1, fret: 12 });
      expect(() => getFretboardPosition('E/6', 11, 13)).toThrowError(new Error('Note too high'));
      expect(() => getFretboardPosition('F/6', 11, 13)).toThrowError(new Error('Note too high'));
    });
  });

  describe('getFretboardPositions()', () => {
    it('get frets across whole guitar fretboard', () => {
      expect(() => getFretboardPositions(['E/2', 'F/2'])).toThrowError(
        new Error('Could not place notes on guitar fret')
      );
      expect(getFretboardPositions(['E/2', 'E/3'])).toEqual([
        { string: 6, fret: 0 },
        { string: 4, fret: 2 },
      ]);
      expect(getFretboardPositions(['A/2', 'C#/3', 'E/3'])).toEqual([
        { string: 6, fret: 5 },
        { string: 5, fret: 4 },
        { string: 4, fret: 2 },
      ]);
      expect(getFretboardPositions(['F#/3', 'A#/3', 'D/4', 'F/4'])).toEqual([
        { string: 4, fret: 4 },
        { string: 3, fret: 3 },
        { string: 2, fret: 3 },
        { string: 1, fret: 1 },
      ]);
      expect(getFretboardPositions(['F/4', 'F#/3', 'D/4', 'A#/3'])).toEqual([
        { string: 4, fret: 4 },
        { string: 3, fret: 3 },
        { string: 2, fret: 3 },
        { string: 1, fret: 1 },
      ]);
      expect(getFretboardPositions(['C/3', 'G/3', 'Bb/3', 'E/4', 'G/4', 'D/5'])).toEqual([
        { string: 6, fret: 8 },
        { string: 5, fret: 10 },
        { string: 4, fret: 8 },
        { string: 3, fret: 9 },
        { string: 2, fret: 8 },
        { string: 1, fret: 10 },
      ]);
    });

    it('get frets between 5 and 12', () => {
      expect(() => getFretboardPositions(['E/2', 'F/2'])).toThrowError(
        new Error('Could not place notes on guitar fret')
      );
      expect(() => getFretboardPositions(['E/2', 'E/3'], 5, 12)).toThrowError(new Error('Note too low'));
      expect(() => getFretboardPositions(['A/2', 'C#/3', 'E/3'], 5, 12)).toThrowError(
        new Error('Could not place notes on guitar fret')
      );
      expect(getFretboardPositions(['F#/3', 'A#/3', 'D/4', 'F/4'], 5, 12)).toEqual([
        { string: 5, fret: 9 },
        { string: 4, fret: 8 },
        { string: 3, fret: 7 },
        { string: 2, fret: 6 },
      ]);
      expect(getFretboardPositions(['F/4', 'F#/3', 'D/4', 'A#/3'], 5, 12)).toEqual([
        { string: 5, fret: 9 },
        { string: 4, fret: 8 },
        { string: 3, fret: 7 },
        { string: 2, fret: 6 },
      ]);
      expect(getFretboardPositions(['C/3', 'G/3', 'Bb/3', 'E/4', 'G/4', 'D/5']), 5, 12).toEqual([
        { string: 6, fret: 8 },
        { string: 5, fret: 10 },
        { string: 4, fret: 8 },
        { string: 3, fret: 9 },
        { string: 2, fret: 8 },
        { string: 1, fret: 10 },
      ]);
    });
  });
});
