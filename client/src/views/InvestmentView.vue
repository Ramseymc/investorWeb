<template>
  <div class="about">
    <h1>View Investments</h1>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Investor ID
          </th>
          <th class="text-left">
            Investment ID 
            <!-- link to investmentUpdate.vue -->
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
        
          <td>{{ investment.investor_id }}  </td> 
          
          <td>{{ investment.investment_id }} <!-- + link to investmentUpdate.vue --> </td> 

          <!-- <td>{{ investor.investor_name }} {{ investor.investor_surname }} </td>
          <td>{{ investor.investor_email }} </td>
          <td>{{ investor.investor_id_number }} </td> -->
        </tr>
      </tbody>

      <!-- button to investmentAdd.vue -->
    </template>
  </v-simple-table>

  </div>
</template>

<script>
import axios from "axios";
//let url = process.env.VUE_APP_BASEURL;

//import * as dayjs from "dayjs";
//import * as imageConversion from "image-conversion";

export default {
  name: "investmentview",
  components: {
   
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
  
  data() {
    return {
      // investment data
      InvestmentList: [],
      searchInvestments: "",      
    };
  },

  async mounted() {
    this.getAllInvestments();   
  },

  computed: {    
  },

  watch: {  
  },

  methods: {
    async getAllInvestments() {
      this.InvestmentList = [];
      let data = {
        id: 1, // use the $store.developement.id 
      };
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
            console.log("this.InvetorsList = ", this.InvestmentList);
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
