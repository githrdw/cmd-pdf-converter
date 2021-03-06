<template lang="pug">
  v-sheet(color="primary" style="height:100%" tile dark)
    v-row(style="height:100%").align-center.justify-center.ma-0.text-center
      v-col(cols=12 v-show="loading")#loader
        v-progress-circular(indeterminate size=50)
          v-icon mdi-camera
      v-col.pa-0.full-size
        v-scale-transition(origin="center center" leave-absolute)
          v-card(v-show="cameraReady").full-size
            video#camera.full-size
            canvas(v-show="false")#painting
        
        #bottom-bar(v-if="cameras.length && loading")
          v-row.justify-space-between
            v-col
              v-btn(icon x-large @click="goBack" dark)
                v-icon(large color="white") mdi-arrow-left
            v-col
              v-btn(icon x-large dark @click="snapshot")
                v-icon(size="56") mdi-radiobox-marked
            v-col
              v-btn(icon x-large @click="switchCamera" dark)
                v-icon(large) mdi-video-switch
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("file", ["source"])
  },
  components: {},
  layout: "dense",
  data: () => ({
    cameraIx: 0,
    cameras: [],
    cameraReady: false,
    loading: true
  }),
  beforeDestroy() {
    this.stopCamera();
  },
  methods: {
    goBack() {
      this.loading = false;
      this.cameraReady = false;
      setTimeout(
        () =>
          this.$router.push({ name: "content", query: { source: "camera" } }),
        500
      );
    },
    switchCamera() {
      let { cameras, cameraIx } = this;
      cameraIx = cameras.length - 1 === cameraIx ? 0 : cameraIx + 1;
      this.startCamera(cameraIx);
    },
    stopCamera() {
      if (window.stream)
        window.stream.getTracks().forEach(track => track.stop());
    },
    prepareCanvas() {
      const video = document.querySelector("#camera");
      const canvas = document.querySelector("#painting");
      if (!this.cameraReady) {
        const width = 320;
        const height = video.videoHeight / (video.videoWidth / width);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        this.cameraReady = true;
      }
    },
    startCamera(cameraIx = 0) {
      const video = document.querySelector("#camera");
      const { deviceId } = this.cameras[cameraIx];
      console.warn(this.cameras[cameraIx]);
      this.cameraIx = cameraIx;
      this.stopCamera();
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: { exact: deviceId }
          }
        })
        .then(stream => {
          window.stream = stream;
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            // Avoid using this in new browsers, as it is going away.
            video.src = URL.createObjectURL(stream);
          }
          video.addEventListener("canplay", this.prepareCanvas, false);
          video.play();
        })
        .catch(function(err0r) {
          console.log("Something went wrong!", err0r);
        });
    },
    snapshot() {
      const video = document.querySelector("#camera");
      const canvas = document.querySelector("#painting");
      var context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const file = canvas.toDataURL("image/png");
      this.$store.commit("file/setImage", file);
      this.$router.push("edit");
    }
  },
  mounted() {
    if (!this.source) this.$router.push("/");
    if (navigator.mediaDevices.getUserMedia) {
      const media = navigator.mediaDevices;
      media.enumerateDevices().then(devices => {
        this.cameras = devices.filter(device => device.kind === "videoinput");
        this.startCamera();
      });
    }
  }
};
</script>
<style>
#loader {
  position: absolute;
}
.full-size {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#camera {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  transition: width, height 2s ease;
}
#bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>