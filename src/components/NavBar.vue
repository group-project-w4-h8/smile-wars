<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Create Room</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>Rooms</v-subheader>
        <v-list-tile v-for="room in $store.state.roomList" :key="room.id" :to="{path: '/room/1'}">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >{{ room.id }} <v-icon v-show="room.password" small>vpn_key</v-icon></v-list-tile-title>
            <v-list-tile-sub-title><v-icon>supervisor_account</v-icon>{{ room.current_player }}/2</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>SmileWars</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$store.state.isLogin" @click="logout">Logout</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import firebase from "firebase";
import swal from 'sweetalert2';
export default {
  created () {
    this.$store.dispatch("getAllRooms")
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
      firebase
        .auth()
        .signOut()
        .then(()=> {
          this.$store.dispatch("checkLogin")
          swal.fire("Bye bye ;D", "see you soon again", "success");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  props: {
    source: String
  }
};
</script>