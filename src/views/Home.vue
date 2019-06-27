<template>
  <div>
    <div v-if="$store.state.isLogin">
      Login Page
    </div>
    <div v-if="$store.state.isLogin == false">
      Main Page
    </div>
    <Snaps/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Snaps from '@/components/snapshot'
export default {
  name: "home",
  components: {
    Snaps
  },
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>
