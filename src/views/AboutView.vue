<template>
  <div class="ma-8 pa-8 pt-2">
    <v-row>
      <v-col cols="12" sm="12" md="4" class="d-flex justify-center">
        <v-avatar size="130px">
          <img
            src="https://nextui.org/_next/image?url=%2Fimages%2Fhero-card.webp&w=256&q=75"
            alt="profile image"
          />
        </v-avatar>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="8"
        class="d-flex flex-column align-center mb-6"
        ><div>
          <div class="d-flex text-h3">
            <div>Hi There</div>
            <div id="icon-hello">👋</div>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, in
            nemo id facilis quidem neque et unde ea, eius corrupti fugit
            deleniti incidunt quos perferendis numquam recusandae aliquid
            exercitationem earum.
          </p>
        </div></v-col
      >
    </v-row>
    <v-row class="pt-5">
      <v-col cols="12" sm="12" md="4">
        <v-card class="pa-2 d-flex align-center" outlined tile>
          <span class="font-weight-bold">Name: </span>
          <span class="ml-2">{{ fullName }}</span>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card class="pa-2 d-flex align-center" outlined tile>
          <span class="font-weight-bold">Nick Name: </span>
          <span class="ml-2">{{ profile.nickName }}</span>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card class="pa-2 d-flex align-center" outlined tile>
          <span class="font-weight-bold">University: </span>
          <span class="ml-2">{{ profile.university }}</span>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card class="pa-2 d-flex flex-column" outlined tile>
          <span class="font-weight-bold">Hobbies: </span>
          <v-list-item
            class="pb-1"
            v-for="(item, index) in profile.hobbies"
            :key="index"
          >
            <span>{{ item.icon }}</span>
            <v-list-item-content class="ml-5">
              <v-list-item-title>{{ item.hobby }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        class="d-flex flex-column justify-space-around"
      >
        <v-card class="pa-2 d-flex flex-column" outlined tile>
          <span class="font-weight-bold">Likes: </span>
          <v-chip-group>
            <v-chip
              color="success"
              v-for="(item, index) in profile.likes"
              :key="index"
            >
              {{ item }}
            </v-chip>
          </v-chip-group>
        </v-card>
        <v-card class="pa-2 d-flex flex-column" outlined tile>
          <span class="font-weight-bold">Dislikes: </span>
          <v-chip-group>
            <v-chip
              color="error"
              v-for="(item, index) in profile.disLikes"
              :key="index"
            >
              {{ item }}
            </v-chip>
          </v-chip-group>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card class="pa-2 d-flex flex-column" outlined tile>
          <span class="font-weight-bold">Strengths: </span>
          <v-list-item v-for="(item, index) in profile.strengths" :key="index">
            <v-list-item-content class="ml-5">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-progress-linear
                :color="item.color"
                height="25"
                :value="item.score"
              >
                <template>
                  <strong>{{ item.score }}%</strong>
                </template>
              </v-progress-linear>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    profile: {
      firstName: "Nattapol",
      lastName: "Singhad",
      nickName: "Dis",
      university: "Prince of Songkla University",
      hobbies: [
        { icon: "🎮", hobby: "Play game" },
        { icon: "🧑‍💻", hobby: "Code" },
        { icon: "🍳", hobby: "Cooking" },
        { icon: "🏃‍♂️", hobby: "Exercise" },
      ],
      likes: ["Traveling", "Music", "Game", "Movie"],
      disLikes: ["Traffic jams", "Bug", "git push --force"],
      strengths: [
        {
          name: "Teamwork",
          score: 97,
          color: "amber",
        },
        {
          name: "Empathy",
          score: 96,
          color: "accent",
        },
        {
          name: "Creative",
          score: 98,
          color: "pink",
        },
      ],
    },
  }),
  computed: {
    fullName: function () {
      return this.profile.firstName + " " + this.profile.lastName;
    },
  },
};
</script>

<style scoped>
#icon-hello {
  animation: sayHello 2s infinite;
}
@keyframes sayHello {
  50% {
    transform: rotate(30deg);
  }
}
</style>
