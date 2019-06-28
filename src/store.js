import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import { db, firebaseConfig } from "@/api/config.js";
import audio_1 from "@/assets/Heal8-Bit.ogg";
import swal from "sweetalert2";
Vue.use(Vuex);
// console.log(audio_1)
export default new Vuex.Store({
  state: {
    isLogin: false,
    userName: "",
    roomList: [],
    login_logout_sound: new Audio(audio_1)
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
          console.log(JSON.stringify(user));
          localStorage.token = token;
          localStorage.user = JSON.stringify({ email, displayName, photoURL });
          console.log(user.email);
          localStorage.setItem("userName", user.displayName);
          commit("setIsLogin", true);
          commit("setUserName", displayName);
          let theUser = displayName;
          if (displayName == null) {
            if (email !== null) {
              theUser = email;
            } else {
              theUser = "anonymous" + new Date().setSeconds().toString();
            }
          }
          if (email == null) {
            if (displayName !== null) {
              theUser = displayName;
            } else {
              theUser = "anonymous" + new Date().setSeconds().toString();
            }
          }
          commit("setUserName", theUser);
          swal.fire(
            "Hello User!",
            `You are logged in as ${theUser} using ${option}`,
            "success"
          );
          state.login_logout_sound.play();
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
        commit("setUserName", "");
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
    },
    updateARoom({ commit, state }, selectedRoom) {
      console.log("trigger")
      selectedRoom.current_player--;
      if (selectedRoom.current_player <= 0) {
        if (
          selectedRoom.player_1 == state.userName ||
          selectedRoom.player_2 == state.userName
        ) {
          db.collection("rooms")
            .doc(selectedRoom.id)
            .delete()
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        if (selectedRoom.player_1 === state.userName) {
          db.collection("rooms")
            .doc(selectedRoom.id)
            .update({
              player_1: "",
              current_player: selectedRoom.current_player
            })
            .then(res => {
              router.push("/lobby");
            });
        } else if (selectedRoom.player_2 === state.userName) {
          db.collection("rooms")
            .doc(selectedRoom.id)
            .update({
              player_2: "",
              current_player: selectedRoom.current_player
            })
            .then(res => {
              router.push("/lobby");
            });
        } else {
          router.push("/lobby");
        }
      }
    }
  }
});
