<template>
  <v-layout row>
    <v-flex xs12>
      <v-alert v-model="alert" dismissible type="error">ROOM IS FULL!!!!!!!!!</v-alert>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Rooms</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <template v-for="room in $store.state.roomList">
            <v-list-tile :key="room.id" :to="{path: `/room/${room.id}`}">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ room.id }}
                  <v-icon v-show="room.password" small>vpn_key</v-icon>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <v-icon>supervisor_account</v-icon>
                  {{ room.current_player }}/2
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-btn small class="green" @click.prevent="joinRoom(room.id)" v-if="!$store.state.userJoined">Join</v-btn>
              <v-btn
                small
                class="red"
                @click.prevent="leaveRoom(room.id)"
                v-if="room.player_1 === $store.state.userName || room.player_2 === $store.state.userName"
              >Leave</v-btn>
            </v-list-tile>
            <v-divider :key="room.player_1"/>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from "../api/config";

export default {
  created() {},
  data() {
    return {
      alert: false,
    };
  },
  mounted() {
  },
  methods: {
    joinRoom: function(id) {
      var rooms = this.$store.state.roomList;
      var found = rooms.findIndex(room => room.id == id);
      var selectedRoom = rooms[found];
      if (selectedRoom.current_player < 2) {
        selectedRoom.current_player++;

        if (selectedRoom.player_1) {
          db.collection("rooms")
            .doc(selectedRoom.id)
            .update({
              player_2: this.$store.state.userName,
              current_player: selectedRoom.current_player
            })
            .then(() => {
              this.$router.push(`/room/${id}`);
            });
        } else {
          db.collection("rooms")
            .doc(selectedRoom.id)
            .update({
              player_1: this.$store.state.userName,
              current_player: selectedRoom.current_player
            })
            .then(() => {
              this.$router.push(`/room/${id}`);
            });
        }
        this.$store.commit("setUserJoined", true);
      } else {
        this.alert = true;
      }
    },
    leaveRoom: function(id) {
      var rooms = this.$store.state.roomList;
      var found = rooms.findIndex(room => room.id == id);
      var selectedRoom = rooms[found];
      selectedRoom.current_player--;
      this.$store.commit("setUserJoined", false);
      this.$store.dispatch("updateARoom", selectedRoom);
    }
  }
};
</script>

<style>
</style>
