import { describe, it, expect } from 'vitest';
import { getStaveNote, getStaveChord, getAccidentals, getStaveRest, isStaveRest } from './staveNotes';

describe('notes', () => {
  describe('getStaveRest', () => {
    it('should return rest', () => {
      let rest = getStaveRest();
      expect(rest.duration).toEqual('4');
      expect(rest.modifiers).toHaveLength(0);
      expect(rest.keys).toEqual(['B/4']);
      expect(rest.isDotted()).toBe(false);
      expect(isStaveRest(rest)).toBe(true);

      rest = getStaveRest(12, 'red', 'E/3');
      expect(rest.duration).toEqual('2');
      expect(rest.modifiers).toHaveLength(1);
      expect(rest.modifiers[0].attrs.type).toEqual('Dot');
      expect(rest.isDotted()).toBe(true);
      expect(rest.keys).toEqual(['E/3']);
    });
  });

  describe('getStaveNote', () => {
    it('should throw error', () => {
      expect(() => getStaveNote()).toThrow();
      expect(() => getStaveNote('')).toThrow();
      expect(() => getStaveNote('C')).toThrow();
      expect(() => getStaveNote('C4')).toThrow();
      expect(() => getStaveNote('C/4', 7)).toThrow();
    });

    it('should return note with no accidentals', () => {
      const note = getStaveNote('C/4');
      expect(note.duration).toEqual('4');
      expect(note.modifiers).toHaveLength(0);
      expect(note.keys).toEqual(['C/4']);
      expect(note.isDotted()).toBe(false);
      expect(isStaveRest(note)).toBe(false);

      const note2 = getStaveNote('Bb/4', 8, 'Dm');
      expect(note2.duration).toEqual('2');
      expect(note2.modifiers).toHaveLength(0);
      expect(note2.keys).toEqual(['Bb/4']);

      const note3 = getStaveNote('F#/4', 4, 'G');
      expect(note3.duration).toEqual('4');
      expect(note3.modifiers).toHaveLength(0);
      expect(note3.keys).toEqual(['F#/4']);

      const note4 = getStaveNote('F/4', '2', 'D', 'black', ['Fn']);
      expect(note4.duration).toEqual('8');
      expect(note4.modifiers).toHaveLength(0);
      expect(note4.keys).toEqual(['F/4']);

      const tiedNote = getStaveNote('F/4', -2);
      expect(tiedNote.duration).toEqual('8');
      expect(tiedNote.modifiers).toHaveLength(0);
      expect(tiedNote.keys).toEqual(['F/4']);

      const rest = getStaveNote('F/4', '4r');
      expect(rest.duration).toEqual('4');
      expect(rest.modifiers).toHaveLength(0);
      expect(rest.keys).toEqual(['F/4']);
      expect(isStaveRest(rest)).toBe(true);
    });

    it('should return note with accidentals', () => {
      const note = getStaveNote('C#/4');
      expect(note.duration).toEqual('4');
      expect(note.modifiers[0].accidental.code).toEqual('accidentalSharp');
      expect(note.keys).toEqual(['C#/4']);
      expect(isStaveRest(note)).toBe(false);

      const note2 = getStaveNote('B/4', 4, 'Dm');
      expect(note2.duration).toEqual('4');
      expect(note2.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(note2.keys).toEqual(['B/4']);

      const note3 = getStaveNote('F/4', 4, 'G');
      expect(note3.duration).toEqual('4');
      expect(note3.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(note3.keys).toEqual(['F/4']);

      const note4 = getStaveNote('Bb/4', 4, 'C#');
      expect(note4.duration).toEqual('4');
      expect(note4.modifiers[0].accidental.code).toEqual('accidentalFlat');
      expect(note4.keys).toEqual(['Bb/4']);

      const note5 = getStaveNote('F/4', 4, 'C', 'black', ['F#']);
      expect(note5.duration).toEqual('4');
      expect(note5.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(note5.keys).toEqual(['F/4']);

      const note6 = getStaveNote('F/4', 4, 'D', 'black', ['D#']);
      expect(note6.duration).toEqual('4');
      expect(note6.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(note6.keys).toEqual(['F/4']);
    });

    it('should render with dot', () => {
      const note = getStaveNote('F/4', 3);
      expect(note.duration).toEqual('8');
      expect(note.modifiers).toHaveLength(1);
      expect(note.modifiers[0].attrs.type).toEqual('Dot');
      expect(note.keys).toEqual(['F/4']);
      expect(note.isDotted()).toBe(true);
      expect(isStaveRest(note)).toBe(false);

      const note2 = getStaveNote('F/4', 12);
      expect(note2.duration).toEqual('2');
      expect(note2.modifiers).toHaveLength(1);
      expect(note2.modifiers[0].attrs.type).toEqual('Dot');
      expect(note2.keys).toEqual(['F/4']);
      expect(note2.isDotted()).toBe(true);
    });
  });

  describe('getStaveChord', () => {
    it('should throw error', () => {
      expect(() => getStaveChord()).toThrow();
      expect(() => getStaveChord([])).toThrow();
      expect(() => getStaveChord(['C'])).toThrow();
      expect(() => getStaveChord(['C4'])).toThrow();
      expect(() => getStaveChord(['C/4'], 7)).toThrow();
    });

    it('should return chord with no accidentals', () => {
      const chord = getStaveChord(['C/4', 'E/4', 'G/4']);
      expect(chord.duration).toEqual('4');
      expect(chord.modifiers).toHaveLength(0);
      expect(chord.keys).toEqual(['C/4', 'E/4', 'G/4']);
      expect(isStaveRest(chord)).toBe(false);

      const chord2 = getStaveChord(['Bb/4', 'D/5'], 8, 'Dm');
      expect(chord2.duration).toEqual('2');
      expect(chord2.modifiers).toHaveLength(0);
      expect(chord2.keys).toEqual(['Bb/4', 'D/5']);

      const chord3 = getStaveChord(['F#/4', 'C/5'], 4, 'G');
      expect(chord3.duration).toEqual('4');
      expect(chord3.modifiers).toHaveLength(0);
      expect(chord3.keys).toEqual(['F#/4', 'C/5']);

      const chord4 = getStaveChord(['F/4', 'C/5'], 2, 'D', 'black', ['Fn', 'Cn']);
      expect(chord4.duration).toEqual('8');
      expect(chord4.modifiers).toHaveLength(0);
      expect(chord4.keys).toEqual(['F/4', 'C/5']);

      const chord7 = getStaveChord(['D#/5', 'F#/5'], 4, 'C', 'black', ['F#', 'D#']);
      expect(chord7.duration).toEqual('4');
      expect(chord7.modifiers).toHaveLength(0);
      expect(chord7.keys).toEqual(['D#/5', 'F#/5']);

      const tiedChord = getStaveChord(['F/4', 'G/6'], -2);
      expect(tiedChord.duration).toEqual('8');
      expect(tiedChord.modifiers).toHaveLength(0);
      expect(tiedChord.keys).toEqual(['F/4', 'G/6']);

      const rest = getStaveChord(['F/4', 'G/5'], '4r');
      expect(rest.duration).toEqual('4');
      expect(rest.modifiers).toHaveLength(0);
      expect(rest.keys).toEqual(['F/4']);
      expect(isStaveRest(rest)).toBe(true);
    });

    it('should return chord with accidentals', () => {
      const chord = getStaveChord(['C#/4', 'E#/5', 'G#/5']);
      expect(chord.duration).toEqual('4');
      expect(chord.modifiers).toHaveLength(3);
      expect(chord.modifiers[0].accidental.code).toEqual('accidentalSharp');
      expect(chord.modifiers[1].accidental.code).toEqual('accidentalSharp');
      expect(chord.modifiers[2].accidental.code).toEqual('accidentalSharp');
      expect(chord.keys).toEqual(['C#/4', 'E#/5', 'G#/5']);
      expect(isStaveRest(chord)).toBe(false);

      const chord2 = getStaveChord(['B/4', 'D/5'], 4, 'Dm');
      expect(chord2.duration).toEqual('4');
      expect(chord2.modifiers).toHaveLength(1);
      expect(chord2.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(chord2.modifiers[0].index).toEqual(0);
      expect(chord2.keys).toEqual(['B/4', 'D/5']);

      const chord3 = getStaveChord(['A/3', 'F/4'], 2, 'G');
      expect(chord3.duration).toEqual('8');
      expect(chord3.modifiers).toHaveLength(1);
      expect(chord3.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(chord3.modifiers[0].index).toEqual(1);
      expect(chord3.keys).toEqual(['A/3', 'F/4']);

      const chord4 = getStaveChord(['Bb/4', 'D#/5', 'F/5'], 4, 'C#');
      expect(chord4.duration).toEqual('4');
      expect(chord4.modifiers).toHaveLength(2);
      expect(chord4.modifiers[0].accidental.code).toEqual('accidentalFlat');
      expect(chord4.modifiers[0].index).toEqual(0);
      expect(chord4.modifiers[1].accidental.code).toEqual('accidentalNatural');
      expect(chord4.modifiers[1].index).toEqual(2);
      expect(chord4.keys).toEqual(['Bb/4', 'D#/5', 'F/5']);

      const chord5 = getStaveChord(['F#/4', 'C/5', 'G/5'], 4, 'D', 'black', ['G#']);
      expect(chord5.duration).toEqual('4');
      expect(chord5.modifiers).toHaveLength(2);
      expect(chord5.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(chord5.modifiers[0].index).toEqual(1);
      expect(chord5.modifiers[1].accidental.code).toEqual('accidentalNatural');
      expect(chord5.modifiers[1].index).toEqual(2);
      expect(chord5.keys).toEqual(['F#/4', 'C/5', 'G/5']);

      const chord6 = getStaveChord(['D/4', 'F/4'], 1, 'C', 'black', ['D#', 'F#']);
      expect(chord6.duration).toEqual('16');
      expect(chord6.modifiers).toHaveLength(2);
      expect(chord6.modifiers[0].accidental.code).toEqual('accidentalNatural');
      expect(chord6.modifiers[0].index).toEqual(0);
      expect(chord6.modifiers[1].accidental.code).toEqual('accidentalNatural');
      expect(chord6.modifiers[1].index).toEqual(1);
      expect(chord6.keys).toEqual(['D/4', 'F/4']);
    });

    it('should render with dot', () => {
      const chord = getStaveChord(['F/4', 'A/4'], 3);
      expect(chord.duration).toEqual('8');
      expect(chord.modifiers).toHaveLength(2);
      expect(chord.isDotted()).toBe(true);
      expect(chord.modifiers[0].attrs.type).toEqual('Dot');
      expect(chord.modifiers[1].attrs.type).toEqual('Dot');
      expect(chord.keys).toEqual(['F/4', 'A/4']);
      expect(isStaveRest(chord)).toBe(false);

      const chord2 = getStaveChord(['F/4', 'A/4'], 12);
      expect(chord2.duration).toEqual('2');
      expect(chord2.modifiers).toHaveLength(2);
      expect(chord2.isDotted()).toBe(true);
      expect(chord2.modifiers[0].attrs.type).toEqual('Dot');
      expect(chord2.modifiers[1].attrs.type).toEqual('Dot');
      expect(chord2.keys).toEqual(['F/4', 'A/4']);
    });
  });

  describe('getAccidentals', () => {
    it('should get accidentals', () => {
      let staveNote = getStaveNote('C/4');
      expect(getAccidentals(staveNote)).toEqual([]);
      staveNote = getStaveNote('Bb/4');
      expect(getAccidentals(staveNote)).toEqual(['Bb']);
      staveNote = getStaveNote('Bb/4', 4, 'F');
      expect(getAccidentals(staveNote, 'F')).toEqual([]);
      staveNote = getStaveNote('D#/4');
      expect(getAccidentals(staveNote, 'Am', ['Bb'])).toEqual(['Bb', 'D#']);
      staveNote = getStaveNote('F#/4', 4, 'D');
      expect(getAccidentals(staveNote)).toEqual([]);
      staveNote = getStaveNote('Eb/4', 4, 'C', 'black', ['Eb']);
      expect(getAccidentals(staveNote, 'C')).toEqual([]);
    });

    it('should override accidentals of same letter', () => {
      let staveNote = getStaveNote('C/4');
      expect(getAccidentals(staveNote, 'C', ['C#'])).toEqual(['Cn']);
      staveNote = getStaveNote('Bb/4', 4, 'F');
      expect(getAccidentals(staveNote, 'F', ['Bn'])).toEqual(['Bb']);
      staveNote = getStaveNote('B/4', 4, 'F');
      expect(getAccidentals(staveNote, 'F')).toEqual(['Bn']);
      staveNote = getStaveNote('D#/4');
      expect(getAccidentals(staveNote, 'C', ['Ab', 'Db'])).toEqual(['Ab', 'D#']);
      staveNote = getStaveNote('Eb/4', 4, 'C', 'black', ['Eb']);
      expect(getAccidentals(staveNote, 'C', ['Eb'])).toEqual(['Eb']);
      staveNote = getStaveNote('Eb/4', 4, 'Eb', 'black', ['En']);
      expect(getAccidentals(staveNote, 'Eb', ['En'])).toEqual(['Eb']);
    });

    it('should get accidentals for chord', () => {
      let staveChord = getStaveChord(['C/4', 'E/4']);
      expect(getAccidentals(staveChord)).toEqual([]);
      staveChord = getStaveChord(['Eb/5', 'Ab/5']);
      expect(getAccidentals(staveChord, 'C', ['Eb', 'Ab'])).toEqual(['Eb', 'Ab']);
      staveChord = getStaveChord(['C/4', 'E/4']);
      expect(getAccidentals(staveChord, 'C', ['C#'])).toEqual(['Cn']);
      staveChord = getStaveChord(['Cb/4', 'E#/4']);
      expect(getAccidentals(staveChord)).toEqual(['Cb', 'E#']);
      staveChord = getStaveChord(['Cb/4', 'F#/4', 'A/4'], 4, 'D');
      expect(getAccidentals(staveChord)).toEqual(['Cb']);
      staveChord = getStaveChord(['Cb/4', 'F#/4', 'A/4'], 4, 'D');
      expect(getAccidentals(staveChord, 'D', ['Fn', 'Ab', 'C#'])).toEqual(['Cb', 'F#', 'An']);

      staveChord = getStaveChord(['D#/4', 'F#/4'], 4, 'C', 'black', ['F#', 'D#']);
      expect(getAccidentals(staveChord, 'C', ['F#', 'D#'])).toEqual(['D#', 'F#']);
    });

    it('should override accidentals for chord', () => {
      let staveChord = getStaveChord(['C/4', 'E/4']);
      expect(getAccidentals(staveChord, 'C', ['C#', 'E#', 'G#'])).toEqual(['G#', 'Cn', 'En']);
      staveChord = getStaveChord(['D/4', 'F#/4', 'Ab/4'], 4, 'D');
      expect(getAccidentals(staveChord, 'D', ['C#', 'Fn'])).toEqual(['C#', 'F#', 'Ab']);
      staveChord = getStaveChord(['Bb/4', 'D/5', 'F/5']);
      expect(getAccidentals(staveChord, 'C', ['D#', 'F#'])).toEqual(['Bb', 'Dn', 'Fn']);
    });
  });
});
