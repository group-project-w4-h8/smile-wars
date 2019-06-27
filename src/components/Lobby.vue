<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Rooms</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <template v-for="room in $store.state.roomList">
          <v-list-tile :key="room.id" :to="{path: `/room/${room.id}`}">
                <v-list-tile-content>
                  <v-list-tile-title>{{ room.id }} <v-icon v-show="room.password" small>vpn_key</v-icon></v-list-tile-title>
                  <v-list-tile-sub-title><v-icon>supervisor_account</v-icon>{{ room.current_player }}/2</v-list-tile-sub-title>
                </v-list-tile-content>
          </v-list-tile>
                <v-divider></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from "../api/config"


export default {
  created () {
    this.$store.dispatch("getAllRooms")
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
