<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped fixed app class="grey lighten-3">
      <v-list>
        <v-list-tile @click="dialogCreate = true">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Create Room</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>Rooms</v-subheader>
       <v-list-tile v-for="room in $store.state.roomList" :key="room.id" :to="{path: `/room/${room.id}`}">
          <v-list-tile-action>
            <v-img icon src="/room.png" height="23" contain></v-img>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >{{ room.id }} <v-icon v-show="room.password" small>vpn_key</v-icon></v-list-tile-title>
            <v-list-tile-sub-title><v-icon>supervisor_account</v-icon>{{ room.current_player }}/2</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <!-- <v-icon>add</v-icon> -->
          <v-btn small flat style="padding-left: 23%;" @click.prevent="leaveRoom (room.id)" v-if="room.player_1 === $store.state.userName || room.player_2 === $store.state.userName">
          <v-img icon src="/leave.png" height="20" contain></v-img>
          </v-btn>
        </v-list-tile>
          </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialogCreate" persistent max-width="600px">
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
          <v-btn color="grey darken-4" flat @click="dialogCreate = false">Cancel</v-btn>
          <v-btn color="grey darken-4" flat @click="createNewRoom">Create New Room</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-toolbar v-if="$store.state.isLogin" app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>SmileWars</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$store.state.isLogin && $route.path !== '/lobby'" :to="{path: `/lobby`}">to Lobby</v-btn>
      <v-btn v-if="$store.state.isLogin" @click="logout">Logout</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import { db } from "@/api/config";
import firebase from "firebase";
import swal from "sweetalert2";
export default {
  name: "NavBar",
  data: () => ({
    drawer: false,
    roomname: "",
    password: "",
    dialogCreate: false
  }),
  methods: {
    createNewRoom() {
      let input = {
        current_player: 1,
        password: this.password,
        player_1: this.$store.state.userName,
        player_1_picture : { image : "", score : 0},
        player_2: "",
        player_2_picture : { image : "", score : 0}
      };
      db.collection("rooms")
        .doc(this.roomname)
        .set(input)
        .then(() => {
          this.dialogCreate = false
          this.$router.push(`/room/${this.roomname}`);
          this.roomname = ""
          this.password = ""
        })
        .catch(function(error) {});
    },
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
    },
    goToRoom(id) {
      // var rooms = this.$store.state.roomList;
      // var found = rooms.findIndex(room => room.id == id);
      // var selectedRoom = rooms[found];
      // selectedRoom.current_player++;

      // if (selectedRoom.player_1 === this.$store.state.userName) {
      //   db.collection("rooms")
      //     .doc(selectedRoom.id)
      //     .update({
      //       player_1: this.$store.state.userName,
      //       current_player: selectedRoom.current_player
      //     });
      // } else {
      //   db.collection("rooms")
      //     .doc(selectedRoom.id)
      //     .update({
      //       player_2: this.$store.state.userName,
      //       current_player: selectedRoom.current_player
      //     });
      // }
      this.$router.push(`/room/${id}`);
    },
    leaveRoom(id) {
      var rooms = this.$store.state.roomList;
      var found = rooms.findIndex(room => room.id == id);
      var selectedRoom = rooms[found];
      selectedRoom.current_player--;
      // if (selectedRoom.player_1 === this.$store.state.userName) {
      //   db.collection("rooms")
      //     .doc(selectedRoom.id)
      //     .update({
      //       player_1: "",
      //       current_player: selectedRoom.current_player
      //     })
      //     .then(res => {
      //       this.$router.push("/lobby");
      //     });
      // } else {
      //   db.collection("rooms")
      //     .doc(selectedRoom.id)
      //     .update({
      //       player_2: "",
      //       current_player: selectedRoom.current_player
      //     })
      //     .then(res => {
      //       this.$router.push("/lobby");
      //     });
      // }
      this.$store.commit("setUserJoined", false)
      this.$store.dispatch("updateARoom", selectedRoom)
      

    }
  },
  props: {
    source: String
  }
};
</script>