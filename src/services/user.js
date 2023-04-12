import { useUserStore } from '../store/user';
import * as api from './api';

export const login = async () => {
  await api.login();
  useUserStore.setState(await api.getCurrentUser());
};

export const updateUser = async (user) => {
  await api.updateUser(user);
  useUserStore.setState(user);
};
