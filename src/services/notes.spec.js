import { describe, it, expect } from 'vitest';
import { getNote } from './notes';

describe('notes', () => {
  describe('getNotes', () => {
    it('should return note with no accidentals', () => {
      const note = getNote('C', 4);
      expect(note.duration).toEqual('4');
      expect(note.modifiers).toHaveLength(0);
      expect(note.keys).toEqual(['C/4']);

      const note2 = getNote('Bb', 4, 'Dm');
      expect(note2.duration).toEqual('4');
      expect(note2.modifiers).toHaveLength(0);
      expect(note2.keys).toEqual(['Bb/4']);

      const note3 = getNote('F#', 4, 'G');
      expect(note3.duration).toEqual('4');
      expect(note3.modifiers).toHaveLength(0);
      expect(note3.keys).toEqual(['F#/4']);
    });

    it('should return note with accidentals', () => {
      const note = getNote('C#', 4);
      expect(note.duration).toEqual('4');
      expect(note.modifiers[0].accidental.code).toEqual('accidentalSharp');
      expect(note.keys).toEqual(['C#/4']);

      const note2 = getNote('B', 4, 'Dm');
      expect(note2.duration).toEqual('4');
      expect(note2.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(note2.keys).toEqual(['B/4']);

      const note3 = getNote('F', 4, 'G');
      expect(note3.duration).toEqual('4');
      expect(note3.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(note3.keys).toEqual(['F/4']);

      const note4 = getNote('Bb', 4, 'C#');
      expect(note4.duration).toEqual('4');
      expect(note4.modifiers[0].accidental.code).toEqual('accidentalFlat');
      expect(note4.keys).toEqual(['Bb/4']);
    });
  });
});
