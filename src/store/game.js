import { create } from 'zustand';
import { getNoteRange } from '../services/guitar';
import { shiftOct } from '../services/notes';
import { GAME_LABELS } from '../constants/games';
import GAMES from '../components/games';

const initialState = {
  type: '',
  label: '',
  Component: null,
  total: 0,
  difficulty: 0,
  lowestFret: 0,
  highestFret: 0,
  lowestNote: '',
  highestNote: '',
  lowestStaveNote: '',
  highestStaveNote: '',
};

export const useGameStore = create((set) => ({
  ...initialState,

  setType: (type) => set({ type, label: GAME_LABELS[type], Component: GAMES[type] }),
  setTotal: (total) => set({ total }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setRange: (lowestFret, highestFret) => {
    const [lowestNote, highestNote] = getNoteRange(lowestFret, highestFret);
    const lowestStaveNote = shiftOct(lowestNote, 1);
    const highestStaveNote = shiftOct(highestNote, 1);
    set({ lowestFret, highestFret, lowestNote, highestNote, lowestStaveNote, highestStaveNote });
  },
  reset: () => set(initialState),
}));
