<template lang="pug">
  v-row(style="height:100%").align-center.justify-center.ma-0
    v-col.pa-0.full-size
      //- v-sheet(v-if="aspectRatio === 'id'")#id Test
      v-sheet.full-size
        video#camera.full-size
      #bottom-bar(v-if="cameras.length")
        v-row.justify-space-between
          v-btn(icon x-large to="content" dark).ma-5.pa-6
            v-icon(large color="white") mdi-arrow-left
          v-btn(icon x-large dark).ma-5.pa-6
            v-icon(size="56") mdi-radiobox-marked
          v-btn(icon x-large @click="switchCamera" dark).ma-5.pa-6
            v-icon(large) mdi-video-switch
</template>
<script>
export default {
  components: {},
  data: () => ({
    aspectRatio: "id",
    cameraIx: 0,
    cameras: []
  }),
  methods: {
    switchCamera() {
      let { cameras, cameraIx } = this;
      cameraIx = cameras.length - 1 === cameraIx ? 0 : cameraIx + 1;
      this.startCamera(cameraIx);
    },
    startCamera(cameraIx = 0) {
      const video = document.querySelector("#camera");
      const { deviceId } = this.cameras[cameraIx];
      console.warn(this.cameras[cameraIx]);
      this.cameraIx = cameraIx;
      if (window.stream)
        window.stream.getTracks().forEach(track => track.stop());
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: { exact: deviceId },
            height: { ideal: 1280, max: 1920 },
            width: { ideal: 720, max: 1080 }
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
#id {
  position: absolute;
  left: 0;
  padding-top: 63.0607477%;
  width: 100%;
}
.full-size {
  width: 100%;
  height: 100%;
  overflow:hidden;
}
#camera {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
#bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>