<template lang="pug">
  v-row(style="height:100%").ma-0
    v-col.pa-0(style="height:100%; background-color:white")
      v-sheet(color="primary" tile)
        v-img(:src="require('~/assets/cloud.svg')")
      v-row.align-center.justify-center
        v-btn(x-large color="primary" to="content").white--text
          span Doorgaan
          v-icon(right) mdi-arrow-right
</template>