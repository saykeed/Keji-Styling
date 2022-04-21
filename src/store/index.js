import { createStore } from 'vuex'

export default createStore({
  state: {
    fav: 0
  },
  // getters: {
  // },
  mutations: {
    updateFav(state, payload) {
      state.fav = payload
    }
  },
  actions: {
    getFavAmount(context, payload) {
      if (!localStorage.getItem('favorites')) {
          localStorage.setItem('favorites', '[]')
      }
      let favs = JSON.parse(localStorage.getItem('favorites'))
      context.commit('updateFav', favs.length)
    }
  }
})
