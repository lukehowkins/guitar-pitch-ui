import { create } from 'zustand';

export const useUserStore = create((set) => ({
  id: 0,
  name: '',
  showTab: false,
  showGuitarFretboard: false,
  setUser: (user) => set(user, true),
}));
