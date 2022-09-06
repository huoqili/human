import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { UserInfo } from '../type/base'
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})
 


export default createStore({
  state: {
    token: '',
    userInfo:{}
  },
  mutations: {
    setToken(state, token:string){
      state.token = token;
    },
    setUserInfo(state,userInfo: UserInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
