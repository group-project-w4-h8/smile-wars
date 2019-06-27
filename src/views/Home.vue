<template>
  <div>
    <div v-if="$store.state.isLogin == false">
      <LoginPage></LoginPage>
    </div>
    <div v-if="$store.state.isLogin">
      Main Page
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoginPage from "@/components/Login.vue"

export default {
  name: "home",
  components: {
    LoginPage
  },
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>
