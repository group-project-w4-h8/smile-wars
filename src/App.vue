<template>
  <v-app>
    <NavBar></NavBar>
      <v-parallax
      v-show="!$store.state.isLogin"
      dark
      src="/parallax.webp"
      height=1000
      >
    <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-2 font-weight-thin mb-3">Vuetify.js</h1>
      <h4 class="subheading">Build your application today!</h4>
    
      <LoginButton></LoginButton>

    
    </v-layout>
  </v-parallax>
    <v-content>
      <v-container>
        <router-view></router-view>
        

      </v-container>

    </v-content>
  </v-app>
</template>


<script>
import NavBar from "./components/NavBar"
import LoginButton from "./components/LoginButton"
import PlayerCard from "./components/PlayerCard"

import { mapActions } from "vuex";

export default {
  name: 'App',
  components: {
   NavBar,
   LoginButton,
   PlayerCard
  },
  data () {
    return {
      triggerRegister: 0,
      triggerLogin: 0,
    }
  },
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapActions(["checkLogin"])
  }
}
</script>
