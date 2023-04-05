const mockUser = {
  id: 1,
  name: 'Luke',
};

export const login = () => {
  console.log('fake login ep');
  return Promise.resolve();
};

export const getCurrentUser = () => {
  console.log('fake get current user ep');
  return Promise.resolve(mockUser);
};
