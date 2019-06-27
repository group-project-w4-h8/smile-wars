<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list>
        <v-list-tile @click="dialog = true">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Create Room</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>Rooms</v-subheader>
        <v-layout v-for="room in $store.state.roomList" :key="room.id">
          <v-layout v-if="room.current_player < 2" @click="goToRoom(room.id)" class="accent">
            <v-list-tile-action class="text-truncate">
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="text-truncate font-weight-bold">{{room.id}}</v-list-tile-title>
            </v-list-tile-content>
          </v-layout>
          <v-layout v-if="room.current_player >= 2">
            <v-list-tile-action class="text-truncate">
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="text-truncate font-weight-bold">{{room.id}}</v-list-tile-title>
            </v-list-tile-content>
          </v-layout>
        </v-layout>
      </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create New Room</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Room Name *" v-model="roomname" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password *" v-model="password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-4" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="grey darken-4" flat @click="createNewRoom">Create New Room</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-toolbar v-if="$store.state.isLogin" app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>SmileWars</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$store.state.isLogin" @click="logout">Logout</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import firebase from "firebase";
import swal from "sweetalert2";
export default {
  name: "NavBar",
  data: () => ({
    drawer: false,
    roomname: "",
    password: "",
    dialog: false
  }),
  methods: {
    goToRoom(id) {
      console.log(id);
    },
    createNewRoom() {},
    logout() {
      localStorage.clear();
      this.$router.push("/");
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("checkLogin");
          this.$store.state.login_logout_sound.play();
          swal.fire("Bye bye ;D", "see you soon again", "success");
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  props: {
    source: String
  }
};
</script>