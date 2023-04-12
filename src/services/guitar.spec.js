import { describe, it, expect } from 'vitest';
import { getFret, getFretboardPosition, getFretboardPositions, getNote, getNoteRange } from './guitar';

describe('guitar', () => {
  describe('getFretboardPosition()', () => {
    it('get fret across whole guitar fretboard', () => {
      expect(() => getFretboardPosition('D/3')).toThrowError(new Error('Note too low'));
      expect(getFretboardPosition('E/3')).toEqual({ str: 6, fret: 0 });
      expect(getFretboardPosition('C#/4')).toEqual({ str: 5, fret: 4 });
      expect(getFretboardPosition('D#/4')).toEqual({ str: 4, fret: 1 });
      expect(getFretboardPosition('A/4')).toEqual({ str: 3, fret: 2 });
      expect(getFretboardPosition('D/5')).toEqual({ str: 2, fret: 3 });
      expect(getFretboardPosition('E/5')).toEqual({ str: 1, fret: 0 });
      expect(getFretboardPosition('C/6')).toEqual({ str: 1, fret: 8 });
      expect(getFretboardPosition('E/6')).toEqual({ str: 1, fret: 12 });
      expect(getFretboardPosition('E/7')).toEqual({ str: 1, fret: 24 });
      expect(() => getFretboardPosition('F/7')).toThrowError(new Error('Note too high'));
    });

    it('get fret between 0 and 5', () => {
      expect(() => getFretboardPosition('D/3', 0, 5)).toThrowError(new Error('Note too low'));
      expect(getFretboardPosition('E/3', 0, 5)).toEqual({ str: 6, fret: 0 });
      expect(getFretboardPosition('C#/4', 0, 5)).toEqual({ str: 5, fret: 4 });
      expect(getFretboardPosition('D#/4', 0, 5)).toEqual({ str: 4, fret: 1 });
      expect(getFretboardPosition('A/4', 0, 5)).toEqual({ str: 3, fret: 2 });
      expect(getFretboardPosition('D/5', 0, 5)).toEqual({ str: 2, fret: 3 });
      expect(getFretboardPosition('E/5', 0, 5)).toEqual({ str: 1, fret: 0 });
      expect(() => getFretboardPosition('C/6', 0, 5)).toThrowError(new Error('Note too high'));
      expect(() => getFretboardPosition('E/6', 0, 5)).toThrowError(new Error('Note too high'));
      expect(() => getFretboardPosition('E/7', 0, 5)).toThrowError(new Error('Note too high'));
      expect(() => getFretboardPosition('F/7', 0, 5)).toThrowError(new Error('Note too high'));
    });

    it('get fret between 5 and 12', () => {
      expect(() => getFretboardPosition('D/3', 5, 12)).toThrowError(new Error('Note too low'));
      expect(() => getFretboardPosition('E/3', 5, 12)).toThrowError(new Error('Note too low'));
      expect(getFretboardPosition('C#/4', 5, 12)).toEqual({ str: 6, fret: 9 });
      expect(getFretboardPosition('D#/4', 5, 12)).toEqual({ str: 5, fret: 6 });
      expect(getFretboardPosition('A/4', 5, 12)).toEqual({ str: 4, fret: 7 });
      expect(getFretboardPosition('D/5', 5, 12)).toEqual({ str: 3, fret: 7 });
      expect(getFretboardPosition('E/5', 5, 12)).toEqual({ str: 2, fret: 5 });
      expect(getFretboardPosition('C/6', 5, 12)).toEqual({ str: 1, fret: 8 });
      expect(getFretboardPosition('E/6', 5, 12)).toEqual({ str: 1, fret: 12 });
      expect(() => getFretboardPosition('E/7', 5, 12)).toThrowError(new Error('Note too high'));
      expect(() => getFretboardPosition('F/7', 5, 12)).toThrowError(new Error('Note too high'));
    });

    it('get fret between 11 and 13', () => {
      expect(() => getFretboardPosition('D/3', 11, 13)).toThrowError(new Error('Note too low'));
      expect(() => getFretboardPosition('E/3', 11, 13)).toThrowError(new Error('Note too low'));
      expect(() => getFretboardPosition('C#/4', 11, 13)).toThrowError(new Error('Note too low'));
      expect(getFretboardPosition('D#/4', 11, 13)).toEqual({ str: 6, fret: 11 });
      expect(getFretboardPosition('A/4', 11, 13)).toEqual({ str: 5, fret: 12 });
      expect(getFretboardPosition('D/5', 11, 13)).toEqual({ str: 4, fret: 12 });
      expect(() => getFretboardPosition('E/5', 11, 13)).toThrowError(
        new Error('Could not place note E/5 on guitar fret between 11 and 13')
      );
      expect(getFretboardPosition('C/6', 11, 13)).toEqual({ str: 2, fret: 13 });
      expect(getFretboardPosition('E/6', 11, 13)).toEqual({ str: 1, fret: 12 });
      expect(() => getFretboardPosition('E/7', 11, 13)).toThrowError(new Error('Note too high'));
      expect(() => getFretboardPosition('F/7', 11, 13)).toThrowError(new Error('Note too high'));
    });
  });

  describe('getFretboardPositions()', () => {
    it('get frets across whole guitar fretboard', () => {
      expect(() => getFretboardPositions(['E/3', 'F/3'])).toThrowError(
        new Error('Could not position on guitar fretboard')
      );
      expect(getFretboardPositions(['E/3', 'E/4'])).toEqual([
        { str: 6, fret: 0 },
        { str: 4, fret: 2 },
      ]);
      expect(getFretboardPositions(['A/3', 'C#/4', 'E/4'])).toEqual([
        { str: 6, fret: 5 },
        { str: 5, fret: 4 },
        { str: 4, fret: 2 },
      ]);
      expect(getFretboardPositions(['F#/4', 'A#/4', 'D/5', 'F/5'])).toEqual([
        { str: 4, fret: 4 },
        { str: 3, fret: 3 },
        { str: 2, fret: 3 },
        { str: 1, fret: 1 },
      ]);
      expect(getFretboardPositions(['F/5', 'F#/4', 'D/5', 'A#/4'])).toEqual([
        { str: 4, fret: 4 },
        { str: 3, fret: 3 },
        { str: 2, fret: 3 },
        { str: 1, fret: 1 },
      ]);
      expect(getFretboardPositions(['C/4', 'G/4', 'Bb/4', 'E/5', 'G/5', 'D/6'])).toEqual([
        { str: 6, fret: 8 },
        { str: 5, fret: 10 },
        { str: 4, fret: 8 },
        { str: 3, fret: 9 },
        { str: 2, fret: 8 },
        { str: 1, fret: 10 },
      ]);
    });

    it('get frets between 5 and 12', () => {
      expect(() => getFretboardPositions(['E/3', 'F/3'])).toThrowError(
        new Error('Could not position on guitar fretboard')
      );
      expect(() => getFretboardPositions(['E/3', 'E/4'], 5, 12)).toThrowError(new Error('Note too low'));
      expect(() => getFretboardPositions(['A/3', 'C#/4', 'E/4'], 5, 12)).toThrowError(
        new Error('Could not position on guitar fretboard')
      );
      expect(getFretboardPositions(['F#/4', 'A#/4', 'D/5', 'F/5'], 5, 12)).toEqual([
        { str: 5, fret: 9 },
        { str: 4, fret: 8 },
        { str: 3, fret: 7 },
        { str: 2, fret: 6 },
      ]);
      expect(getFretboardPositions(['F/5', 'F#/4', 'D/5', 'A#/4'], 5, 12)).toEqual([
        { str: 5, fret: 9 },
        { str: 4, fret: 8 },
        { str: 3, fret: 7 },
        { str: 2, fret: 6 },
      ]);
      expect(getFretboardPositions(['C/4', 'G/4', 'Bb/4', 'E/5', 'G/5', 'D/6']), 5, 12).toEqual([
        { str: 6, fret: 8 },
        { str: 5, fret: 10 },
        { str: 4, fret: 8 },
        { str: 3, fret: 9 },
        { str: 2, fret: 8 },
        { str: 1, fret: 10 },
      ]);
    });
  });

  describe('getFret', () => {
    it('should return note', () => {
      expect(getFret('F/2', 6)).toEqual(1);
      expect(getFret('D/3', 6)).toEqual(10);
      expect(getFret('D/3', 5)).toEqual(5);
      expect(getFret('F#/3', 4)).toEqual(4);
      expect(getFret('E/5', 3)).toEqual(21);
      expect(getFret('Ab/4', 2)).toEqual(9);
      expect(getFret('C/6', 1)).toEqual(20);
    });

    it('should throw', () => {
      expect(() => getFret('Eb/2', 6)).toThrowError(new Error('Note can not be placed on string'));
      expect(() => getFret('G#/5', 5)).toThrowError(new Error('Note can not be placed on string'));
      expect(() => getFret('F/2', 2)).toThrowError(new Error('Note can not be placed on string'));
      expect(() => getFret('F/6', 1)).toThrowError(new Error('Note can not be placed on string'));
    });
  });

  describe('getNote', () => {
    it('should return note', () => {
      expect(getNote(1, 6)).toEqual('F/2');
      expect(getNote(10, 6)).toEqual('D/3');
      expect(getNote(5, 5)).toEqual('D/3');
      expect(getNote(4, 4)).toEqual('F#/3');
      expect(getNote(21, 3)).toEqual('E/5');
      expect(getNote(9, 2)).toEqual('G#/4');
      expect(getNote(20, 1)).toEqual('C/6');
    });

    it('should throw', () => {
      expect(() => getNote(-1, 2)).toThrowError(new Error('Can not get note'));
      expect(() => getNote(25, 5)).toThrowError(new Error('Can not get note'));
      expect(() => getNote(4, -1)).toThrowError(new Error('Can not get note'));
      expect(() => getNote(4, 7)).toThrowError(new Error('Can not get note'));
    });
  });

  describe('getNoteRange()', () => {
    it('return lowest and highest note', () => {
      expect(getNoteRange()).toEqual(['E/2', 'E/6']);
      expect(getNoteRange(5, 12)).toEqual(['A/2', 'E/5']);
    });

    it('should throw', () => {
      expect(() => getNoteRange(5, 2)).toThrowError(new Error('Invalid fret'));
      expect(() => getNoteRange(5, 25)).toThrowError(new Error('Invalid fret'));
      expect(() => getNoteRange(-5, 20)).toThrowError(new Error('Invalid fret'));
    });
  });
});
