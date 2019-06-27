import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import { db, firebaseConfig } from "@/api/config.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: "",
    userName: "",
    roomList: []
  },
  mutations: {
    setIsLogin(state, data) {
      state.isLogin = data;
    },
    setUserName(state, data) {
      state.userName = data;
    },
    setAllRooms(state, data) {
      state.roomList = data;
    }
  },
  actions: {
    login({ commit, state }, option) {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      console.log(option, "==========================");
      let provider;
      if (option == "google") {
        provider = new firebase.auth.GoogleAuthProvider();
      }
      if (option == "facebook") {
        provider = new firebase.auth.FacebookAuthProvider();
      }
      if (option == "github") {
        provider = new firebase.auth.GithubAuthProvider();
      }

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          let token = result.credential.accessToken;
          let user = result.user;
          if (provider == "google") {
            user = result.user;
          }
          if (provider == "facebook" || provider == "github") {
            user = result.user.providerData[0];
          }

          let { email, displayName, photoURL } = user;
          localStorage.token = token;
          localStorage.user = JSON.stringify({ email, displayName, photoURL });
          localStorage.setItem("userName", user.displayName);
          commit("setIsLogin", true);
          commit("setUserName", user.displayName);
        })
        .catch(error => {
          console.log(error);
        });
    },
    checkLogin({ commit, state }) {
      if (localStorage.token) {
        let user = JSON.parse(localStorage.user);
        commit("setIsLogin", true);
        commit("setUserName", user.displayName);
      } else {
        commit("setIsLogin", false);
        commit("setUserName", "")
      }
    },
    getAllRooms({ commit, state }) {
      db.collection("rooms").onSnapshot(querySnapshot => {
        let list = [];
        querySnapshot.forEach(doc => {
          list.push({
            id: doc.id,
            ...doc.data()
          });
        });
        commit("setAllRooms", list);
      });
    }
  }
});
