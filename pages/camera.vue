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
        #bottom-bar(v-if="cameras.length && loading")
          v-row.justify-space-between
            v-btn(icon x-large @click="goBack" dark).ma-5.pa-6
              v-icon(large color="white") mdi-arrow-left
            v-btn(icon x-large dark).ma-5.pa-6
              v-icon(size="56") mdi-radiobox-marked
            v-btn(icon x-large @click="switchCamera" dark).ma-5.pa-6
              v-icon(large) mdi-video-switch
</template>
<script>
export default {
  components: {},
  layout: "dense",
  data: () => ({
    aspectRatio: "id",
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
          video.play();
          this.cameraReady = true;
        })
        .catch(function(err0r) {
          console.log("Something went wrong!", err0r);
        });
    }
  },
  mounted() {
    if (navigator.mediaDevices.getUserMedia) {
      const media = navigator.mediaDevices;
      media.enumerateDevices().then(devices => {
        this.cameras = devices.filter(device => device.kind === "videoinput");
        // this.cameras = devices;
        this.startCamera();
      });
    }
  }
};
</script>
<style>
@keyframes disappearCloud {
  0% {
    max-height: 100%;
    margin-bottom: -72px;
    transform: translateY(0);
  }
  100% {
    max-height: 0%;
    margin-bottom: 0;
    transform: translateY(-100%);
  }
}
#id {
  position: absolute;
  left: 0;
  padding-top: 63.0607477%;
  width: 100%;
}
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
#cloud-disappear img {
  margin-bottom: -72px;
}
#cloud-disappear {
  margin-bottom: -72px;
  animation: 1s disappearCloud ease forwards;
}
</style>