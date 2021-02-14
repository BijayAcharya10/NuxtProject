export const state = () => ({
  users: [
    {
      id: 1,
      name: 'Bijay',
      email: 'bijay@gmail.com',
      status: 'Inactive',
      mobile: '9867898438'
    },
    {
      id: 2,
      name: 'Sudeep',
      email: 'sudeep@gmail.com',
      status: 'Active',
      mobile: '9854179845'
    },
    {
      id: 3,
      name: 'Aayan',
      email: 'aayanacharya@gmail.com',
      status: 'Active',
      mobile: '9847621487'
    }
  ]
});

export const mutations = {
  saveUser(state, user) {
    state.users.push(user);
  },
  deleteUser(state, user) {
    state.users.pop(user);
  }
};

export const getters = {
  getAll: state => state.users,
  getCount: state => state.users.length
};
