<template lang="pug">
  v-sheet(color="primary" style="height:100%" tile dark)
    v-row(style="height:100%").align-center.align-content-center.justify-center.ma-0.text-center
      v-col(cols=12)#loader
        v-progress-circular(indeterminate size=50)
          v-icon mdi-image
        input(v-show="false" type="file" accept="image/*" @change="storeImage")#file-input
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
  data: () => ({}),
  methods: {
    storeImage(e) {
      const { files } = e.target;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        let file = reader.result;
        file.substr(file.indexOf(",") + 1);
        this.$store.commit("file/setImage", file);
        this.$router.push("edit");
      };
    },
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
#bottom-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>