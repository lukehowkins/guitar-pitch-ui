import { describe, it, expect } from 'vitest';
import { getStringFret } from './guitar';

describe('guitar', () => {
  describe('getStringFret()', () => {
    it('get fret across whole guitar fretboard', () => {
      expect(() => getStringFret('D/2')).toThrowError(new Error('Note too low'));
      expect(getStringFret('E/2')).toEqual({ string: 6, fret: 0 });
      expect(getStringFret('C#/3')).toEqual({ string: 5, fret: 4 });
      expect(getStringFret('D#/3')).toEqual({ string: 4, fret: 1 });
      expect(getStringFret('A/3')).toEqual({ string: 3, fret: 2 });
      expect(getStringFret('D/4')).toEqual({ string: 2, fret: 3 });
      expect(getStringFret('E/4')).toEqual({ string: 1, fret: 0 });
      expect(getStringFret('C/5')).toEqual({ string: 1, fret: 8 });
      expect(getStringFret('E/5')).toEqual({ string: 1, fret: 12 });
      expect(getStringFret('E/6')).toEqual({ string: 1, fret: 24 });
      expect(() => getStringFret('F/6')).toThrowError(new Error('Note too high'));
    });

    it('get fret between 0 and 5', () => {
      expect(() => getStringFret('D/2', 0, 5)).toThrowError(new Error('Note too low'));
      expect(getStringFret('E/2', 0, 5)).toEqual({ string: 6, fret: 0 });
      expect(getStringFret('C#/3', 0, 5)).toEqual({ string: 5, fret: 4 });
      expect(getStringFret('D#/3', 0, 5)).toEqual({ string: 4, fret: 1 });
      expect(getStringFret('A/3', 0, 5)).toEqual({ string: 3, fret: 2 });
      expect(getStringFret('D/4', 0, 5)).toEqual({ string: 2, fret: 3 });
      expect(getStringFret('E/4', 0, 5)).toEqual({ string: 1, fret: 0 });
      expect(() => getStringFret('C/5', 0, 5)).toThrowError(new Error('Note too high'));
      expect(() => getStringFret('E/5', 0, 5)).toThrowError(new Error('Note too high'));
      expect(() => getStringFret('E/6', 0, 5)).toThrowError(new Error('Note too high'));
      expect(() => getStringFret('F/6', 0, 5)).toThrowError(new Error('Note too high'));
    });

    it('get fret between 5 and 12', () => {
      expect(() => getStringFret('D/2', 5, 12)).toThrowError(new Error('Note too low'));
      expect(() => getStringFret('E/2', 5, 12)).toThrowError(new Error('Note too low'));
      expect(getStringFret('C#/3', 5, 12)).toEqual({ string: 6, fret: 9 });
      expect(getStringFret('D#/3', 5, 12)).toEqual({ string: 5, fret: 6 });
      expect(getStringFret('A/3', 5, 12)).toEqual({ string: 4, fret: 7 });
      expect(getStringFret('D/4', 5, 12)).toEqual({ string: 3, fret: 7 });
      expect(getStringFret('E/4', 5, 12)).toEqual({ string: 2, fret: 5 });
      expect(getStringFret('C/5', 5, 12)).toEqual({ string: 1, fret: 8 });
      expect(getStringFret('E/5', 5, 12)).toEqual({ string: 1, fret: 12 });
      expect(() => getStringFret('E/6', 5, 12)).toThrowError(new Error('Note too high'));
      expect(() => getStringFret('F/6', 5, 12)).toThrowError(new Error('Note too high'));
    });

    it('get fret between 11 and 13', () => {
      expect(() => getStringFret('D/2', 11, 13)).toThrowError(new Error('Note too low'));
      expect(() => getStringFret('E/2', 11, 13)).toThrowError(new Error('Note too low'));
      expect(() => getStringFret('C#/3', 11, 13)).toThrowError(new Error('Note too low'));
      expect(getStringFret('D#/3', 11, 13)).toEqual({ string: 6, fret: 11 });
      expect(getStringFret('A/3', 11, 13)).toEqual({ string: 5, fret: 12 });
      expect(getStringFret('D/4', 11, 13)).toEqual({ string: 4, fret: 12 });
      expect(() => getStringFret('E/4', 11, 13)).toThrowError(
        new Error('Could not place note on guitar fret between 11 and 13')
      );
      expect(getStringFret('C/5', 11, 13)).toEqual({ string: 2, fret: 13 });
      expect(getStringFret('E/5', 11, 13)).toEqual({ string: 1, fret: 12 });
      expect(() => getStringFret('E/6', 11, 13)).toThrowError(new Error('Note too high'));
      expect(() => getStringFret('F/6', 11, 13)).toThrowError(new Error('Note too high'));
    });
  });
});
