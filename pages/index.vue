<template lang="pug">
  v-row(style="height:100%").align-center.justify-center
    v-col.pa-0(style="height:100%")
      //- v-sheet(v-if="aspectRatio === 'id'")#id Test
      video#camera(autoplay style="width: 100%;height: 100%")
      //- video#camera(autoplay)
      #bottom-bar(v-if="cameras.length")
        code {{cameraIx}}
        code {{cameras[cameraIx]["label"]}}
        v-row.justify-center
          v-btn(icon large @click="switchCamera")
            v-icon(large) mdi-video-switch
</template>
<script>
export default {
  components: {},
  data: () => ({
    aspectRatio: "id",
    stream: null,
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
      console.warn({ deviceId });
      this.cameraIx = cameraIx;
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: { exact: deviceId },
            height: { min: 1024, ideal: 1280, max: 1920 },
            width: { min: 576, ideal: 720, max: 1080 }
          }
        })
        .then(stream => {
          this.stream = stream;
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            // Avoid using this in new browsers, as it is going away.
            video.src = URL.createObjectURL(stream);
          }
        })
        .catch(function(err0r) {
          console.log("Something went wrong!", err0r);
        });
    }
  },
  mounted() {
    if (navigator.mediaDevices.getUserMedia) {
      const media = navigator.mediaDevices;
      if (this.stream) this.stream.getTracks().forEach(track => track.stop());
      media.enumerateDevices().then(devices => {
        // this.cameras = devices.filter(device => device.kind === "videoinput");
        this.cameras = devices;
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
  /* height: 53.98vh;
  width: 85.6vw; */
  padding-top: 63.0607477%;
  width: 100%;
}
#camera {
  /* position: fixed; */
  background: red;
}
#bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>