<template>
  <v-app-bar app color="#393e46" dark class="mobile">
    <v-spacer>
      <h2>
        Investor Web App - {{ this.$store.state.development.developmentName }}
      </h2>
    </v-spacer>
    <v-spacer>
      <v-btn-toggle borderless>
        <v-btn value="home" color="cyan lighten-2" @click="home">
          <v-icon right> mdi-home </v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-spacer>

    <div class="text-center">
      <v-menu
        dark
        text-align-left
        offsetX
        offsetY
        min-width="25%"
        max-width="100%"
        :value="shown"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark text v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <template>
            <div v-for="item in superUser" :key="item.id">
              <v-list-group v-if="item.items" no-action :group="'items'">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title
                      :close-on-content-click="false"
                      style="text-align: left; margin-left: 5%"
                    >
                      <v-icon :color="item.color">{{ item.icon }}</v-icon>
                      {{ item.title }}</v-list-item-title
                    >
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="subItem in item.items"
                  :key="subItem.id"
                  :to="{ name: subItem.name }"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      style="text-align: left; margin-left: 5%"
                    >
                      <v-icon :color="subItem.color">{{ subItem.icon }}</v-icon>
                      {{ subItem.title }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <v-list-item v-else :to="{ name: item.name }">
                <v-list-item-content>
                  <v-list-item-title style="text-align: left; margin-left: 5%">
                    <v-icon :color="item.color">{{ item.icon }}</v-icon>
                    {{ item.title }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </div>
          </template>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",

  data: () => ({
    superUser: [
      {
        title: "Investors",
        name: "Investors",
        icon: "mdi-warehouse",
        role: 2,
        menu: 1,
        id: "investors",
        color: "blue",
        items: [
          // {
          //   title: "Portal User",
          //   name: "PortalUser",
          //   icon: "mdi-quality-high",
          //   role: 3,
          //   menu: 1,
          //   id: "PortalUser",
          //   color: "orange",
          // },
          {
            title: "Add Investor",
            name: "investoradd",
            icon: "mdi-percent",
            role: 2,
            menu: 1,
            id: "investoradd",
            color: "lime accent-2",
          },
          {
            title: "View Investors",
            name: "investorview",
            icon: "mdi-percent",
            role: 2,
            menu: 1,
            id: "investorview",
            color: "lime accent-5",
          },
          // {
          //   title: "Report - Investor Listing",
          //   name: "InvestorListingReport",
          //   icon: "mdi-chart-gantt",
          //   role: 3,
          //   menu: 1,
          //   id: "InvestorListingReport",
          //   color: "light-green accent-2",
          // },
          // {
          //   title: "Report - Investor Statement",
          //   name: "InvestorStatementReport",
          //   icon: "mdi-certificate",
          //   role: 3,
          //   menu: 1,
          //   id: "InvestorStatementReport",
          //   color: "lime",
          // },

          // {
          //   title: "Report - Investors Excel",
          //   name: "InvestorExcelReport",
          //   icon: "mdi-calendar-check",
          //   role: 3,
          //   menu: 1,
          //   id: "InvestorExcelReport",
          //   color: "amber accent-3",
          // },
        ],
      },

      {
        title: "Oppurtunity",
        name: "Oppurtunity",
        icon: "mdi-fridge",
        role: 3,
        menu: 1,
        id: "Oppurtunity",
        color: "orange",
        items: [
          {
            title: "Category",
            name: "Category",
            icon: "mdi-shopping",
            role: 3,
            menu: 1,
            id: "Category",
            color: "lime",
          },
          {
            title: "Oppurtunity",
            name: "OppurtunitySub",
            icon: "mdi-cash-multiple",
            role: 3,
            menu: 1,
            id: "OppurtunitySub",
            color: "pink",
          },
          {
            title: "Report",
            name: "OpportunityReport",
            icon: "mdi-truck",
            role: 3,
            menu: 1,
            id: "OpportunityReport",
            color: "amber",
          },
        ],
      },
      {
        title: "Investment",
        name: "Investment",
        icon: "mdi-account-cash",
        role: 3,
        menu: 1,
        id: "Investment",
        color: "teal",
        items: [
          {
            title: "Investment",
            name: "InvestmentSub",
            icon: "mdi-cash-multiple",
            role: 3,
            menu: 1,
            id: "InvestmentSub",
            color: "purple accent-1",
          },
          {
            title: "Report - Investment Listing",
            name: "InvestmentListingReport",
            icon: "mdi-basket",
            role: 3,
            menu: 1,
            id: "InvestmentListingReport",
            color: "teal accent-2",
          },
          {
            title: "Report - Investment Updates",
            name: "InvestmentUpdatesReport",
            icon: "mdi-basket",
            role: 3,
            menu: 1,
            id: "InvestmentUpdatesReport",
            color: "teal accent-4",
          },
        ],
      },
      {
        title: "Invest Pledge",
        name: "InvestPledge",
        icon: "mdi-point-of-sale",
        role: 2,
        menu: 1,
        id: "InvestPledge",
        color: "orange accent-1",
        items: [
          // {
          //   title: "Apartment Options",
          //   name: "apartment",
          //   icon: "mdi-table-furniture",
          //   role: 2,
          //   menu: 1,
          //   id: "apartment",
          //   color: "amber"
          // },
        ],
      },

      {
        title: "Updates",
        name: "Updates",
        icon: "mdi-database-import",
        role: 3,
        menu: 1,
        id: "Updates",
        color: "yellow",
        items: [
          {
            title: "Interest",
            name: "Interest",
            icon: "mdi-chart-timeline",
            role: 3,
            menu: 1,
            id: "Interest",
            color: "amber",
          },

          // {
          //   title: "Reset Dates",
          //   name: "DateReset",
          //   icon: "mdi-notebook-edit",
          //   role: 3,
          //   menu: 1,
          //   id: "DateReset",
          //   color: "yellow"
          // }
        ],
      },
      {
        title: "Setup",
        name: "Setup",
        icon: "mdi-account-cowboy-hat",
        role: 3,
        menu: 1,
        id: "Setup",
        color: "light-blue accent-1",
        items: [
          {
            title: "Transaction Type",
            name: "TransactionType",
            icon: "mdi-account-plus",
            role: 3,
            menu: 1,
            id: "TransactionType",
            color: "deep-orange",
          },
        ],
      },
    ],
    siteManager: [
      {
        title: "Progress",
        name: "Progress",
        icon: "mdi-percent",
        role: 2,
        menu: 1,
        id: "signup",
      },
      {
        title: "Gantt Chart",
        name: "gantt4",
        icon: "mdi-chart-gantt",
        role: 3,
        menu: 1,
        id: "gantt4",
        color: "light-green accent-2",
      },

      {
        title: "Create Requisition",
        name: "purchaseordercreate",
        icon: "mdi-shopping",
        role: 3,
        menu: 1,
        id: "purchaseordercreate",
        color: "lime",
      },
      {
        title: "View Purchase Orders",
        name: "POView",
        icon: "mdi-cash-multiple",
        role: 3,
        menu: 1,
        id: "purchaseorderview",
        color: "pink",
      },
      {
        title: "Deliveries",
        name: "Deliveries",
        icon: "mdi-truck",
        role: 3,
        menu: 1,
        id: "Deliveries",
        color: "amber",
      },
      {
        title: "Images",
        name: "Images",
        icon: "mdi-camera",
        role: 3,
        menu: 1,
        id: "images",
        color: "yellow",
      },
      {
        title: "Quality Control",
        name: "QualityControl",
        icon: "mdi-quality-high",
        role: 3,
        menu: 1,
        id: "QualityControl",
        color: "orange",
      },
      {
        title: "Instruction To Commence",
        name: "ITC",
        icon: "mdi-handshake",
        role: 3,
        menu: 1,
        id: "ITC",
        color: "white",
      },
      // {
      //   title: "Schedule",
      //   name: "Schedule",
      //   icon: "mdi-calendar-check",
      //   role: 3,
      //   menu: 1,
      //   id: "schedule"
      // },
      // {
      //   title: "Gantt",
      //   name: "Gantt",
      //   icon: "mdi-chart-gantt",
      //   role: 3,
      //   menu: 1,
      //   id: "gantt"
      // }
    ],
    siteForeman: [
      {
        title: "Progress",
        name: "Progress",
        icon: "mdi-percent",
        role: 2,
        menu: 1,
        id: "signup",
      },
      {
        title: "Gantt V3A",
        name: "ganttv3A",
        icon: "mdi-chart-gantt",
        role: 3,
        menu: 1,
        id: "ganttv3A",
        color: "light-green accent-2",
      },
      {
        title: "Purchase Orders",
        name: "purchaseorders",
        icon: "mdi-fridge",
        role: 3,
        menu: 1,
        id: "pos",
        color: "orange",
        items: [
          {
            title: "Create Requisition",
            name: "purchaseordercreate",
            icon: "mdi-shopping",
            role: 3,
            menu: 1,
            id: "purchaseordercreate",
            color: "lime",
          },
          {
            title: "View Purchase Orders",
            name: "POView",
            icon: "mdi-cash-multiple",
            role: 3,
            menu: 1,
            id: "purchaseorderview",
            color: "pink",
          },
          {
            title: "Deliveries",
            name: "Deliveries",
            icon: "mdi-truck",
            role: 3,
            menu: 1,
            id: "Deliveries",
            color: "amber",
          },
        ],
      },
    ],
    anyUser: [
      {
        title: "About",
        name: "About",
        icon: "mdi-information",
        role: 3,
        menu: 0,
        id: "about",
        color: "amber",
      },
    ],
    shown: "",
  }),

  mounted() {
    console.log("Header.vue");
  },

  methods: {
    home() {
      this.$router.push({
        name: "Home",
      });
    },
    closeMenu() {
      this.closeOnClick = true;
      setTimeout(() => {
        this.closeOnClick = false;
      });
    },
    logout() {
      this.$store.dispatch("logout");
      if (this.$route.name !== "Home") {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style scoped>
h2 {
  color: whitesmoke;
}
@media only screen and (max-width: 767px) {
  .mobile {
    font-size: 60%;
    /* max-width: 100vw; */
  }
}
</style>
