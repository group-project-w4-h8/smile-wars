<template>
  <v-parallax v-show="!$store.state.isLogin" dark src="/parallax.webp" height="800">
    <v-layout align-center column justify-center>
      <h1 class="display-2 font-weight-bold mb-3">Smile Wars</h1>
      <h4 class="subheading">“Everytime you smile at someone, it is an action of love, a gift to that person, a beautiful thing.”</h4>
      <h5> ― Mother Teresa</h5>
      <LoginButton></LoginButton>
    </v-layout>
  </v-parallax>
</template>

<script>
import LoginButton from "@/components/LoginButton";
// import PlayerCard from "@/components/PlayerCard";
import swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  name: "LoginPage",
  components: {
    LoginButton,
    // PlayerCard
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
