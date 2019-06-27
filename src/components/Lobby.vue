<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Rooms</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-tile v-for="item in rooms" :key="item.id">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from "../api/config"

export default {
  data () {
    return {
      rooms: [
        {id: 1, name}
      ]
    }
  }
}
</script>

<style>

</style>
