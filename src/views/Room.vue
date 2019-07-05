<template>
  <v-layout column>
    <v-layout row>
      <Player1Card :selectedRoom="selectedRoom"></Player1Card>
      <v-flex xs1 style="margin-top:16%;">
        <v-img src="/versus.jpg" height="110" v-show="showVS"></v-img>
      </v-flex>
      <Player2Card :selectedRoom="selectedRoom"></Player2Card>
    </v-layout>
    <v-layout row>
      <v-flex xs1 offset-xs5>
        <v-btn
          class="red"
          @click="resetRoom"
          v-show="selectedRoom.player_1_picture.image != '' && selectedRoom.player_2_picture.image != ''"
        >Fight Again!</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import Player1Card from "@/components/Player1Card";
import Player2Card from "@/components/Player2Card";
import { db } from "@/api/config.js";
import { setTimeout } from "timers";

export default {
  name: "room",
  components: {
    Player1Card,
    Player2Card
  },
  data() {
    return {
      selectedRoom: {},
      showVS: false
    };
  },
  created() {},
  computed: {
    rooms() {
      return this.$store.state.roomList;
    }
  },
  watch: {
    rooms() {
      this.getSelectedRoom();
    }
  },
  mounted() {
    setTimeout(() => {
      this.getSelectedRoom();
      this.showVS = true;
    }, 5000);
  },
  methods: {
    getSelectedRoom() {
      var rooms = this.$store.state.roomList;
      var id = this.$route.params.id;
      var selectedRoom = rooms.findIndex(room => room.id == id);
      this.selectedRoom = rooms[selectedRoom];
    },
    resetRoom() {
      var id = this.$route.params.id;
      db.collection("rooms")
        .doc(id)
        .update({
          player_1_picture: {
            image: "",
            score: 0
          },
          player_2_picture: {
            image: "",
            score: 0
          }
        });
    }
  },
  beforeDestroy() {}
};
</script>

<style>
</style>
