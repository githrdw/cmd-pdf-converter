<template lang="pug">
  v-sheet(color="primary" style="height:100%" tile dark)
    v-row(style="height:100%").align-center.align-content-center.justify-center.ma-0.text-center
      v-col(cols=12)#loader
        v-progress-circular(indeterminate size=50)
          v-icon mdi-image
        input(v-show="false" type="file" accept="image/*" capture="filesystem")#file-input
      v-col(cols=12)
        v-btn(outlined @click="openFileInput") Open gallery
      #bottom-bar
        v-row.justify-space-between
          v-btn(icon x-large @click="goBack" dark).ma-5.pa-6
            v-icon(large color="white") mdi-arrow-left
</template>
<script>
export default {
  components: {},
  layout: "dense",
  data: () => ({
  }),
  methods: {
    goBack() {
      setTimeout(
        () =>
          this.$router.push({ name: "content", query: { source: "gallery" } }),
        500
      );
    },
    openFileInput() {
      document.getElementById("file-input").click();
    }
  },
  mounted() {
    this.openFileInput();
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