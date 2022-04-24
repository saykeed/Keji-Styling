import { createStore } from 'vuex'

export default createStore({
  state: {
    fav: 0,
    cart: 0,
    loading: false
  },
  // getters: {
  // },
  mutations: {
    updateFav(state, payload) {
      state.fav = payload
    },
    updateCart(state, payload) {
      state.cart = payload
    },
    updateLoadingStatus(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    getFavAmount(context, payload) {
      if (!localStorage.getItem('favorites')) {
          localStorage.setItem('favorites', '[]')
      }
      let favs = JSON.parse(localStorage.getItem('favorites'))
      context.commit('updateFav', favs.length)
    },
    getCartAmount(context, payload) {
      if (!localStorage.getItem('cart')) {
          localStorage.setItem('cart', '[]')
      }
      let carted = JSON.parse(localStorage.getItem('cart'))
      context.commit('updateCart', carted.length)
    }
  }
})
