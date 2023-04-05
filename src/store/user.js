import { create } from 'zustand';

export const useUserStore = create((set) => ({
  id: 0,
  name: '',
  setUser: (user) => set(user, true),
}));
