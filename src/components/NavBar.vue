<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Create Room</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader>Rooms</v-subheader>
        <v-list-tile @click="">
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
      <v-btn @click="register">Register</v-btn>
      <v-btn @click="login">Login</v-btn>
      <v-btn>Logout</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import RegisterButton from "./RegisterButton"
import LoginButton from "./LoginButton"

  export default {
    data: () => ({
      drawer: null
    }),
    methods: {
      login : function () {
        this.$emit("TriggerLogin")
      },
      register : function (){
        this.$emit("TriggerRegister")
      }
    },
    props: {
      source: String
    }
  }
</script>