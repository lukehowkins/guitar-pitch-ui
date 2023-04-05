import { create } from 'zustand';
import { getNoteRange } from '../services/guitar';
import { shiftOct } from '../services/notes';

export const useGameStore = create((set) => ({
  games: [],
  difficulty: 0,
  lowestFret: 0,
  highestFret: 0,
  lowestNote: '',
  highestNote: '',
  lowestStaveNote: '',
  highestStaveNote: '',

  setGames: (games) => set({ games }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setRange: (lowestFret, highestFret) => {
    const [lowestNote, highestNote] = getNoteRange(lowestFret, highestFret);
    const lowestStaveNote = shiftOct(lowestNote, 1);
    const highestStaveNote = shiftOct(highestNote, 1);
    set({ lowestFret, highestFret, lowestNote, highestNote, lowestStaveNote, highestStaveNote });
  },
}));
