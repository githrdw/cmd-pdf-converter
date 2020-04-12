<template lang="pug">
  v-app
    v-app-bar(
      dark
      color="primary"
      fixed
      app
      flat
    )
      v-app-bar-nav-icon
      v-toolbar-title
        n-link(to="/") PDF Converter
    v-content
      nuxt
</template>

<script>
export default {
  data: () => ({}),
  methods: {}
};
</script>
<style lang="css">
body,
html {
  margin: 0 auto;
}
.container,
.v-toolbar__content {
  max-width: 1904px !important;
  margin: 0 auto;
}
.rotate-45 {
  transform: rotate(45deg);
}
a {
  text-decoration: none;
  color: inherit !important;
}
</style>