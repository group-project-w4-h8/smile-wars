<template>
  <div>
    <video
      :id="'video'+selectedRoom.player_2"
      autoplay
      height="480"
      width="640"
      v-show="snapped==false && GCSurl =='' && selectedRoom.player_2 == $store.state.userName"
    ></video>
    <canvas
      :id="'canvas'+$store.state.userName"
      height="480"
      width="640"
      v-show="GCSurl == '' && snapped == true"
    ></canvas>
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
import { setTimeout } from "timers";
export default {
  name: "snaps",
  props: ["selectedRoom", "player"],
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
    let video4 = document.getElementById(`video${this.selectedRoom.player_2}`);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then(function(stream) {
          video4.srcObject = stream;
          video4.play();
        });
    }
  },
  methods: {
    update() {
      setTimeout(() => {
        var rooms = this.$store.state.roomList;
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
        }
      }, 5000);
    },
    retake() {
      this.GCSurl = "";
      this.snapped = false;
      this.score = 0;
    },
    snapShot() {
      var canvas = document.getElementById(
        `canvas${this.$store.state.userName}`
      );
      var context = canvas.getContext("2d");
      var video = document.getElementById(`video${this.$store.state.userName}`);

      context.drawImage(video, 0, 0, 640, 480);

      var dataURL = canvas.toDataURL();
      console.log(dataURL);

      const ax = axios.create({
        baseURL: "https://uploadgcs.lyxcious.xyz"
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
