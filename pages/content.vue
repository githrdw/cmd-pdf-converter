<template lang="pug">
  v-container
    v-row
      v-col
        h1 Stap 1
        .sub-title Wat wilt u converteren?
    v-row
      v-col(:cols="6" v-for="type in types" :key="type.text")
        v-card( to="camera")
          v-card-text {{type.text}}
    v-row.justify-end
      v-btn(x-large color="primary" to="camera").mx-3
        span Doorgaan
        v-icon(right) mdi-arrow-right
</template>
<script>
export default {
  transition(to, from) {
    if (from.name === "index") {
      return "slide-left";
    }
    if (from.name === "camera") return "slide-right";
    if (from.name === "content" && to.name === "camera") return "slide-left";
    else return "slide-right";
  },
  data: () => ({
    types: [
      {
        text: "ID-Kaart"
      },
      {
        text: "A4 document"
      },
      {
        text: "Visitekaartje"
      },
      {
        text: "Foto / anders"
      }
    ]
  })
};
</script>
<style>
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
</style>