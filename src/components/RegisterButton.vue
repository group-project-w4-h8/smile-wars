<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="grey darken-1" dark v-on="on">Register</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Register New User</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Username*" v-model="username" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" v-model="email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" v-model="password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-4" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="grey darken-4" flat @click="register">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    props: ["triggerRegister"],
    name: "RegisterButton",
    data (){
        return{
            dialog: false,
            username: "",
            password: "",
            email: ""
        }
    },
    methods:{
      register: function () {

      }
    },
    watch: {
      triggerRegister: function(){
        this.dialog = true
      }
    }
}
</script>
