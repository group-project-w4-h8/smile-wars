<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="grey darken-1" dark v-on="on">Login</v-btn>
      </template>   
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Username*" v-model="username" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" v-model="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>


          <v-btn icon>
            <v-img src="/facebook.png" height="50" contain @click="login('facebook')"></v-img>
          </v-btn>

          <v-btn icon>
            <v-img src="/github.png" height="50" contain @click="login('github')"></v-img>
          </v-btn>

          <v-btn icon>
            <v-img src="/google.png" height="50" contain @click="login('google')"></v-img>
          </v-btn>

          <v-btn color="grey darken-4" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="grey darken-4" flat @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import swal from "sweetalert2";
import {mapState} from "vuex";

export default {
    name: "LoginButton",
    computed: {
    ...mapState(["isLogin"])
    },
    data () {
      return {
        dialog: false,
        username: "",
        password: ""
      }
    },
    methods:{
      login(provider) {
          this.$store.dispatch("login", provider);
    }
    },
    watch: {
      isLogin() {
      if (this.isLogin === true) {
        this.dialog = false
        this.$router.push("/lobby");
        swal.fire("Yayyy", "Login Success", "success");
      }
    }
    }
}
</script>
