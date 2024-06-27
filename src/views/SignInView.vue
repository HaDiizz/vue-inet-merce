<template>
  <div class="d-flex justify-center py-10" style="margin-top: 3rem">
    <SignInCard />
  </div>
</template>

<script>
import SignInCard from "../components/SignInCard.vue";

export default {
  components: {
    SignInCard,
  },
  mounted: function () {
    if (this.$store.state?.userData) {
      this.$router.push("/");
    }
  },
};
</script>
