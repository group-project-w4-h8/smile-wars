<template>
    <v-parallax v-show="!$store.state.isLogin" dark src="/parallax.webp" style="height:100%;">
      <v-layout align-center column justify-center>
        <h1 class="display-2 font-weight-thin mb-3">Vuetify.js</h1>
        <h4 class="subheading">Build your application today!</h4>
        <LoginButton></LoginButton>
      </v-layout>
    </v-parallax>
</template>

<script>
import LoginButton from "@/components/LoginButton";
import PlayerCard from "@/components/PlayerCard";
import swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  name: "Login",
  components: {
    LoginButton,
    PlayerCard
  },
  computed: {
    ...mapState(["isLogin"])
  },
  watch: {
    isLogin() {
      if (this.isLogin === true) {
        this.$router.push("/lobby");
        swal.fire("Yayyy", "Login Success", "success");
      }
    }
  },
  methods: {
    login(provider) {
      this.$store.dispatch("login", provider);
    }
  }
};
</script>

<style>
</style>
