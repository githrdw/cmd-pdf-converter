<template lang="pug">
  v-container(style="height:100%")
    v-row
      v-col(cols=12).text-center
        h1 Step 2
        .sub-title What do you want to convert?
      v-col(cols=12)
        v-row
          v-col(:cols="6" v-for="type in types" :key="type.text")
            v-card(to="camera")
              v-card-text
                v-row.justify-space-around
                  span {{type.text}}
                  v-icon(small) {{type.icon}}
      v-bottom-navigation(absolute)
        v-row.justify-space-between
          v-btn(text color="primary" to="source").mx-3
            span Source
            v-icon(small) mdi-arrow-left
          v-btn(color="primary" to="camera" disabled).mx-3
            span Camera
            v-icon(small) mdi-arrow-right
</template>
<script>
export default {
  data: () => ({
    types: [
      {
        text: "ID-Card",
        icon: "mdi-card-account-details"
      },
      {
        text: "A4 document",
        icon: "mdi-file-document"
      },
      {
        text: "Businesscard",
        icon: "mdi-card-account-mail"
      },
      {
        text: "Photo / other",
        icon: "mdi-plus-box-multiple"
      }
    ]
  })
};
</script>