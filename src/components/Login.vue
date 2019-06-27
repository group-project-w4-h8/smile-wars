<template>
  <div>
    <!-- ROOT APP NOT LOGGED IN -->
    <div class="container-fluid h-100">
      <div class="col h-100 d-flex justify-content-center align-items-center">
        <div class="row d-flex justfy-content-center text-center">
          <div class="col-12 my-1">
            <img
              src="@/assets/google.png"
              class="img rounded-circle img-thumbnail m-2"
              width="120px"
              height="120px"
              @click="login('google')"
            >
            <img
              src="@/assets/facebook.png"
              class="img rounded-circle img-thumbnail m-2"
              width="120px"
              height="120px"
              @click="login('facebook')"
            >
            <img
              src="@/assets/github.jpeg"
              class="img rounded-circle img-thumbnail m-2"
              width="120px"
              height="120px"
              @click="login('github')"
            >
          </div>

          <div class="col-12 m-1">
            <H1>WELCOME SMILE WARS</H1>
            <p>
              To get started, click the image above to Log in using Google /
              Facebook / GitHub
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import {mapState} from "vuex";
export default {
  name: "Login",
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
