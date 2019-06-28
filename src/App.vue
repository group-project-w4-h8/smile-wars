<template>
  <v-app>
    <v-content>
      <navbar v-if="$store.state.isLogin"/>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import { mapActions } from "vuex";
import bgaudio from "@/assets/backgroundMusic.ogg";
import navbar from "@/components/NavBar.vue";
import Snaps from "@/components/snapshot.vue";

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
    this.$store
      .dispatch("getAllRooms")
      .then(rooms => {
        var user = this.$store.state.userName;
        var found1 = rooms.findIndex(room => room.player_1 == user);
        var found2 = rooms.findIndex(room => room.player_2 == user);
        if (found1 >= 0 || found2 >= 0) {
          this.$store.commit("setUserJoined", true)  
          }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    ...mapActions(["checkLogin", "getAllRooms"])
  }
};
</script>
