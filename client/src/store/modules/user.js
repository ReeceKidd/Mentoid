import axios from 'axios'
const apiURI = 'http://localhost:4000'

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function(state, user) {
    state.authUser = user
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    return axios({
      url: `/login`,
      baseURL: apiURI,
      method: 'post',
      data: {
        email,
        password
      }
    })
      .then(res => {
        window.localStorage.setItem('mentoid', res.data.token)
        commit('SET_USER', res.data.user)
      })
      .catch(error => {
        console.log(error)
        throw new Error('Invalid username or password')
      })
  },
  register({ commit }, { userData }) {
    return axios({
      url: `/register`,
      baseURL: apiURI,
      method: 'post',
      data: userData
    })
      .then(res => {
        window.localStorage.setItem('mentoid', res.data.token)
        commit('SET_USER', res.data.user)
      })
      .catch(error => {
        console.log(error)
        throw new Error('Bad credentials')
      })
  },
  updateAreasOfInterest({ commit }, { updateInfo }) {
    return axios({
      url: `/update/areas-of-interest`,
      baseURL: apiURI,
      method: 'post',
      data: updateInfo
    })
      .then(res => {
        window.localStorage.setItem('mentoid', res.data.token)
        commit('SET_USER', res.data.user)
      })
      .catch(error => {
        console.log(error)
        throw new Error('Could not update areas of interest.')
      })
  },
  logout({ commit }) {
    window.localStorage.removeItem('mentoid')
    commit('SET_USER', null)
    window.location.replace('/')
  }
}

export default {
  state,
  actions,
  mutations
}
