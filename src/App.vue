<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapActions(["checkLogin"])
  }
};
</script>

<style>
</style>
