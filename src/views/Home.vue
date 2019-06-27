<template>
  <div>
    <div v-if="$store.state.isLogin == false">
      <LoginPage></LoginPage>
    </div>
    <div v-if="$store.state.isLogin">Main Page</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoginPage from "@/components/Login.vue";
import { db } from "@/api/config.js";

export default {
  name: "home",
  components: {
    LoginPage
  },
  created() {

  },
  computed: {
    ...mapState(["isLogin"])
  }
}
</script>
