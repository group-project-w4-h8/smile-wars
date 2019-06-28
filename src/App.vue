<template>
  <v-app>
    <v-content>
      <navbar v-if="$store.state.isLogin"/>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Snaps/>>
  </v-app>
</template>


<script>
import { mapActions } from "vuex";
import bgaudio from "@/assets/backgroundMusic.ogg";
import navbar from "@/components/NavBar.vue";
import Snaps from '@/components/snapshot.vue'

export default {
  name: "App",
  components: { navbar, Snaps },
  data() {
    return {};
  },
  created() {
    var play = new Audio(bgaudio);
    play.play();
    play.addEventListener(
      "ended",
      function() {
        this.currentTime = 0;
        this.play();
      },
      false
    );

    this.checkLogin();
    this.getAllRooms();
  },
  methods: {
    ...mapActions(["checkLogin", "getAllRooms"])
  }
};
</script>
