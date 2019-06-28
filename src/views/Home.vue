<template>
  <div>   
    <div v-if="$store.state.isLogin == false">
      <LoginPage></LoginPage>
    </div>
    <div v-if="$store.state.isLogin">
      <Lobby></Lobby>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoginPage from "@/components/Login.vue";
import { db } from "@/api/config.js";
import navbar from "@/components/NavBar.vue";
import Snaps from "@/components/snapshot.vue"
import Lobby from "@/components/Lobby.vue";
export default {
  name: "Home",
  components: {
    LoginPage,
    Snaps,
    navbar,
    Lobby
  },
  created() {},
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {}
};
</script>