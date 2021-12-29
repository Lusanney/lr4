import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/rooms",
    name: "RoomSearch",
    component: () => import("../views/RoomSearch.vue"),
  },
  {
    path: "/hotels",
    name: "HotelSearch",
    component: () => import("../views/HotelSearch.vue"),
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/auth/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/auth/SignUp.vue"),
  },
  {
    path: "/me/changepassword",
    name: "ChangePassword",
    component: () => import("../views/auth/ChangePassword.vue"),
  },
  {
    path: "/me/bookings",
    name: "MyBookings",
    component: () => import("../views/MyBookings.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const publicRoutes = ["SignIn", "SignUp"];
router.beforeEach((to, from, next) => {
  if (!publicRoutes.includes(to.name) && !localStorage.authToken) {
    next({ name: "SignIn" });
  } else if (publicRoutes.includes(to.name) && localStorage.authToken) {
    next({
      name: "Home",
    });
  } else {
    next();
  }
});
export default router;
