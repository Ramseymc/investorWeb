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
        <!-- add a link to either investmentAdd or investmentUpdate - might change on Wayne's opinion  -->
          <td>{{ investor.investor_acc_number }}</td> 
          <td>{{ investor.investor_name }} {{ investor.investor_surname }} </td>
          <td>{{ investor.investor_email }} </td>
          <td>{{ investor.investor_id_number }} </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  </div>
</template>

<script>

import axios from "axios";
//let url = process.env.VUE_APP_BASEURL;

//import * as dayjs from "dayjs";
//import * as imageConversion from "image-conversion";
//import draggable from "vuedraggable";

export default {
  name: "investorview",
  components: {
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
    };
  },

  async mounted() {
    this.getAllInvestors();
  },

  computed: {    
  },

  watch: {  
  },

  methods: {
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
