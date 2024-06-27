<template>
  <div style="padding-top: 7rem">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-img
            :src="`http://localhost:5000/${product.product_image}`"
          ></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-card
            class="d-flex flex-column justify-lg-space-between"
            style="width: 100%; height: 100%; overflow: hidden"
          >
            <div>
              <v-card-title class="text-h4">
                PRODUCT COED: {{ product.product_code }}
              </v-card-title>
              <v-card-title class="text-h5 pb-10">
                {{ product.product_name }}
              </v-card-title>
              <v-card-subtitle>{{
                product?.detail?.description
              }}</v-card-subtitle>
              <v-card-subtitle class="pt-5 text-overline"
                >Price
                <span class="text-h6"
                  >${{ product.price }}</span
                ></v-card-subtitle
              >
            </div>
            <div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link class="pe-5" to="/">
                  <v-btn text> BACK TO THE SHOP </v-btn>
                </router-link>
                <v-btn
                  color="primary"
                  outlined
                  text
                  @click="addProduct(product)"
                >
                  ADD TO CART
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row></v-container
    >
  </div>
</template>

<script>
/* eslint-disable */
import { HTTP } from "../lib/http-common";
export default {
  name: "ProductDetail",
  data() {
    return {
      product: {},
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      HTTP.get(`/product/${this.$route.params.id}`).then((response) => {
        this.product = response.data.data;
      });
    },
    addProduct(item) {
      this?.$store?.dispatch("addItemToCartAction", { ...item, amount: 1 });
    },
  },
};
</script>
