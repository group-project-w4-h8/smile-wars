<template>
  <v-layout row>
    <Player1Card :roomDetails="selectedRoom"></Player1Card>

    <v-flex xs1 style="margin-top:16%;">
      <v-img src="/versus.jpg" height="110"></v-img>
    </v-flex>

    <Player2Card :roomDetails="selectedRoom"></Player2Card>
  </v-layout>
</template>

<script>
import Player1Card from "./Player1Card";
import Player2Card from "./Player2Card";
import { db } from "@/api/config.js";

export default {
  name: "room",
  components: {
    Player1Card,
    Player2Card
  },
  data() {
    return {
      selectedRoom: {}
    };
  },
  created() {
    this.getSelectedRoom();
    this.$store.dispatch("getAllRooms", rooms => {
      var id = this.$route.params.id;
      var selectedRoom = rooms.findIndex(room => room.id == id);
      this.selectedRoom = rooms[selectedRoom];
    });
  },
  methods: {
    getSelectedRoom() {
      var rooms = this.$store.state.roomList;
      console.log(rooms)
      var id = this.$route.params.id;
      var selectedRoom = rooms.findIndex(room => room.id == id);
      this.selectedRoom = rooms[selectedRoom]
    }
  },
  beforeDestroy() {
    this.$store.dispatch("updateARoom", this.selectedRoom)
    
  }
};
</script>

<style>
</style>
