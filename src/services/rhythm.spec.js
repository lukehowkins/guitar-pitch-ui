import { describe, expect, it } from 'vitest';
import { getTotalBeats, groupRhythmPerBeat, getDurationLabel } from './rhythm';

describe('rhythm', () => {
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
    it('should throw', () => {
      expect(() => groupRhythmPerBeat([], '4/4')).toThrowError(new Error('Not enough beats'));
      expect(() => groupRhythmPerBeat([1, 1], '2/4')).toThrowError(new Error('Not enough beats'));
      expect(() => groupRhythmPerBeat([16], '2/4')).toThrowError(new Error('Too many beats'));
    });

    it('should return value when notes are smaller than beat', () => {
      expect(groupRhythmPerBeat([4, 4, 4, 4], '4/4')).toEqual([[4], [4], [4], [4]]);
      expect(groupRhythmPerBeat([2, 2, 1, 2, 1, 1, 1, 1, 1], '3/4')).toEqual([
        [2, 2],
        [1, 2, 1],
        [1, 1, 1, 1],
      ]);
      expect(groupRhythmPerBeat([2, 2, 2, 1, 1, 2, 1, 1], '6/8')).toEqual([
        [2, 2, 2],
        [1, 1, 2, 1, 1],
      ]);
      expect(groupRhythmPerBeat([3, 0.5, 0.5, 0.5, 1.5, 2], '2/4')).toEqual([
        [3, 0.5, 0.5],
        [0.5, 1.5, 2],
      ]);
    });

    it('should return value tied across beats', () => {
      expect(groupRhythmPerBeat([2, 4, 1, 1, 4], '3/4')).toEqual([[2, 2], [-2, 1, 1], [4]]);
      expect(groupRhythmPerBeat([6, 4, 6, 4], '5/4')).toEqual([[4], [-2, 2], [-2, 2], [-4], [4]]);
      expect(groupRhythmPerBeat([4, 6, 1, 2, 4, 1], '9/8')).toEqual([
        [4, 2],
        [-4, 1, 1],
        [-1, 4, 1],
      ]);
      expect(groupRhythmPerBeat([3, 1.5, 1.5, 2], '2/4')).toEqual([
        [3, 1],
        [-0.5, 1.5, 2],
      ]);
      expect(groupRhythmPerBeat([4, 3.5, 4.5], '6/8')).toEqual([
        [4, 2],
        [-1.5, 4.5],
      ]);
    });

    it('should return value for notes bigger than beat', () => {
      expect(groupRhythmPerBeat([8, 8], '4/4')).toEqual([[4], [-4], [4], [-4]]);
      expect(groupRhythmPerBeat([16], '4/4')).toEqual([[4], [-4], [-4], [-4]]);
      expect(groupRhythmPerBeat([1, 9, 3, 3], '4/4')).toEqual([[1, 3], [-4], [-2, 2], [-1, 3]]);
      expect(groupRhythmPerBeat([5, 3, 7, 3], '9/8')).toEqual([
        [5, 1],
        [-2, 4],
        [-3, 3],
      ]);
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
      expect(getDurationLabel(-8)).toEqual('tied Minim');
      expect(getDurationLabel(16)).toEqual('Semibreve');
    });
  });
});
