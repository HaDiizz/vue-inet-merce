/* eslint-disable */
<template>
  <div>
    <v-container>
      <v-btn @click="newItem()">New Item</v-btn>
    </v-container>
    <v-row>
      <v-col md="3" v-for="(item, index) in apiData" :key="index">
        <v-card class="mx-auto" max-width="400">
          <v-card-title> {{ item.product_name }} </v-card-title>
          <v-card-text>
            <div class="text-subtitle-1 text-end">{{ item.price }}$</div>
          </v-card-text>

          <v-card-actions>
            <div class="d-flex justify-space-between" style="width: 100%">
              <v-btn color="orange lighten-2" text @click="editItem(item)">
                Edit
              </v-btn>
              <v-btn icon color="error" @click="deleteDataAPI(item._id)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col></v-row
    >
    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title primary-title> {{ saveMode }} </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                name="product_code"
                v-model="postData.product_code"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="product_name"
                v-model="postData.product_name"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="price"
                v-model="postData.price"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="amount"
                v-model="postData.amount"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="color"
                v-model="postData.detail.color"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="closeItem()">Cancel</v-btn>
          <v-btn text color="info" @click="saveSelect()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { HTTP } from "../lib/http-common";
export default {
  name: "test",
  // eslint-disable-next-line
  data() {
    return {
      apiData: [],
      dialogEdit: false,
      postDataDefault: {
        id: "",
        product_code: "",
        product_name: "",
        price: 0,
        amount: 2000,
        detail: {
          color: "",
        },
      },
      postData: {
        id: "",
        product_code: "A005",
        product_name: "test product",
        price: 15,
        amount: 200,
        detail: {
          color: "red",
        },
      },
    };
  },
  methods: {
    // eslint-disable-next-line
    newItem() {
      this.postData.id = "";
      this.postData = { ...this.postDataDefault };
      this.dialogEdit = true;
    },
    // eslint-disable-next-line
    editItem(item) {
      this.postData.id = item._id;
      this.postData = { ...item };
      this.dialogEdit = true;
    },
    // eslint-disable-next-line
    closeItem() {
      this.postData.id = "";
      this.postData = { ...this.postDataDefault };
      this.dialogEdit = false;
    },
    // eslint-disable-next-line
    getData() {
      HTTP.get("/product").then((response) => {
        this.apiData = response.data.data;
      });
    },
    // eslint-disable-next-line
    async deleteDataAPI(id) {
      try {
        const { data } = await HTTP.delete(
          // eslint-disable-next-line
          `/product/${id}`
        );
        this.getData();
        this.closeItem();
        alert(data.message);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    },
    // eslint-disable-next-line
    async postDataAPI() {
      try {
        const { data } = await HTTP.post(
          "/product",
          // eslint-disable-next-line
          this.postData
        );
        this.getData();
        this.closeItem();
        alert(data.message);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    },
    // eslint-disable-next-line
    async putDataAPI() {
      try {
        const { data } = await HTTP.put(
          `/product/${this.postData._id}`,
          // eslint-disable-next-line
          this.postData
        );
        this.getData();
        this.closeItem();
        alert(data.message);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    },
    // eslint-disable-next-line
    saveSelect() {
      if (this.postData.id !== "") {
        this.putDataAPI();
      } else this.postDataAPI();
    },
  },
  computed: {
    // eslint-disable-next-line
    saveMode() {
      return this.postData.id === "" ? "New Item" : "Edit Item";
    },
  },
  // eslint-disable-next-line
  created() {
    this.getData();
  },
};
</script>
