<template lang="pug">
  v-app
    v-app-bar(
      dark
      color="primary"
      fixed
      app
      flat
    )
      v-card-title.pa-1.pt-3
        n-link(to="/").nolink PDF Converter
      v-spacer
      v-icon.mt-2 mdi-dots-vertical
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
a.nolink {
  text-decoration: none;
  color: inherit !important;
}
</style>