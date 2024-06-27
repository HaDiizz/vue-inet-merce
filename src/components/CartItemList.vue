<template>
  <v-container>
    <v-row class="d-flex justify-space-between">
      <v-col cols="12" md="8" sm="12">
        <v-list three-line>
          <template v-for="(item, index) in cartItems">
            <v-subheader
              v-if="item._id"
              :key="index"
              v-text="item.product_code"
            ></v-subheader>

            <v-list-item :key="index">
              <v-list-item-avatar size="128" tile>
                <v-img
                  :src="`http://localhost:5000/${item.product_image}`"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  v-html="item.product_name"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="'$ ' + item.price"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <div class="d-flex justify-space-between align-center">
                  <div
                    class="d-flex flex-sm-column flex-column flex-md-row justify-space-around align-center"
                  >
                    <v-btn
                      :disabled="item.amount <= 1"
                      style="width: 10px; min-width: 10px"
                      @click="decreaseAmount(item)"
                      >-</v-btn
                    >
                    <span class="ps-5 pe-5 pa-3">{{ item.amount }}</span>
                    <v-btn
                      style="width: 10px; min-width: 10px"
                      @click="increaseAmount(item)"
                      >+</v-btn
                    >
                  </div>
                  <div>
                    <v-btn icon @click="removeProduct(item.product_id)">
                      <v-icon class="cursor-pointer" color="error"
                        >mdi-trash-can</v-icon
                      ></v-btn
                    >
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-if="index < cartItems.length - 1"
              :key="index"
            ></v-divider>
          </template>
          <template v-if="cartItems?.length === 0">
            <div class="d-flex justify-center" style="padding-top: 5rem">
              <span class="text-overline"> Cart is empty </span>
            </div>
          </template>
        </v-list>
      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card class="mx-auto p-5 mt-5" max-width="344" outlined>
          <v-list-item three-line class="ma-5">
            <v-list-item-content>
              <div class="mb-4 text-h4">Summary</div>
              <v-divider></v-divider>
              <v-list-item-subtitle class="pt-5 text-overline"
                >Total Prices</v-list-item-subtitle
              ><span class="d-flex justify-end text-h5"
                >${{ calculateTotalPrice() }}</span
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-actions v-if="$store?.state?.userData" class="ma-5">
            <v-btn
              :disabled="$store?.state?.cartItems.length === 0"
              color="primary"
              outlined
              text
              @click="createOrder()"
            >
              Place Order
            </v-btn>
          </v-card-actions>
          <v-card-actions class="d-flex justify-center align-center" v-else>
            <router-link style="text-decoration: none" to="/sign-in"
              >Please login to continue</router-link
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import { HTTP } from "../lib/http-common";
export default {
  name: "CartItemList",
  props: ["cartItems"],
  watch: {
    cartItems: {
      // eslint-disable-next-line
      handler(newValue) {
        // eslint-disable-next-line
        this.cartItems = newValue;
      },
      deep: true,
    },
  },
  methods: {
    // eslint-disable-next-line
    calculateTotalPrice() {
      return this.cartItems
        .reduce((a, b) => {
          return a + Number(b.price) * b.amount;
        }, 0)
        .toFixed(2);
    },
    // eslint-disable-next-line
    removeProduct(product_id) {
      this?.$store?.dispatch("removeItemFromCartAction", { product_id });
    },
    // eslint-disable-next-line
    increaseAmount(item) {
      this?.$store?.dispatch("increaseAmountAction", item);
    },
    // eslint-disable-next-line
    decreaseAmount(item) {
      this?.$store?.dispatch("decreaseAmountAction", item);
    },
    async createOrder() {
      let payload = {
        customer_id: this?.$store?.state?.userData?._id,
        orderItems: this?.$store?.state?.cartItems.map((item) => {
          return { quantity: item.amount, product: item._id };
        }),
      };
      if (confirm("Do you want to confirm this order?")) {
        try {
          const { data } = await HTTP.post("/order", payload, {
            headers: {
              authorization: `Bearer ${
                this.$store?.state?.userData?.access_token || ""
              }`,
            },
          });
          alert(data.message);
          this?.$store?.dispatch("clearCartAction");
          this.$router.push("/order");
        } catch (err) {
          console.log(err);
          alert("Something went wrong");
        }
      }
    },
  },
};
</script>
