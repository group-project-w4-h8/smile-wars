<template>
  <div>
    <video id="video" width="640" height="480" autoplay></video>
    <button id="snap" @click="snapShot">Snap Photo</button>
    <canvas id="canvas" width="640" height="480"></canvas>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted() {
    var video = document.getElementById('video');

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(function (stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
      });
    }
  },
  methods: {
    snapShot() {
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var video = document.getElementById('video');

      context.drawImage(video, 0, 0, 640, 480);
      var dataURL = canvas.toDataURL();
      console.log(dataURL)
      
      const ax = axios.create({
        // baseURL: 'http://uploadgcs.lyxcious.xyz'
        baseURL: 'http://localhost:3000'
      })

      ax({
        method:'post',
        url: '/upload/base64',
        data: { image: dataURL, name: 'test snap' }
      })
        .then(({ data }) => {
          console.log(data)

          return ax ({
            method:'post',
            url: '/vision',
            data: { image: data }
          })
        })
        .then (({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(JSON.stringify(err.response, null, 2))
        })
    }
  }
}
</script>

<style>

</style>
