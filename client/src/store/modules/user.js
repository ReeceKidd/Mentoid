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
        console.log(res)
        if (res.status === 800) {
          console.log(res.message)
        } else {
          console.log('Success')
        }
      })
      .catch(error => {
        console.log(error)
        throw new Error(error.message)
      })
  },
  logout({ commit }, {_id}) {
    // Ensures user is set as logged out in the database.
    console.log(_id)
    const setUserAsLoggedOut = 'http://localhost:4000/logout/'
    axios.get(setUserAsLoggedOut + _id).then(function (response) {
      console.log(response)
    })
    window.localStorage.removeItem('mentoid')
    commit('SET_USER', null)
    // window.location.replace('/')
  }
}

export default {
  state,
  actions,
  mutations
}
