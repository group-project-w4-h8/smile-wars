<template>
    <v-layout row>
        
          <Player1Card :roomDetails="selectedRoom"></Player1Card>

          <v-flex xs1 style="margin-top:16%;">
            <v-img
            src="/versus.jpg"
            height="110"
            >

            </v-img>
          </v-flex>

          <Player2Card :roomDetails="selectedRoom"></Player2Card>

         
    </v-layout>
</template>

<script>
import Player1Card from "./Player1Card"
import Player2Card from "./Player2Card"

export default {
    name: "room",
    components: {
        Player1Card,
        Player2Card
    },
    data () {
        return {
            selectedRoom: {}
        }
    },
    methods: {
    //    getRoom: function(cb) {
    //        this.$store.dispatch("getAllRooms")
    //         cb()
    //    }
    },
    created(){
        this.$store.dispatch("getAllRooms", (rooms) =>{
            var id = this.$route.params.id
            var selectedRoom = rooms.findIndex(room => room.id == id)
            this.selectedRoom = rooms[selectedRoom]
        })

    },
    watch: {
        '$route.params.id': function () {
            var rooms = this.$store.state.roomList
            var id = this.$route.params.id
            var selectedRoom = rooms.findIndex(room => room.id == id)
            this.selectedRoom = rooms[selectedRoom]
        }
    }

}
</script>

<style>

</style>
