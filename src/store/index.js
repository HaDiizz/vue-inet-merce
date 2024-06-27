/* eslint-disable */
import { HTTP } from "@/lib/http-common";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    userData: null,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  },
  getters: {},
  mutations: {
    // eslint-disable-next-line
    ADD_ITEM_TO_CART(state, payload) {
      state.cartItems.push(payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_ITEM_FROM_CART(state, payload) {
      const index = state.cartItems.findIndex(
        (item) => item.product_id === payload.product_id
      );
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, _) {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    INCREASE_AMOUNT(state, payload) {
      const newCart = [...state.cartItems];
      newCart.forEach((item) => {
        if (item._id === payload._id) item.amount += 1;
      });
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    },
    DECREASE_AMOUNT(state, payload) {
      const newCart = [...state.cartItems];
      newCart.forEach((item) => {
        if (item._id === payload._id) item.amount -= 1;
      });
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    },
    LOGIN(state, payload) {
      state.userData = payload?.data[0];
      localStorage.setItem(
        "token",
        JSON.stringify(payload?.data[0]?.access_token)
      );
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      window.location.href = "/";
    },
    REFRESH_TOKEN(state, payload) {
      state.userData = payload?.data[0];
      localStorage.setItem(
        "token",
        JSON.stringify(payload?.data[0]?.access_token)
      );
    },
  },
  actions: {
    addItemToCartAction(context, payload) {
      if (!this.state.cartItems.every((item) => item._id !== payload._id)) {
        return;
      }
      context.commit("ADD_ITEM_TO_CART", payload);
    },
    removeItemFromCartAction(context, payload) {
      context.commit("REMOVE_ITEM_FROM_CART", payload);
    },
    clearCartAction(context, _) {
      context.commit("CLEAR_CART");
    },
    increaseAmountAction(context, payload) {
      context.commit("INCREASE_AMOUNT", payload);
    },
    decreaseAmountAction(context, payload) {
      context.commit("DECREASE_AMOUNT", payload);
    },
    async registerAction(_, payload) {
      try {
        const { data } = await HTTP.post("/auth/register", payload);
        if (data?.error || !data?.data)
          return alert(data?.message || "Sign up failed.");
        alert(data.message);
        window.location.href = "/sign-in";
      } catch (err) {
        alert("Register failed");
      }
    },
    async loginAction(context, payload) {
      try {
        const { data } = await HTTP.post("/auth/login", payload);
        if (data?.error || data?.data[0]?.length === 0)
          throw { message: data?.message || "Sign in failed1" };
        alert(data.message);
        context.commit("LOGIN", data);
      } catch (err) {
        alert("Login failed");
      }
    },
    async refreshTokenAction(context, _) {
      try {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
          const { data } = await HTTP.post("/auth/refreshToken");
          if (data?.error || !data?.data[0]?.length === 0)
            return alert(data?.message || "Please login.");
          context.commit("REFRESH_TOKEN", data);
        }
        return;
      } catch (err) {
        console.log(err);
      }
    },
    async logoutAction(context, _) {
      try {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        await HTTP.post("/auth/logout");
        alert("Logged out");
        window.location.href = "/sign-in";
        return;
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
});
