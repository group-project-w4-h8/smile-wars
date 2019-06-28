<template>
  <div>
    <!-- <v-img >
    </v-img>-->
    <video id="video" autoplay height="480" width="640" v-show="!snapped"></video>

    <canvas id="canvas" height="480" width="640" v-show="GCSurl == '' && snapped == true"></canvas>
    <v-img v-show="GCSurl != ''" :src="GCSurl" style="height: 480px; width: 640px;"></v-img>
    <v-btn id="snap" @click="snapShot">Snap Photo</v-btn>
    <v-btn @click="retake">Retake Photo</v-btn>
    <v-btn @click="update">Upload Photo</v-btn>
    <v-btn>{{score}}</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import { db } from "@/api/config.js";
import { setTimeout } from 'timers';
export default {
  name: "snaps",
  props: ["selectedRoom"],
  data() {
    return {
      GCSurl: "",
      snapped: false,
      score: 0,
      room: {}
    };
  },
  created() {},
  mounted() {
    var video = document.getElementById("video");
    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then(function(stream) {
          //video.src = window.URL.createObjectURL(stream);
          video.srcObject = stream;
          video.play();
        });
    }
  },
  methods: {
    update() {
      setTimeout(()=>{var rooms = this.$store.state.roomList;
      var id = this.$route.params.id;
      var index = rooms.findIndex(room => room.id == id);
      var selectedRoom = rooms[index];

      if (selectedRoom.player_1 === this.$store.state.userName) {
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({
            player_1_picture: { image: this.GCSurl, score: this.score }
          })
          .then(res => {});
      } else if (selectedRoom.player_2 === this.$store.state.userName) {
        db.collection("rooms")
          .doc(this.$route.params.id)
          .update({
            player_2_picture: { image: this.GCSurl, score: this.score }
          })
          .then(res => {});
      }}, 5000)
    },
    retake() {
      this.GCSurl = "";
      this.snapped = false;
      this.score = 0;
    },
    snapShot() {
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      var video = document.getElementById("video");

      context.drawImage(video, 0, 0, 640, 480);

      var dataURL = canvas.toDataURL();
      console.log(dataURL);

      const ax = axios.create({
        baseURL: "http://uploadgcs.lyxcious.xyz"
        // baseURL: 'http://localhost:3000'
      });

      ax({
        method: "post",
        url: "/upload/base64",
        data: { image: dataURL, name: "test_snap" }
      })
        .then(({ data }) => {
          console.log(data);
          this.GCSurl = data;
          this.snapped = true;
          return ax({
            method: "post",
            url: "/vision",
            data: { image: data }
          });
        })
        .then(({ data }) => {
          console.log(data);
          // scoring
          if (data.joyLikelihood == "UNKNOWN") {
            this.score = 0;
          } else if (data.joyLikelihood == "VERY_UNLIKELY") {
            this.score = Math.round(Math.random() * 20 + 1);
          } else if (data.joyLikelihood == "UNLIKELY") {
            this.score = Math.round(Math.random() * 20 + 21);
          } else if (data.joyLikelihood == "POSSIBLE") {
            this.score = Math.round(Math.random() * 20 + 41);
          } else if (data.joyLikelihood == "LIKELY") {
            this.score = Math.round(Math.random() * 20 + 61);
          } else if (data.joyLikelihood == "VERY_LIKELY") {
            this.score = Math.round(Math.random() * 20 + 81);
          } else {
            this.score = 0;
          }
        })
        .catch(err => {
          console.log(err.response);
          console.log(JSON.stringify(err));
          console.log(JSON.stringify(err.response, null, 2));
        });
    }
  }
};
</script>

<style>
</style>
