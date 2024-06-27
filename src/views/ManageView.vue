<template>
  <v-container>
    <div class="d-flex justify-end pt-7 pb-3">
      <v-btn @click="newItem()" color="primary" outlined text
        >Create Product</v-btn
      >
    </div>
    <template>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Product Image</th>
              <th class="text-left">Product Code</th>
              <th class="text-left">Product Name</th>
              <th class="text-left">Price</th>
              <th class="text-left">Amount</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in apiData" :key="index">
              <td>
                <v-img
                  :src="`http://localhost:5000/${item.product_image}`"
                  width="80"
                  height="80"
                ></v-img>
              </td>
              <td>{{ item.product_code }}</td>
              <td>{{ item.product_name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.amount }}</td>
              <td>
                <div class="d-flex align-center">
                  <div>
                    <v-btn @click="editItem(item)" color="info" icon
                      ><v-icon>mdi-file-edit-outline </v-icon></v-btn
                    >
                  </div>
                  <div>
                    <v-btn @click="deleteDataAPI(item._id)" color="error" icon
                      ><v-icon>mdi-trash-can </v-icon></v-btn
                    >
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-card>
        <v-card-title primary-title> {{ saveMode }} </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                :disabled="isEdit"
                name="product_code"
                label="Product Code"
                v-model="postData.product_code"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Product Name"
                name="product_name"
                v-model="postData.product_name"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Price"
                type="number"
                name="price"
                v-model="postData.price"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                type="number"
                label="Amount"
                name="amount"
                v-model="postData.amount"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                rows="3"
                label="Description"
                name="description"
                v-model="postData.detail.description"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <div id="preview">
                <img v-if="imageUrl" :src="imageUrl" />
              </div>
              <div class="pt-10 d-flex justify-center align-center">
                <v-btn
                  v-if="!isRemoveImage && isEdit"
                  @click="handleChangeImage()"
                  color="error"
                >
                  Change Image
                </v-btn>
              </div>
              <v-file-input
                v-if="isRemoveImage"
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an product image"
                prepend-icon="mdi-camera"
                label="Product Preview"
                v-model="postData.product_image"
                @change="onFileChange"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="closeItem()">Cancel</v-btn>
          <v-btn text color="info" @click="saveSelect()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
/* eslint-disable */
import { HTTP } from "../lib/http-common";
export default {
  name: "Manage",
  mounted: function () {
    if (
      (this.$store.state?.userData &&
        this.$store.state.userData.role !== "admin") ||
      !this.$store.state?.userData
    ) {
      this.$router.push("/");
    }
  },
  data() {
    return {
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
      isRemoveImage: false,
      imageUrl: "",
      apiData: [],
      dialogEdit: false,
      isEdit: false,
      postDataDefault: {
        id: "",
        product_image: null,
        product_code: "",
        product_name: "",
        price: 0,
        amount: 0,
        detail: {
          description: "",
        },
      },
      postData: {
        id: "",
        product_image: null,
        product_code: "",
        product_name: "",
        price: 0,
        amount: 0,
        detail: {
          description: "",
        },
      },
    };
  },
  methods: {
    handleChangeImage() {
      this.isRemoveImage = true;
      this.imageUrl = "";
    },
    createImage(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onFileChange(file) {
      if (!file) {
        this.imageUrl = "";
        return;
      }
      this.createImage(file);
    },
    newItem() {
      this.postData.id = "";
      this.postData = { ...this.postDataDefault };
      this.dialogEdit = true;
      this.imageUrl = "";
      this.isRemoveImage = true;
      this.isEdit = false;
    },
    // eslint-disable-next-line
    editItem(item) {
      this.imageUrl = `http://localhost:5000/${item.product_image}`;
      this.postData.id = item._id;
      this.postData = { ...item };
      this.dialogEdit = true;
      this.isEdit = true;
      this.isRemoveImage = false;
    },
    // eslint-disable-next-line
    closeItem() {
      this.postData.id = "";
      this.postData = { ...this.postDataDefault };
      this.dialogEdit = false;
      this.isRemoveImage = false;
      this.imageUrl = "";
      this.isEdit = false;
      this.postData.detail.description = "";
    },
    // eslint-disable-next-line
    getData() {
      HTTP.get("/product")
        .then((response) => {
          this.apiData = response.data.data;
        })
        .catch((err) => console.log(err));
    },
    async deleteDataAPI(id) {
      if (confirm("Do you want to delete this product ?")) {
        try {
          const { data } = await HTTP.delete(`/product/${id}`, {
            headers: {
              authorization: `Bearer ${
                this.$store?.state?.userData?.access_token || ""
              }`,
            },
          });
          this.getData();
          this.closeItem();
          alert(data.message);
        } catch (err) {
          console.log(err);
          alert("Something went wrong");
        }
      }
    },
    async postDataAPI() {
      try {
        const formData = new FormData();
        formData.append("product_image", this.postData.product_image);
        formData.append("product_code", this.postData.product_code);
        formData.append("product_name", this.postData.product_name);
        formData.append("price", this.postData.price);
        formData.append("amount", this.postData.amount);
        formData.append("detail", this.postData.detail.description);
        const { data } = await HTTP.post("/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${
              this.$store?.state?.userData?.access_token || ""
            }`,
          },
        });
        this.getData();
        this.closeItem();
        alert(data.message);
      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      }
    },
    async putDataAPI() {
      try {
        const formData = new FormData();
        formData.append("product_image", this.postData.product_image);
        formData.append("product_name", this.postData.product_name);
        formData.append("price", this.postData.price);
        formData.append("amount", this.postData.amount);
        formData.append("detail", this.postData.detail.description);
        const { data } = await HTTP.put(
          `/product/${this.postData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${
                this.$store?.state?.userData?.access_token || ""
              }`,
            },
          }
        );
        this.getData();
        this.closeItem();
        alert(data.message);
      } catch (err) {
        console.log(err);
        alert("Something went wrong");
      }
    },
    saveSelect() {
      if (this.postData.id !== "") {
        this.putDataAPI();
      } else this.postDataAPI();
    },
  },
  computed: {
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

<style scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 300px;
}
</style>
