<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link
          to="/"
          class="text-md-h5 text-sm-body white--text text-decoration-none"
          >E-COMMERCE</router-link
        >
      </div>
      <v-spacer></v-spacer>
      <!-- <router-link to="/about">
        <v-btn text>
          <span class="mr-2">About</span>
        </v-btn>
      </router-link> -->
      <router-link to="/cart" class="my-2">
        <v-badge
          :dot="$store.state.cartItems.length === 0 && true"
          class="me-3"
          color="error"
          :content="$store.state.cartItems.length"
          overlap
          offset-x="20"
          offset-y="20"
        >
          <v-btn icon>
            <v-icon>mdi-cart-outline</v-icon>
          </v-btn>
        </v-badge>
      </router-link>
      <v-menu
        v-if="$store?.state?.userData"
        rounded="Removed"
        :close-on-content-click="false"
        offset-y
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            color="white"
            class="primary--text ma-5"
            v-bind="attrs"
            v-on="on"
          >
            {{ $store?.state?.userData.username }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="$store?.state?.userData?.role === 'admin'" link>
            <v-list-item-title
              ><router-link
                class="text-decoration-none black--text"
                to="/manage"
                ><div>Manage</div></router-link
              ></v-list-item-title
            >
          </v-list-item>
          <v-list-item link>
            <v-list-item-title
              ><router-link class="text-decoration-none black--text" to="/order"
                ><div>Order</div></router-link
              ></v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="logout()">
            <v-list-item-title class="red--text">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <router-link v-else to="/sign-in">
        <v-btn color="white" class="primary--text ma-5"> Sign In </v-btn>
      </router-link>
    </v-app-bar>
    <v-main><router-view /></v-main>
  </div>
</template>

<script>
export default {
  methods: {
    // eslint-disable-next-line
    logout() {
      this?.$store?.dispatch("logoutAction");
    },
  },
};
</script>
