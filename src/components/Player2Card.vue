<template>
  <v-flex xs5 class="px-3">
    <v-card>
      <v-img
        v-show="$store.state.userName === selectedRoom.player_2 && !selectedRoom.player_2_picture.image"
      >
        <Snaps :selectedRoom="selectedRoom" :player="selectedRoom.player_2" />
      </v-img>

      <v-img
        v-show="$store.state.userName !== selectedRoom.player_2 && !selectedRoom.player_2_picture.image"
        src="/avatar.png"
      ></v-img>
      <v-img
        v-show="selectedRoom.player_2_picture.image"
        :src="selectedRoom.player_2_picture.image"
      ></v-img>
      <v-divider class></v-divider>

      <v-card-title primary-title class="layout justify-center">
        <div class="headline" v-if="selectedRoom.player_2">{{ selectedRoom.player_2 }}</div>
        <div class="headline" v-else>Player</div>
      </v-card-title>
      <v-divider v-if="selectedRoom.player_2_picture.image !== ''"></v-divider>
      <v-card-title class="layout justify-center" v-if="selectedRoom.player_2_picture.image !== ''">
        <div class="headline">Score: {{selectedRoom.player_2_picture.score}}</div>
      </v-card-title>

      <v-card-actions class="layout justify-end"></v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import Snaps from "@/components/snapshot.1";
export default {
  components: {
    Snaps
  },
  props: ["selectedRoom"],
  data() {
    return {};
  },
  created() {},
  methods: {
    getSelectedRoom() {
      var rooms = this.$store.state.roomList;
      var id = this.$route.params.id;
      var selectedRoom = rooms.findIndex(room => room.id == id);
      this.selectedRoom = rooms[selectedRoom];
    }
  }
};
</script>

<style>
</style>
