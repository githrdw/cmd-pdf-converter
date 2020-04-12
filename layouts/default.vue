<template lang="pug">
  v-app(dark)
    v-app-bar(
      color="primary"
      fixed
      app
      flat
    )
      v-app-bar-nav-icon
      v-toolbar-title PDF Converter
    v-content
      v-container(style="height:100%").pa-0
        nuxt
</template>

<script>
export default {
  data: () => ({}),
  methods: {}
}
</script>
<style lang="css">
.container,
.v-toolbar__content {
  max-width: 1904px !important;
  margin: 0 auto;
}
.rotate-45 {
  transform: rotate(45deg);
}
</style>