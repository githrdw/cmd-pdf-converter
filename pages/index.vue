<template lang="pug">
  v-container(style="height:100%;background-color:white")
    v-row.justify-center
      v-col(cols=12).text-center
        h1 Let's start!
    v-row.justify-center
      v-col
        v-card-text.text-center
          p So you want to convert anything into a PDF file? This service is ready to help you out!
    v-row.justify-center
      v-btn(x-large color="primary" to="source").white--text
        span Begin
        v-icon(right) mdi-arrow-right
    v-footer(absolute) 
      .overline You will accept the <n-link to="tos">TOS</n-link> when proceeding
</template>
<script>
export default {
  transition(to, from) {
    if (!from) return null;
    if (from.name === "source" && to.name === "index") return "slide-right";
    if (from.name === "index" && to.name === "source") return "slide-left";
  }
};
</script>