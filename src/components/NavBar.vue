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
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Room 1</v-list-tile-title>
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
          this.$store.state.login_logout_sound.play()
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