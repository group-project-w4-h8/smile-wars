<template>
  <v-flex xs5 class="px-3">
    <v-card >
      <!-- <v-avatar size="440px"> -->
      <!-- <v-img
         v-if="selectedRoom.player_2"
         src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        >
      </v-img>-->
      <v-img v-show="$store.state.userName === selectedRoom.player_2 && !selectedRoom.player_2_picture.image">
        <Snaps :selectedRoom="selectedRoom"/>
      </v-img>

      <v-img v-show="$store.state.userName !== selectedRoom.player_2 && !selectedRoom.player_2_picture.image" src="/avatar.png"></v-img>
        <v-img v-show="selectedRoom.player_2_picture.image" :src="selectedRoom.player_2_picture.image"></v-img>
      <!-- </v-avatar> -->

      <v-divider class=""></v-divider>

        <v-card-title primary-title class="layout justify-center">
            <div class="headline" v-if="selectedRoom.player_2">{{ selectedRoom.player_2 }}</div>
            <div class="headline" v-else>Player</div>
        </v-card-title>
        <v-divider v-if="selectedRoom.player_2_picture.image !== ''"></v-divider>
        <v-card-title class="layout justify-center" v-if="selectedRoom.player_2_picture.image !== ''">
          <div class="headline">Score: {{selectedRoom.player_2_picture.score}}</div>

        </v-card-title>

        <v-card-actions class="layout justify-end">
            <!-- <v-btn flat>Upload Image</v-btn> -->
      </v-card-actions>
    </v-card>
    <!-- <v-btn class="green mt-3" style="margin-left: 41%;">Ready</v-btn> -->
  </v-flex>
</template>

<script>
import Snaps from "@/components/snapshot";
export default {
  components: {
    Snaps
  },
  props : ["selectedRoom"],
  data () {
    return {
    //   selectedRoom: {}
    }
  },
    created(){
    // setTimeout(()=>{this.getSelectedRoom()},5000)
  },
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
