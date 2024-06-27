<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
  // eslint-disable-next-line
  created() {
    this?.$store?.dispatch("refreshTokenAction");
  },
};
</script>
