let mockUser = {
  id: 1,
  name: 'Luke',
  showTab: true,
  showGuitarFretboard: true,
};

export const login = () => {
  console.log('fake login ep');
  return Promise.resolve();
};

export const getCurrentUser = () => {
  console.log('fake get current user ep');
  return Promise.resolve(mockUser);
};

export const updateUser = (newUser) => {
  mockUser = newUser;
  console.log('fake update user ep', newUser);
  return Promise.resolve(newUser);
};
