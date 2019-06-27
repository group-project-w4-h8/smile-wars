<template>
  <v-app>
    <NavBar @TriggerLogin="callLogin" @TriggerRegister="callRegister"></NavBar>
      <v-parallax
      v-show="isLogin"
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
    
      <RegisterButton :triggerRegister="triggerRegister"></RegisterButton>
      <LoginButton :triggerLogin="triggerLogin"></LoginButton>

    
    </v-layout>
  </v-parallax>
    <v-content>
      <v-container>
        <v-layout row>
        
          <PlayerCard></PlayerCard>

          <v-flex xs1 style="margin-top:16%;">
            <v-img
            src="/versus.jpg"
            height="110"
            >

            </v-img>
          </v-flex>

          <PlayerCard></PlayerCard>

         
          

        </v-layout>

      </v-container>

    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar"
import RegisterButton from "./components/RegisterButton"
import LoginButton from "./components/LoginButton"
import PlayerCard from "./components/PlayerCard"


export default {
  name: 'App',
  components: {
   NavBar,
   RegisterButton,
   LoginButton,
   PlayerCard
  },
  data () {
    return {
      triggerRegister: 0,
      triggerLogin: 0,
      isLogin: false,
    }
  },
  methods: {
    callRegister: function () {
      this.triggerRegister ++
    },
    callLogin: function () {
      this.triggerLogin ++
    }
  }
}
</script>
