import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: () => import("../views/ToolBarView.vue"),
    children: [
      {
        path: "/sign-in",
        name: "signIn",
        component: () => import("../views/SignInView.vue"),
      },
      {
        path: "/sign-up",
        name: "signUp",
        component: () => import("../views/SignUpView.vue"),
      },
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "/cart",
        name: "cart",
        component: () => import("../views/CartView.vue"),
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/OrderView.vue"),
      },
    ],
  },
  {
    path: "/me",
    name: "me",
    component: () => import("../views/MeView.vue"),
  },
  {
    path: "/grade",
    name: "grade",
    component: () => import("../views/GradeView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
