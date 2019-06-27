<template>
  <div>
    <NavBar></NavBar>
    <div v-if="$store.state.isLogin == false">
      <LoginPage></LoginPage>
    </div>
    <div v-if="$store.state.isLogin">
      <v-parallax dark src="/parallax.webp" height="1000">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-thin mb-3">Vuetify.js</h1>
          <h4 class="subheading">Build your application today!</h4>

        </v-layout>
      </v-parallax>
      <v-content></v-content>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LoginPage from "@/components/Login.vue";
import { db } from "@/api/config.js";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "home",
  components: {
    LoginPage,

  },
  created() {
    this.getAllRooms();
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    ...mapActions(["getAllRooms"])
  }
};
</script>
