
const action = {
  state: {
    user: '',
    online: 'false'
  },

  mutations: {
    SET_ONLINE: (state, online) => {
      state.online = online
    }
  },

  actions: {
    getOnline() {
      console.log('online')
    }
  }
}

export default action
