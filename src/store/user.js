import { create } from 'zustand';

const initialState = {
  id: 0,
  name: '',
  showTab: false,
  showGuitarFretboard: false,
};

export const useUserStore = create((set) => ({
  ...initialState,

  setUser: (user) => set(user, true),
  reset: () => set(initialState),
}));
