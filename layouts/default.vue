<template lang="pug">
  v-app
    v-sheet(tile dark color="primary")#title
      v-row.pl-4.pr-6
        v-card-title
          n-link(to="/").nolink PDF Converter
        v-spacer
        v-icon.pr-1 mdi-dots-vertical
    v-sheet(color="primary" tile)
      img(:src="require('~/assets/cloud.svg')")#cloud
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
@keyframes floatTitle {
  0% {
    height: 100vh;
  }
  100% {
    height: 100px;
  }
}
@keyframes floatCloud {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}
.slide-left-leave-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-right-enter-active {
  transition: 0.2s;
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-left-leave-to {
  transform: translate(-100%, 0);
}

.slide-right-enter {
  transform: translate(-100%, 0);
}
.slide-right-leave-to {
  transform: translate(100%, 0);
}

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
#title {
  height: 100vh;
  animation: 1s floatTitle ease forwards;
  animation-delay: 0.5s;
}
#cloud {
  transform: translateY(100%);
  animation: 1s floatCloud ease forwards;
  animation-delay: 0.2s;
  margin-bottom: -72px;
}
</style>