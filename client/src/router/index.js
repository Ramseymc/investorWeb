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
    path: "/investorupdate",
    name: "investorupdate",
    component: () =>
      import(
        /* webpackChunkName: "investoradd" */ "../components/InvestorUpdate.vue"
      ),
  },
  {
    path: "/investorview",
    name: "investorview",
    component: () =>
      import(
        /* webpackChunkName: "investorview" */ "../views/InvestorViewMain.vue"
      ),
  },
  {
    path: "/investorviewmain",
    name: "investorviewmain",
    component: () =>
      import(
        /* webpackChunkName: "investorview" */ "../views/InvestorViewMain.vue"
      ),
  },
  {
    path: "/investmentviewmain",
    name: "investmentviewmain",
    component: () =>
      import(
        /* webpackChunkName: "investorview" */ "../views/InvestmentViewMain.vue"
      ),
  },
  {
    path: "/investmentview/:id",
    name: "investmentview",
    // params: true,
    component: () =>
      import(
        /* webpackChunkName: "investmentview" */ "../views/InvestmentViewMain.vue"
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
