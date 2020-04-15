<template lang="pug">
  v-sheet(color="primary" style="height:100%" tile dark)
    v-row(style="height:100%").align-center.align-content-center.justify-center.ma-0.text-center
      v-col(cols=12)
        v-sheet(color="white" v-if="image")
          v-img(:src="image")
        #bottom-bar
          v-row.justify-space-between
            v-col
              v-btn(icon x-large :to="source" dark)
                v-icon(large color="white") mdi-arrow-left
            v-col
              v-btn(x-large dark to="convert" outlined)
                span Convert
            v-col
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  layout: "dense",
  computed: {
    ...mapState("file", ["image", "content", "source"])
  },
  mounted() {
    if (!this.image || !this.content || !this.source) this.$router.push("/");
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