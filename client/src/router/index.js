import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/investoradd",
    name: "investoradd",
    component: () =>
      import(
        /* webpackChunkName: "investoradd" */ "../components/InvestorAdd.vue"
      ),
  },
  {
    path: "/investorview",
    name: "investorview",
    component: () =>
      import(
        /* webpackChunkName: "investorview" */ "../views/InvestorView.vue"
      ),
  },
  {
    path: "/investmentview",
    name: "investmentview",
    component: () =>
      import(
        /* webpackChunkName: "investmentview" */ "../views/InvestmentView.vue"
      ),
  },
  {
    path: "/investmentadd",
    name: "investmentadd",
    component: () =>
      import(
        /* webpackChunkName: "investmentadd" */ "../components/InvestmentAdd.vue"
      ),
  },
  {
    path: "/investmentupdate",
    name: "investmentupdate",
    component: () =>
      import(
        /* webpackChunkName: "investmentupdate" */ "../components/InvestmentUpdate.vue"
      ),
  },
  {
    path: "/investments",
    name: "investments",
    component: () =>
      import(
        /* webpackChunkName: "investmentadd" */ "../views/Investments.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
