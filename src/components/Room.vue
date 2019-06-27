<template>
    <v-layout row>
        
          <PlayerCard></PlayerCard>

          <v-flex xs1 style="margin-top:16%;">
            <v-img
            src="/versus.jpg"
            height="110"
            >

            </v-img>
          </v-flex>

          <PlayerCard></PlayerCard>

         
    </v-layout>
</template>

<script>
import PlayerCard from "./PlayerCard"

export default {
    name: "room",
    components: {
        PlayerCard
    }

}
</script>

<style>

</style>
