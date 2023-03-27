import { describe, it, expect } from 'vitest';
import {
  getNoteAbove,
  getNoteBelow,
  getStepDiff,
  getNoteInfo,
  areChordsSame,
  areNotesSame,
  shiftOct,
  getSortedChord,
  shiftNote,
} from './notes';

describe('notes', () => {
  describe('getNoteAbove', () => {
    it('should return note in same octave', () => {
      expect(getNoteAbove('D/3', 'm3')).toEqual('F/3');
      expect(getNoteAbove('D/4', 'M3')).toEqual('F#/4');
      expect(getNoteAbove('Eb/3', 'P4')).toEqual('Ab/3');
      expect(getNoteAbove('Eb/3', 'm2')).toEqual('E/3');
      expect(getNoteAbove('C#/3', 'P5')).toEqual('G#/3');
      expect(getNoteAbove('Db/3', 'P5')).toEqual('Ab/3');
    });

    it('should return note in diff octave', () => {
      expect(getNoteAbove('Bb/3', 'M3')).toEqual('D/4');
      expect(getNoteAbove('A/3', 'P8')).toEqual('A/4');
      expect(getNoteAbove('F#/3', 'M13')).toEqual('D#/5');
      expect(getNoteAbove('Bb/4', '2 octaves')).toEqual('Bb/6');
    });
  });

  describe('getNoteBelow', () => {
    it('should return note in same octave', () => {
      expect(getNoteBelow('F/3', 'm3')).toEqual('D/3');
      expect(getNoteBelow('F#/4', 'M3')).toEqual('D/4');
      expect(getNoteBelow('Ab/3', 'P4')).toEqual('Eb/3');
      expect(getNoteBelow('E/3', 'm2')).toEqual('Eb/3');
      expect(getNoteBelow('G#/3', 'P5')).toEqual('C#/3');
      expect(getNoteBelow('Ab/3', 'P5')).toEqual('Db/3');
    });

    it('should return note in diff octave', () => {
      expect(getNoteBelow('D/4', 'M3')).toEqual('Bb/3');
      expect(getNoteBelow('A/4', 'P8')).toEqual('A/3');
      expect(getNoteBelow('D#/5', 'M13')).toEqual('F#/3');
      expect(getNoteBelow('Bb/5', '2 octaves')).toEqual('Bb/3');
    });
  });

  describe('getStepDiff', () => {
    it('should return step for same oct', () => {
      expect(getStepDiff('Bb/3', 'A/3')).toBe(-1);
      expect(getStepDiff('E/2', 'E/2')).toBe(0);
      expect(getStepDiff('A/3', 'Bb/3')).toBe(1);
      expect(getStepDiff('C/3', 'G/3')).toBe(7);
      expect(getStepDiff('G#/4', 'B/4')).toBe(3);
    });

    it('should return step for diff oct', () => {
      expect(getStepDiff('D/5', 'D/3')).toBe(-24);
      expect(getStepDiff('Ab/2', 'G#/3')).toBe(12);
      expect(getStepDiff('B/3', 'C/4')).toBe(1);
      expect(getStepDiff('C/3', 'Bb/2')).toBe(-2);
      expect(getStepDiff('D/3', 'F/4')).toBe(15);
    });
  });

  describe('getNoteInfo', () => {
    it('should throw error', () => {
      expect(() => getNoteInfo()).toThrowError(new Error('Note missing'));
      expect(() => getNoteInfo('')).toThrowError(new Error('Note missing'));
      expect(() => getNoteInfo('C')).toThrowError(new Error('Octave missing'));
      expect(() => getNoteInfo('C/1')).toThrowError(new Error('Octave too low'));
      expect(() => getNoteInfo('C/10')).toThrowError(new Error('Octave too high'));
      expect(() => getNoteInfo('L/3')).toThrowError(new Error('Invalid note'));
      expect(() => getNoteInfo('ABC/3')).toThrowError(new Error('Invalid note'));
      expect(() => getNoteInfo('bb/4')).toThrowError(new Error('Invalid note'));
    });

    it('should get note info', () => {
      expect(getNoteInfo('Bb/4')).toEqual({ note: 'Bb', oct: 4 });
      expect(getNoteInfo('C/5')).toEqual({ note: 'C', oct: 5 });
      expect(getNoteInfo('F#/3')).toEqual({ note: 'F#', oct: 3 });
    });
  });

  describe('areNotesSame', () => {
    it('should return true', () => {
      expect(areNotesSame()).toBe(true);
      expect(areNotesSame('C/4', 'C/4')).toBe(true);
      expect(areNotesSame('Eb/6', 'Eb/6')).toBe(true);
      expect(areNotesSame('D#/3', 'D#/3')).toBe(true);
      expect(areNotesSame('F#/5', 'Gb/5')).toBe(true);
    });

    it('should return false', () => {
      expect(areNotesSame('C/4', 'C/5')).toBe(false);
      expect(areNotesSame('D/6', 'Eb/6')).toBe(false);
    });

    it('should throw error', () => {
      expect(() => areNotesSame('C/4')).toThrowError(new Error('Note missing'));
      expect(() => areNotesSame(null, 'C/4')).toThrowError(new Error('Note missing'));
      expect(() => areNotesSame('C/4', 'E/1')).toThrowError(new Error('Octave too low'));
    });
  });

  describe('areChordsSame', () => {
    it('should return true', () => {
      expect(areChordsSame()).toEqual(true);
      expect(areChordsSame(['G/4', 'C/4'], ['G/4', 'C/4'])).toEqual(true);
      expect(areChordsSame(['G/4', 'C/4'], ['C/4', 'G/4'])).toEqual(true);
      expect(areChordsSame(['D/3', 'F#/3', 'A/3'], ['D/3', 'Gb/3', 'A/3'])).toEqual(true);
      expect(areChordsSame(['Bb/5', 'Eb/3'], ['Eb/3', 'Bb/5'])).toEqual(true);
      expect(areChordsSame('C#/4', 'C#/4')).toEqual(true);
    });
    it('should return false', () => {
      expect(areChordsSame(['G/4', 'C/4'], ['G/4'])).toEqual(false);
      expect(areChordsSame(['G/4'], ['C/4', 'G/4'])).toEqual(false);
      expect(areChordsSame(['D/3', 'F#/3', 'A/3'], ['D/3', 'D/3', 'D/3'])).toEqual(false);
      expect(areChordsSame(['D/3', 'D/3', 'D/3'], ['D/3', 'F#/3', 'A/3'])).toEqual(false);
      expect(areChordsSame(['D/3', 'F#/3', 'A/3'], ['D/3', 'F#/4', 'A/3'])).toEqual(false);
      expect(areChordsSame('C/4', 'C#/5')).toEqual(false);
    });
  });

  describe('getSortedChord', () => {
    it('should return lowest first', () => {
      expect(getSortedChord(['G/4', 'G/5'])).toEqual(['G/4', 'G/5']);
      expect(getSortedChord(['D/4', 'Eb/4', 'F#/4'])).toEqual(['D/4', 'Eb/4', 'F#/4']);
      expect(getSortedChord(['C/4', 'C/3'])).toEqual(['C/3', 'C/4']);
      expect(getSortedChord(['F/4', 'C#/4', 'Eb/4'])).toEqual(['C#/4', 'Eb/4', 'F/4']);
      expect(getSortedChord(['G/4', 'D#/4', 'A/3', 'C/5', 'Bb/4'])).toEqual(['A/3', 'D#/4', 'G/4', 'Bb/4', 'C/5']);
      expect(getSortedChord(['C/5', 'Bb/4', 'G/4', 'D#/4', 'A/3'])).toEqual(['A/3', 'D#/4', 'G/4', 'Bb/4', 'C/5']);
    });
  });

  describe('shiftOct', () => {
    it('should shift note', () => {
      expect(shiftOct('C/3', 1)).toEqual('C/4');
      expect(shiftOct('C/3', -1)).toEqual('C/2');
      expect(shiftOct('E/2', 2)).toEqual('E/4');
    });
  });

  describe('shiftNote', () => {
    it('should shift note', () => {
      expect(shiftNote('C/3', 1)).toEqual('C#/3');
      expect(shiftNote('C/3', -1)).toEqual('B/2');
      expect(shiftNote('E/2', 5)).toEqual('A/2');
      expect(shiftNote('E/4', -13)).toEqual('Eb/3');
    });
  });
});
