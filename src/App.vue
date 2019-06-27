<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>


<script>
import NavBar from "./components/NavBar"
import RegisterButton from "./components/RegisterButton"
import LoginButton from "./components/LoginButton"
import { mapActions } from "vuex";

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
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapActions(["checkLogin"])
  }
}
</script>
