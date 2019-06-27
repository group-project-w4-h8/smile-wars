<template>
  <v-app>
    <NavBar @TriggerLogin="callLogin" @TriggerRegister="callRegister"></NavBar>
      <v-parallax
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

      <!-- <v-btn></v-btn> -->
    </v-layout>
  </v-parallax>
    <v-content>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar"
import RegisterButton from "./components/RegisterButton"
import LoginButton from "./components/LoginButton"

export default {
  name: 'App',
  components: {
   NavBar,
   RegisterButton,
   LoginButton
  },
  data () {
    return {
      triggerRegister: 0,
      triggerLogin: 0
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
