import { describe, expect, it } from 'vitest';
import {
  getTotalBeats,
  groupRhythmPerBeat,
  convertBeatsToTiedBeats,
  getDurationLabel,
  isRest,
  getBeats,
} from './rhythm';

describe('rhythm', () => {
  describe('isRest()', () => {
    it('should return value', () => {
      expect(isRest()).toBe(false);
      expect(isRest(1)).toBe(false);
      expect(isRest(-4)).toBe(false);
      expect(isRest('4')).toBe(false);
      expect(isRest('-8r')).toBe(true);
      expect(isRest('4r')).toBe(true);
    });
  });

  describe('getBeats()', () => {
    it('should return value', () => {
      expect(getBeats()).toBe(undefined);
      expect(getBeats(1)).toBe(1);
      expect(getBeats(-4)).toBe(4);
      expect(getBeats('4')).toBe(4);
      expect(getBeats('-8r')).toBe(8);
      expect(getBeats('4r')).toBe(4);
    });
  });

  describe('getTotalBeats()', () => {
    it('should return value', () => {
      expect(getTotalBeats('2/4')).toEqual(8);
      expect(getTotalBeats('3/4')).toEqual(12);
      expect(getTotalBeats('4/4')).toEqual(16);
      expect(getTotalBeats('6/8')).toEqual(12);
      expect(getTotalBeats('12/8')).toEqual(24);
      expect(getTotalBeats('2/2')).toEqual(16);
    });
  });

  describe('groupRhythmPerBeat()', () => {
    it('should throw error', () => {
      expect(() => groupRhythmPerBeat([2.5], '4/4')).toThrowError(new Error('Invalid beats'));
      expect(() => groupRhythmPerBeat(['4.5r'], '4/4')).toThrowError(new Error('Invalid beats'));
    });

    it('should return value when notes are smaller than beat', () => {
      expect(groupRhythmPerBeat([4, 4, '4', 4], '4/4')).toEqual([[4], [4], [4], [4]]);
      expect(groupRhythmPerBeat([2, 2, 1, 2, 1, 1, 1, 1, 1], '3/4')).toEqual([
        [2, 2],
        [1, 2, 1],
        [1, 1, 1, 1],
      ]);
      expect(groupRhythmPerBeat([2, '2r', 2, '1r', 1, 2, 1, 1], '6/8')).toEqual([
        [2, '2r', 2],
        ['1r', 1, 2, 1, 1],
      ]);
    });

    it('should return value tied across beats', () => {
      expect(groupRhythmPerBeat([13, 3], '4/4')).toEqual([[12], [-1, 3]]);
      expect(groupRhythmPerBeat([2, 4, 1, 1, 4], '3/4')).toEqual([[2, 2], [-2, 1, 1], [4]]);
      expect(groupRhythmPerBeat([6, 4, 6, 4], '5/4')).toEqual([[6], [2], [-2, 2], [-4], [4]]);
      expect(groupRhythmPerBeat([6, '4r', 6, 4], '5/4')).toEqual([[6], ['2r'], ['2r', 2], [-4], [4]]);
      expect(groupRhythmPerBeat([4, 6, '1r', 2, 4, 1], '9/8')).toEqual([
        [4, 2],
        [-4, '1r', 1],
        [-1, 4, 1],
      ]);
      expect(groupRhythmPerBeat([3, 2, 1, 2], '2/4')).toEqual([
        [3, 1],
        [-1, 1, 2],
      ]);
      expect(groupRhythmPerBeat([4, 4, 4], '6/8')).toEqual([
        [4, 2],
        [-2, 4],
      ]);
      expect(groupRhythmPerBeat([16, -1, 4, -1, 2], '3/2')).toEqual([[16], [-1, 4, -1, 2]]);
      expect(groupRhythmPerBeat(['1r', 5, 1, '4r', 1], '6/8')).toEqual([
        ['1r', 4, -1],
        [1, '4r', 1],
      ]);
    });

    it('should return value for notes bigger than beat', () => {
      expect(groupRhythmPerBeat([8, 8], '4/4')).toEqual([[8], [8]]);
      expect(groupRhythmPerBeat([16], '4/4')).toEqual([[16]]);
      expect(groupRhythmPerBeat([1, 9, 3, 3], '4/4')).toEqual([[1, 3], [-4], [-2, 2], [-1, 3]]);
      expect(groupRhythmPerBeat([5, 3, 7, 3], '9/8')).toEqual([
        [4, -1, 1],
        [-2, 4],
        [-3, 3],
      ]);
      expect(groupRhythmPerBeat([14, 4, 4, '2r'], '3/2')).toEqual([[8], [-6, 2], [-2, 4, '2r']]);
      expect(groupRhythmPerBeat([18, 2, 4], '3/2')).toEqual([[16], [-2, 2, 4]]);
    });

    it('should fit rhythm into time signature', () => {
      expect(groupRhythmPerBeat([1, 1], '2/4')).toEqual([[1, 1, '2r'], ['4r']]);
      expect(groupRhythmPerBeat([16], '2/4')).toEqual([[8]]);
      expect(groupRhythmPerBeat([8, 7, 2, '2r', 2], '4/4')).toEqual([[8], [4], [-3, 1]]);
      expect(groupRhythmPerBeat([2, 4], '3/4')).toEqual([[2, 2], [-2, '2r'], ['4r']]);
      expect(groupRhythmPerBeat([1, 3, 7], '2/2')).toEqual([
        [1, 3, 4],
        [-3, '4r', '1r'],
      ]);
      expect(groupRhythmPerBeat([17, 2, 9], '3/2')).toEqual([[16], [-1, 2, 4, -1]]);
    });
  });

  describe('convertBeatsToTiedBeats()', () => {
    it('should throw error', () => {
      expect(() => convertBeatsToTiedBeats([0.5])).toThrowError(new Error('Invalid beats'));
      expect(() => convertBeatsToTiedBeats([2.5])).toThrowError(new Error('Invalid beats'));
      expect(() => convertBeatsToTiedBeats([-3.5])).toThrowError(new Error('Invalid beats'));
      expect(() => convertBeatsToTiedBeats(['4.5r'])).toThrowError(new Error('Invalid beats'));
    });

    it('should convert beats to durations', () => {
      expect(convertBeatsToTiedBeats()).toEqual([]);
      expect(convertBeatsToTiedBeats([])).toEqual([]);
      expect(convertBeatsToTiedBeats([1, 2, 3, 4, 6, 8, 12, 16])).toEqual([1, 2, 3, 4, 6, 8, 12, 16]);
      expect(convertBeatsToTiedBeats([5, 7, 9, 10, 11, 13, 14, 15])).toEqual([
        4, -1, 6, -1, 8, -1, 8, -2, 8, -3, 12, -1, 12, -2, 12, -3,
      ]);
      expect(convertBeatsToTiedBeats([2, 7, 14, 23])).toEqual([2, 6, -1, 12, -2, 16, -6, -1]);

      expect(convertBeatsToTiedBeats([1, -4, -1, -2])).toEqual([1, -4, -1, -2]);
      expect(convertBeatsToTiedBeats(['7', 2, '5r', 3, '1'])).toEqual([6, -1, 2, '4r', '1r', 3, 1]);
      expect(convertBeatsToTiedBeats(['3r', '2r', '3r'])).toEqual(['3r', '2r', '3r']);
    });
  });

  describe('getDurationLabel()', () => {
    it('should throw', () => {
      expect(() => getDurationLabel()).toThrowError(new Error('Invalid duration'));
      expect(() => getDurationLabel(10)).toThrowError(new Error('Invalid duration'));
      expect(() => getDurationLabel(-7)).toThrowError(new Error('Invalid duration'));
    });

    it('should return label', () => {
      expect(getDurationLabel(1)).toEqual('Semiquaver');
      expect(getDurationLabel(-2)).toEqual('tied Quaver');
      expect(getDurationLabel('4')).toEqual('Crotchet');
      expect(getDurationLabel('-4r')).toEqual('Crotchet rest');
      expect(getDurationLabel(-8)).toEqual('tied Minim');
      expect(getDurationLabel(16)).toEqual('Semibreve');
      expect(getDurationLabel('16r')).toEqual('Semibreve rest');
    });
  });
});
