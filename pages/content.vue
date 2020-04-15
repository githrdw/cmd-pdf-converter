<template lang="pug">
  v-container(style="height:100%")
    v-row
      v-col(cols=12).text-center
        h1 Step 2
        .sub-title What do you want to convert?
      v-col(cols=12)
        v-row
          v-col(:cols="6" v-for="type in types" :key="type.text")
            v-card(@click="next(type.value)")
              v-card-text
                v-row.justify-space-around
                  span {{type.text}}
                  v-icon(small) {{type.icon}}
      v-bottom-navigation(absolute)
        v-row.justify-space-between.ma-0
          v-btn(text color="primary" to="source").mx-3
            span Source
            v-icon(small) mdi-arrow-left
          v-btn(color="primary" to="camera" disabled).mx-3
            span(v-if="source === 'camera'") Camera
            span(v-if="source === 'gallery'") Gallery
            v-icon(small) mdi-arrow-right
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("file", ["source"])
  },
  data: () => ({
    types: [
      {
        text: "ID-Card",
        icon: "mdi-card-account-details",
        value: "id"
      },
      {
        text: "A4 document",
        icon: "mdi-file-document",
        value: "a4"
      },
      {
        text: "Businesscard",
        icon: "mdi-card-account-mail",
        value: "businesscard"
      },
      {
        text: "Photo / other",
        icon: "mdi-plus-box-multiple",
        value: "photo"
      }
    ]
  }),
  methods: {
    next(content) {
      this.$store.commit("file/setContent", content);
      this.$router.push({ name: this.source });
    }
  }
};
</script>