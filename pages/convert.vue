<template lang="pug">
  v-container(style="height:100%;background-color:white")
    v-row.justify-center
      v-col(cols=12)
        v-card(color="error" dark)
          v-row.pa-2
            v-icon.px-5 mdi-alert
            h2 Warning
          v-card(flat color="white")
            v-card-text.black--text You have submitted sensitive data to a party you do not know. <br/>
              | The terms of service state that we collect your data for the following purposes:
              ul
                li Fraud <br/>(bank accounts using your name)
                li Selling data<br/>(your information is worth money)
                li Stealing <br/>(trying to access your bankaccount)
                li Spam <br/>(using contact information)
              | <br/> That are things we <b>could</b> do, but this is just a campaign to warn you.
              | <br/> Have fun with your PDF!
</template>
<script>
import jsPDF from "jspdf";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("file", ["image", "content", "source"])
  },
  transition(to, from) {
    if (!from) return null;
    if (from.name === "convert" && to.name === "index") return "slide-right";
    if (from.name === "index" && to.name === "convert") return "slide-left";
  },
  methods: {
    generatePDF() {
      let pdf = new jsPDF();
      pdf.addImage(this.image, 0, 0);
      pdf.save("PDF_Converter.pdf");
    }
  },
  mounted() {
    if (!this.image || !this.content || !this.source)
      return this.$router.push("/");
    this.generatePDF();
  }
};
</script>