<template lang="pug">
  v-app(dark)
    h1.text-center Well, that's awkward
    v-card-text.text-center
      p You just found a bug in this prototype. <br/>
        | Please let us know the following error if you did not expect this error:
      code {{error.message}}
    v-card-actions.justify-center
      v-btn(@click="reload" text) Reload
      v-btn(to="/" color="primary") Home
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  methods: {
    reload() {
      location.reload();
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
