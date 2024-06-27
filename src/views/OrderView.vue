<template>
  <v-container>
    <h1 class="pb-5 pt-4" v-if="$store?.state?.userData?.role === 'admin'">
      ADMIN | ORDERS
    </h1>
    <template>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Order ID</th>
              <th
                v-if="$store?.state?.userData?.role === 'admin'"
                class="text-left"
              >
                Customer
              </th>
              <th class="text-left">Total Quantity</th>
              <th class="text-left">Total Price</th>
              <th class="text-left">Created At</th>
              <th class="text-left">Updated At</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderList" :key="index">
              <td>
                {{ item.order_id }}
              </td>
              <td v-if="$store?.state?.userData?.role === 'admin'">
                {{
                  item.customer_id.first_name + " " + item.customer_id.last_name
                }}
              </td>
              <td>{{ item.orderItems.length }}</td>
              <td>${{ item.totalPrice }}</td>
              <td>{{ convertDate(item.createdAt) }}</td>
              <td>{{ convertDate(item.updatedAt) }}</td>
              <td>
                <div class="d-flex align-center">
                  <div>
                    <v-btn @click="handleOpenDetail(item._id)" color="info" icon
                      ><v-icon>mdi-magnify-plus-outline</v-icon></v-btn
                    >
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
    <v-dialog v-model="isOpenDetail" max-width="500px">
      <v-card>
        <v-card-title primary-title>
          Order ID: {{ orderItem?.order_id }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              v-for="(item, index) in orderItem?.orderItems"
              :key="index"
            >
              <v-card class="pa-2 d-flex align-center" outlined tile>
                <span class="font-weight-bold">Product Name: </span>
                <span class="ml-2">{{ item.product.product_name }}</span>
              </v-card>
              <v-card class="pa-2 d-flex align-center" outlined tile>
                <span class="font-weight-bold">Unit Price: </span>
                <span class="ml-2">{{ item.product.price }}</span>
              </v-card>
              <v-card class="pa-2 d-flex align-center" outlined tile>
                <span class="font-weight-bold">Quantity: </span>
                <span class="ml-2">{{ item.quantity }}</span>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="closeItem()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
/* eslint-disable */
import { HTTP } from "../lib/http-common";
import moment from "moment";
export default {
  name: "Order",
  mounted: function () {
    if (!this.$store.state?.userData) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      orderList: [],
      selectedOrderId: "",
      orderItem: null,
      isOpenDetail: false,
    };
  },
  methods: {
    async handleOpenDetail(orderId) {
      this.selectedOrderId = await orderId;
      this.isOpenDetail = true;
      await this.getOrderItem();
    },
    closeItem() {
      this.selectedOrderId = "";
      this.orderItem = null;
      this.isOpenDetail = false;
    },
    convertDate(date) {
      return moment(date).format("llll");
    },
    getOrderList() {
      HTTP.get("/order", {
        headers: {
          authorization: `Bearer ${
            this.$store?.state?.userData?.access_token || ""
          }`,
        },
      })
        .then((response) => {
          this.orderList = response.data.data;
        })
        .catch((err) => console.log(err));
    },
    getOrderItem() {
      HTTP.get(`/order/${this.selectedOrderId}`, {
        headers: {
          authorization: `Bearer ${
            this.$store?.state?.userData?.access_token || ""
          }`,
        },
      })
        .then((response) => {
          this.orderItem = response.data.data;
        })
        .catch((err) => console.log(err));
    },
  },

  created() {
    this.getOrderList();
    this.getOrderItem();
  },
};
</script>
