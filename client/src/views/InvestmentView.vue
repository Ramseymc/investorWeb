<template>
  <div class="about">
    <h1>View Investments</h1>
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
            Date Created
          </th>
          <th class="text-left">
            Investment Amount
          </th>
          <!-- <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            ID
          </th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="investment in InvestmentList"
          :key="investment.investment_id"
        >
          <td><v-btn :id="investment.investment_id" text @click="viewInvestment">{{ investment.investor_acc_number }}</v-btn>  
          
          <td>{{ investment.investor_name }} {{ investment.investor_surname }} </td> <!-- + link to investmentUpdate.vue --> 

          <td>{{ investment.datecreated }}  </td> 

          <td> {{ investment.investment_amount }}  </td> 
          <!-- <td>{{ investor.investor_name }} {{ investor.investor_surname }} </td>
          <td>{{ investor.investor_email }} </td>
          <td>{{ investor.investor_id_number }} </td> -->
        </tr>
      </tbody>

      <!-- button to investmentAdd.vue -->
    </template>
  </v-simple-table>
    <InvestmentUpdate
      v-if="openInvestmentUpdateForm"
      :dialog="openInvestmentUpdateForm"
      :investorId="investorId"      
      @closeForm="closeForm"
    />
  </div>
</template>

<script>
import axios from "axios";
//let url = process.env.VUE_APP_BASEURL;
import InvestmentUpdate from "../components/InvestmentUpdate.vue"
//import * as dayjs from "dayjs";
//import * as imageConversion from "image-conversion";

export default {
  name: "investmentview",
  components: {
   InvestmentUpdate
  },
  metaInfo: {
    title: "Investment View",
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
  props: {
      dialog: Boolean,
      investorId: String,
  },
  data() {
    return {
      // investment data
      InvestmentList: [],
      searchInvestments: "",  
      paramId: 0 ,
      openInvestmentUpdateForm: "",
      //investorId: "", 
    };
  },

  async mounted() {
    // get the investor_id to filter on 
    this.paramId = parseInt(this.$route.params.id)

    this.getAllInvestments();   
  },

  computed: {    
  },

  watch: {  
  },

  methods: {
      viewInvestment(event) {
            console.log(event.currentTarget.id)
            // this.$router.push({})
            this.$router.push({name: 'investmentupdate', params: { id: event.currentTarget.id } })
            console.log("view investment done");
      },
    async getAllInvestments() {
      this.InvestmentList = [];
      let data = {
        id: 1, // use the $store.developement.id 
        paramId: this.paramId
      };
      console.log(data)
      await axios({
        method: "post",
        url: `http://localhost:3000/getAllInvestments`, // use store url 
        data: data,
      })
        .then(
          (response) => {
            response.data.forEach((investment) => {            
              this.InvestmentList.push(investment);
            });
            console.log("this.Investment List = ", this.InvestmentList);
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
