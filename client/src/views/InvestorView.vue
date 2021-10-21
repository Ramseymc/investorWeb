<template>
  <div class="about">
    <h1>View Investors</h1>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Investor Code
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            ID
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="investor in InvestorList"
          :key="investor.investor_id"
        >
        
          <td><v-btn :id="investor.investor_id" text @click="viewInvestor">{{ investor.investor_acc_number }}</v-btn>
              
              <!-- <a target="_blank"
                 style="text-decoration: none"
                 v-on:click="openInvestmentView"
                 :id="investor.investor_id"
           >{{ investor.investor_acc_number }} </a> -->

          </td> <!-- add a link to investmentView.vue - might change on Wayne's opinion  -->
                   
          <td>{{ investor.investor_name }} {{ investor.investor_surname }} </td>
          <td>{{ investor.investor_email }} </td>
          <td>{{ investor.investor_id_number }} </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    <InvestmentView
      v-if="openInvestmentViewForm"
      :dialog="openInvestmentViewForm"
      :investorId="investorId"      
      @closeForm="closeForm"
    />
  </div>
</template>

<script>

import axios from "axios";
import InvestmentView from "../views/InvestmentView.vue";
//let url = process.env.VUE_APP_BASEURL;

//import * as dayjs from "dayjs";
//import * as imageConversion from "image-conversion";
//import draggable from "vuedraggable";

export default {
  name: "investorview",
  components: {
      InvestmentView
  },

  metaInfo: {
    title: "Investor View",
    titleTemplate: "CPC - %s",
    meta: [
      {
        name: `description`,
        content: `About CPC here.`,
      },
    ],
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },

  data() {
    return {
      // investor data
      InvestorList: [],
      searchInvestors: "",
      investorId: "",
      SelectedInvestorId: "",
      openInvestmentUpdateForm: false,
    };
  },

  async mounted() {
    this.getAllInvestors();
  },

  computed: {    
      pageUrl() {
      return 'page.html?id=' + this.investorId;
    }
  },

  watch: {  
  },

  methods: {
      viewInvestor(event) {
            console.log(event.currentTarget.id)
            // this.$router.push({})
            this.$router.push({name: 'investmentview', params: { id: event.currentTarget.id } })
      },
    openInvestmentUpdate(theEvent) {
        this.SelectedInvestorId = theEvent.srcElement.id
        console.log("Open Investment View - investor_id", this.SelectedInvestorId)
        // open InvestmentView.vue with the investor_id input 
        //window.open("../investmentview.vue?investorId=" + this.SelectedInvestorId, "_self")
        this.openInvestmentUpdateForm = !this.openInvestmentUpdateForm;
        // // code for the InvestmentView.vue
        // var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
        // var url = new URL(url_string);
        // var investorId = url.searchParams.get("investorId");
        // console.log(investorId);
    },
    closeForm(event) {
      this.openInvestmentViewForm = event;
    },

    async getAllInvestors() {
      this.InvetorsList = [];
      let data = {
        id: 1, //   id: this.$store.state.development.id
      };
      await axios({
        method: "post",
        url: `http://localhost:3000/getAllInvestors`, // use the store url
        data: data,
      })
        .then(
          (response) => {
            response.data.forEach((investor) => {              
              this.InvestorList.push(investor);
            });
            console.log("this.InvetorsList = ", this.InvestorList);
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
