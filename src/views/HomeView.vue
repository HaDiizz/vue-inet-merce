<template>
  <v-container class="pt-10 pb-5">
    <v-container class="pb-10"
      ><v-text-field
        v-model="searchFilter"
        label="Search"
        required
      ></v-text-field
    ></v-container>
    <v-row>
      <v-col md="3" v-for="(item, index) in filterProductList" :key="index">
        <ProductCard :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import ProductCard from "@/components/ProductCard.vue";
import { HTTP } from "../lib/http-common";
export default {
  name: "Home",
  components: {
    ProductCard,
  },
  created() {
    this.getData();
  },
  data() {
    return {
      searchFilter: "",
      apiData: [],
      products: [
        {
          product_id: "1",
          price: "59",
          product_name: "Cat 1",
          amount: 10,
          image: "/img/memes/A.webp",
          detail: {
            description:
              "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
          },
        },
        {
          product_id: "2",
          price: "64",
          product_name: "Cat 2",
          amount: 5,
          image: "/img/memes/B.png",
          detail: {
            description:
              "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
          },
        },
        {
          product_id: "3",
          price: "52",
          product_name: "Cat 3",
          amount: 0,
          image: "/img/memes/C.png",
          detail: {
            description:
              "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
          },
        },
        {
          product_id: "4",
          price: "105",
          product_name: "Cat 4",
          amount: 95,
          image: "/img/memes/D.png",
          detail: {
            description:
              "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
          },
        },
        {
          product_id: "5",
          price: "99",
          product_name: "Cat 5",
          amount: 1,
          image: "/img/memes/E.png",
          detail: {
            description:
              "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
          },
        },
        {
          product_id: "6",
          price: "100",
          product_name: "Cat 6",
          amount: 3,
          image: "/img/memes/unknown.png",
          detail: {
            description:
              "Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.",
          },
        },
      ],
    };
  },
  computed: {
    filterProductList: function () {
      let filterProduct = [...this.apiData];
      if (this.searchFilter) {
        return filterProduct.filter((item) =>
          item.product_name
            .toLowerCase()
            .includes(this.searchFilter.toLowerCase())
        );
      }
      return filterProduct;
    },
  },

  methods: {
    getData() {
      HTTP.get("/product").then((response) => {
        this.apiData = response.data.data;
      });
    },
  },
};
</script>
