export const KEYS = {
  C: [],
  G: ['F#'],
  D: ['F#', 'C#'],
  A: ['F#', 'C#', 'G#'],
  E: ['F#', 'C#', 'G#', 'D#'],
  B: ['F#', 'C#', 'G#', 'D#', 'A#'],
  'F#': ['F#', 'C#', 'G#', 'D#', 'A#', 'G#'],
  'C#': ['F#', 'C#', 'G#', 'D#', 'A#', 'G#', 'B#'],
  F: ['Bb'],
  Bb: ['Bb', 'Eb'],
  Eb: ['Bb', 'Eb', 'Ab'],
  Ab: ['Bb', 'Eb', 'Ab', 'Db'],
  Db: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'],
  Gb: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'],
  Cb: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'],
  Am: [],
  Em: ['F#'],
  Bm: ['F#', 'C#'],
  'F#m': ['F#', 'C#', 'G#'],
  'C#m': ['F#', 'C#', 'G#', 'D#'],
  'C#m': ['F#', 'C#', 'G#', 'D#', 'A#'],
  'G#m': ['F#', 'C#', 'G#', 'D#', 'A#', 'G#'],
  'D#m': ['F#', 'C#', 'G#', 'D#', 'A#', 'G#', 'B#'],
  Dm: ['Bb'],
  Gm: ['Bb', 'Eb'],
  Cm: ['Bb', 'Eb', 'Ab'],
  Fm: ['Bb', 'Eb', 'Ab', 'Db'],
  Bbm: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'],
  Ebm: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'],
  Abm: ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'],
};

export const NOTES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

export const EQUIVALENT_NOTES = {
  'C#': 'Db',
  'D#': 'Eb',
  'E#': 'F',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb',
  'B#': 'C',
  Cb: 'B',
  Db: 'C#',
  Eb: 'D#',
  Fb: 'E#',
  Gb: 'F',
  Ab: 'G#',
  Bb: 'A#',
};

export const INTERVALS = {
  P1: 0,
  m2: 1,
  M2: 2,
  m3: 3,
  M3: 4,
  P4: 5,
  d5: 6,
  P5: 7,
  m6: 8,
  M6: 9,
  m7: 10,
  M7: 11,
  P8: 12, // octave
  m9: 13,
  M9: 14,
  m10: 15,
  M10: 16,
  P11: 17,
  d12: 18,
  P12: 19,
  m13: 20,
  M13: 21,
  m14: 22,
  M14: 23,
  '2 octaves': 24,
};

export const BEATS = [4, 8, 16, 2, 1, 6, 12, 3, 1.5];

export const BEATS_TO_DURATIONS_MAP = {
  16: 1,
  12: 2,
  8: 2,
  6: 4,
  4: 4,
  3: 8,
  2: 8,
  1.5: 16,
  1: 16,
};

export const BEATS_LABEL = {
  16: 'Semibreve',
  12: 'Dotted minim',
  8: 'Minim',
  6: 'Dotted crotchet',
  4: 'Crotchet',
  3: 'Dotted quaver',
  2: 'Quaver',
  1.5: 'Dotted semiquaver',
  1: 'Semiquaver',
};

export const TIMESIGNATURES = ['4/4', '3/4', '2/4', '5/4', '6/8', '9/8', '12/8'];
