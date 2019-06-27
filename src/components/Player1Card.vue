<template>
<v-flex xs5 class="px-3">
    <v-card>

        <!-- <v-avatar size="440px"> -->
        <v-img
         v-if="roomDetails.player_1"
         src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        >
        </v-img>

        <v-img
        v-else
         src="/avatar.png"
        >
        </v-img>
            
        <!-- </v-avatar> -->

        <v-divider class=""></v-divider>

        <v-card-title primary-title class="layout justify-center">
            <div class="headline" v-if="roomDetails.player_1">{{ roomDetails.player_1 }}</div>
            <div class="headline" v-else>Player 1</div>
        </v-card-title>

        <v-card-actions class="layout justify-end">
            <v-btn flat>Upload Image</v-btn>
        </v-card-actions>

    </v-card>

    <v-btn class="green mt-3" style="margin-left: 41%;">Ready</v-btn>
</v-flex>


</template>

<script>
export default {
    props: {
        roomDetails: Object
    }
    
}
</script>

<style>

</style>
