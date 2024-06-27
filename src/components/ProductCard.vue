<template>
  <div>
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="inner-img"
        :src="`http://localhost:5000/${item.product_image}`"
        height="200px"
      ></v-img>

      <v-card-title>
        {{
          item.product_name.length > 13
            ? item.product_name.substring(0, 13) + "..."
            : item.product_name
        }}
      </v-card-title>
      <v-card-text>
        <div class="text-subtitle-1 text-end">{{ item.price }}$</div>

        <div>
          {{
            item.detail.description.length > 30
              ? item.detail.description.substring(0, 30) + "..."
              : item.detail.description
          }}
        </div>
      </v-card-text>

      <v-card-actions>
        <div class="d-flex justify-space-between" style="width: 100%">
          <router-link :to="`/product/${item._id}`">
            <v-btn color="orange lighten-2" text> Detail </v-btn></router-link
          >
          <v-btn
            :disabled="!item.amount"
            icon
            color="primary"
            @click="addProduct(item)"
          >
            <v-icon>mdi-cart-plus</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["item"],
  methods: {
    // eslint-disable-next-line
    addProduct(item) {
      this?.$store?.dispatch("addItemToCartAction", { ...item, amount: 1 });
    },
  },
};
</script>

<style scoped>
.inner-img {
  transition: 0.3s;
}

.inner-img:hover {
  transform: scale(1.1);
}
</style>
