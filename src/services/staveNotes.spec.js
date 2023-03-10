import { describe, it, expect } from 'vitest';
import { getStaveNote, getStaveChord } from './staveNotes';

describe('notes', () => {
  describe('getStaveNote', () => {
    it('should throw error', () => {
      expect(() => getStaveNote()).toThrow();
      expect(() => getStaveNote('')).toThrow();
      expect(() => getStaveNote('C')).toThrow();
      expect(() => getStaveNote('C4')).toThrow();
    });
    it('should return note with no accidentals', () => {
      const note = getStaveNote('C/4');
      expect(note.duration).toEqual('4');
      expect(note.modifiers).toHaveLength(0);
      expect(note.keys).toEqual(['C/4']);

      const note2 = getStaveNote('Bb/4', 'Dm');
      expect(note2.duration).toEqual('4');
      expect(note2.modifiers).toHaveLength(0);
      expect(note2.keys).toEqual(['Bb/4']);

      const note3 = getStaveNote('F#/4', 'G');
      expect(note3.duration).toEqual('4');
      expect(note3.modifiers).toHaveLength(0);
      expect(note3.keys).toEqual(['F#/4']);
    });

    it('should return note with accidentals', () => {
      const note = getStaveNote('C#/4');
      expect(note.duration).toEqual('4');
      expect(note.modifiers[0].accidental.code).toEqual('accidentalSharp');
      expect(note.keys).toEqual(['C#/4']);

      const note2 = getStaveNote('B/4', 'Dm');
      expect(note2.duration).toEqual('4');
      expect(note2.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(note2.keys).toEqual(['B/4']);

      const note3 = getStaveNote('F/4', 'G');
      expect(note3.duration).toEqual('4');
      expect(note3.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(note3.keys).toEqual(['F/4']);

      const note4 = getStaveNote('Bb/4', 'C#');
      expect(note4.duration).toEqual('4');
      expect(note4.modifiers[0].accidental.code).toEqual('accidentalFlat');
      expect(note4.keys).toEqual(['Bb/4']);
    });
  });

  describe('getStaveChord', () => {
    it('should throw error', () => {
      expect(() => getStaveChord()).toThrow();
      expect(() => getStaveChord([])).toThrow();
      expect(() => getStaveChord(['C'])).toThrow();
      expect(() => getStaveChord(['C4'])).toThrow();
    });

    it('should return chord with no accidentals', () => {
      const chord = getStaveChord(['C/4', 'E/4', 'G/4']);
      expect(chord.duration).toEqual('4');
      expect(chord.modifiers).toHaveLength(0);
      expect(chord.keys).toEqual(['C/4', 'E/4', 'G/4']);

      const chord2 = getStaveChord(['Bb/4', 'D/5'], 'Dm');
      expect(chord2.duration).toEqual('4');
      expect(chord2.modifiers).toHaveLength(0);
      expect(chord2.keys).toEqual(['Bb/4', 'D/5']);

      const chord3 = getStaveChord(['F#/4', 'C/5'], 'G');
      expect(chord3.duration).toEqual('4');
      expect(chord3.modifiers).toHaveLength(0);
      expect(chord3.keys).toEqual(['F#/4', 'C/5']);
    });

    it('should return chord with accidentals', () => {
      const chord = getStaveChord(['C#/4', 'E#/5', 'G#/5']);
      expect(chord.duration).toEqual('4');
      expect(chord.modifiers).toHaveLength(3);
      expect(chord.modifiers[0].accidental.code).toEqual('accidentalSharp');
      expect(chord.modifiers[1].accidental.code).toEqual('accidentalSharp');
      expect(chord.modifiers[2].accidental.code).toEqual('accidentalSharp');
      expect(chord.keys).toEqual(['C#/4', 'E#/5', 'G#/5']);

      const chord2 = getStaveChord(['B/4', 'D/5'], 'Dm');
      expect(chord2.duration).toEqual('4');
      expect(chord2.modifiers).toHaveLength(1);
      expect(chord2.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(chord2.modifiers[0].index).toEqual(0);
      expect(chord2.keys).toEqual(['B/4', 'D/5']);

      const chord3 = getStaveChord(['A/3', 'F/4'], 'G');
      expect(chord3.duration).toEqual('4');
      expect(chord3.modifiers).toHaveLength(1);
      expect(chord3.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(chord3.modifiers[0].index).toEqual(1);
      expect(chord3.keys).toEqual(['A/3', 'F/4']);

      const chord4 = getStaveChord(['Bb/4', 'D#/5', 'F/5'], 'C#');
      expect(chord4.duration).toEqual('4');
      expect(chord4.modifiers).toHaveLength(2);
      expect(chord4.modifiers[0].accidental.code).toEqual('accidentalFlat');
      expect(chord4.modifiers[0].index).toEqual(0);
      expect(chord4.modifiers[1].accidental.code).toEqual('accidentalNatural');
      expect(chord4.modifiers[1].index).toEqual(2);
      expect(chord4.keys).toEqual(['Bb/4', 'D#/5', 'F/5']);
    });
  });
});
