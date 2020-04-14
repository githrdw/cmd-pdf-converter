<template lang="pug">
  v-container(style="height:100%")
    v-row
      v-col(cols=12).text-center
        h1 Step 1
        .sub-title What is the source of the file?
      v-col(cols=12 v-for="type in types" :key="type.text")
        v-btn(block outlined color="primary" x-large to="content")
          span {{type.text}}
          v-icon(right) {{type.icon}}
    v-bottom-navigation(absolute)
      v-row.justify-space-between
        v-btn(text color="primary" to="/").mx-3
          span Home
          v-icon(small) mdi-arrow-left
        v-btn(color="primary" to="content" disabled).mx-3
          span Content
          v-icon(small) mdi-arrow-right
</template>
<script>
export default {
  transition(to, from) {
    if (!from) return null;
    if (from.name === "content" && to.name === "source") return "slide-right";
    if (from.name === "source" && to.name === "content") return "slide-left";
  },
  data: () => ({
    types: [
      {
        text: "Camera",
        icon: "mdi-camera"
      },
      {
        text: "Gallery",
        icon: "mdi-image"
      }
    ]
  })
};
</script>