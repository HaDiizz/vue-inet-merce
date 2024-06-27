<template>
  <div><CartItemList :cartItems="cartItems" /></div>
</template>

<script>
import CartItemList from "../components/CartItemList.vue";
export default {
  name: "Cart",
  components: { CartItemList },
  // eslint-disable-next-line
  data() {
    return {
      cartItems:
        this.$store.state.cartItems.length > 0
          ? this.$store.state.cartItems
          : [],
    };
  },
};
</script>
