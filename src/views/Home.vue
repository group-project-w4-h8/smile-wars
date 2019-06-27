<template>
  <div>
    <div v-if="$store.state.isLogin">
      Login Page
    </div>
    <div v-if="$store.state.isLogin == false">
      Main Page
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "home",
  components: {},
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>
