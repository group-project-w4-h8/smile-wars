<template>
  <div>
    <NavBar></NavBar>
    <div v-if="$store.state.isLogin == false">
      <LoginPage></LoginPage>
    </div>
    <div v-if="$store.state.isLogin">

    </div>
    <!-- <Snaps/> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LoginPage from "@/components/Login.vue";
import { db } from "@/api/config.js";
import NavBar from "@/components/NavBar.vue";
import Snaps from "@/components/snapshot.vue";
export default {
  name: "home",
  components: {
    LoginPage,
    Snaps,
    NavBar
  },
  created() {},
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {}
};
</script>
