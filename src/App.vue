<template>
  <v-app>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
  },
  data() {
    return {};
  },
  created() {
    this.checkLogin();
    this.getAllRooms();
  },
  methods: {
    ...mapActions(["checkLogin", "getAllRooms"])
  }
};
</script>
