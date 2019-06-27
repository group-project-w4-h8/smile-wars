<template>
  <div>
    <div v-if="$store.state.isLogin == false">
      <LoginPage></LoginPage>
    </div>
    <div v-if="$store.state.isLogin">  
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoginPage from "@/components/Login.vue";
import { db } from "@/api/config.js";

export default {
  name: "home",
  components: {
    LoginPage,

  },
  created() {

  },
  computed: {
    ...mapState(["isLogin"])
  }
}
</script>
