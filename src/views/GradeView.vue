<template>
  <div>
    <v-row class="pa-10 ma-10 d-flex flex-column justify-center align-center">
      <v-col cols="12">
        <v-text-field
          label="Point"
          v-model="score"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="text-center">
        <span class="text-h4">Grade: </span
        ><span class="ps-5 text-h3">{{ calculateGrade.grade }}</span></v-col
      >
      <v-img width="300" :src="calculateGrade.img"></v-img>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Grade",

  data: () => ({
    score: 100,
    message: "Hello",
  }),
  computed: {
    // eslint-disable-next-line
    calculateGrade: function () {
      if (this.score > 100 || this.score < 0 || !this.score) {
        return { grade: "Unknown", img: "img/memes/unknown.png" };
      }
      if (this.score >= 80) {
        return { grade: "A", img: "img/memes/A.webp" };
      } else if (this.score >= 70 && this.score <= 79) {
        return { grade: "B", img: "img/memes/B.png" };
      } else if (this.score >= 60 && this.score <= 69) {
        return { grade: "C", img: "img/memes/C.png" };
      } else if (this.score >= 50 && this.score <= 59) {
        return { grade: "D", img: "img/memes/D.png" };
      } else {
        return { grade: "E", img: "img/memes/E.png" };
      }
    },
  },
};
</script>
