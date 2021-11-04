<template>
  <div>
    <!-- <input type="file" onchange="this.loadFile(this.files[0])"> -->

    <br />
    <v-row>
      <h1>| Dash Board Management -</h1>

      <!-- <v-btn-toggle v-model="icon" borderless> -->
      <v-btn value="home" color="green" @click="home">
        <v-icon right> mdi-home </v-icon>
      </v-btn>
    </v-row>
    <!-- <pre id="output"></pre>  -->
    <v-container fluid>
      <div>
        <br />
        <v-row>
          <!-- first v-row -->
          <v-col>
            <!-- first v-col  -->

            <v-layout align-center justify-center style="padding: 8px">
              <v-container>
                <!-- totals and calculations -->
                <v-row>
                  <v-col cols="4">
                    <!-- Overview -->
                    <v-text-field
                      v-model="investmentTotals"
                      label="Investments Totals :"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <textarea>
                  Global info - data, graphs, text fields to come here 
                </textarea
                    >
                  </v-col>

                  <v-col cols="6">
                    <v-btn
                      text
                      color="success"
                      class="mr-4"
                      v-if="checkbox"
                      @click="createInvestor"
                    >
                      Update Investor
                    </v-btn>
                  </v-col>

                  <v-row> </v-row>
                  <!--  this is the right hand side -->

                  <v-col cols="4">
                    <v-row>
                      <v-btn
                        value="create"
                        color="primary"
                        @click="createInvestor"
                      >
                        <span class="hidden-sm-and-down"
                          >Register Investor</span
                        >

                        <v-icon right> mdi-account-plus </v-icon>
                      </v-btn>

                      <v-btn
                        text
                        color="success"
                        class="mr-4"
                        v-if="checkbox"
                        @click="createInvestor"
                      >
                        Update Investor
                      </v-btn>
                    </v-row>
                    <v-row>
                      <v-btn
                        value="create"
                        color="primary"
                        @click="viewInvestors"
                      >
                        <span class="hidden-sm-and-down">Browse Investors</span>

                        <v-icon right> mdi-format-align-justify </v-icon>
                      </v-btn>
                    </v-row>

                    <!-- reset form row -->
                    <v-row>
                      <v-btn value="create" color="primary" @click="create">
                        <span class="hidden-sm-and-down">Reporting</span>

                        <v-icon right> mdi-note-multiple-outline </v-icon>
                      </v-btn>
                    </v-row>
                    <v-row>
                      <v-btn value="create" color="primary" @click="create">
                        <span class="hidden-sm-and-down">Calculations</span>

                        <v-icon right> mdi-chart-bar-stacked </v-icon>
                      </v-btn>
                    </v-row>
                  </v-col>

                  <!-- 
                 <v-col cols="12">
                <v-btn
                  text
                  color="success"
                  class="mr-4"
                  v-if="checkbox"
                  @click="updateInvestment"
                >
                  Update Investment
                </v-btn>
                <v-btn text color="error" class="mr-4" @click="reset">
                  Reset Form
                </v-btn>
                 </v-col> -->
                </v-row>

                <v-row>
                  <v-col cols="2"> <v-btn value="1"> ENDULINI </v-btn> </v-col>
                  <v-col cols="2"> <v-btn> HF </v-btn> </v-col>
                  <v-col cols="2"> <v-btn> HV </v-btn> </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-btn value="refresh" color="secondary" @click="refresh">
                      <span>Refresh</span>

                      <v-icon right> mdi-refresh </v-icon>
                    </v-btn>
                  </v-col>

                  <v-snackbar v-model="snackbar">
                    {{ snackbarMessage }}
                    <v-btn color="pink" text @click="snackbar = false">
                      Close
                    </v-btn>
                  </v-snackbar>
                </v-row>
              </v-container>
            </v-layout>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
//let url = process.env.VUE_APP_BASEURL;

export default {
  name: "investoradd",
  components: {},
  metaInfo: {
    title: "Create Investor",
    titleTemplate: "CPC - %s",
    meta: [
      {
        name: `description`,
        content: `Join CPC here.`,
      },
    ],
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  data: () => ({
    name: "",
  }),
  methods: {
    viewInvestors() {
      // this.$router.push({})
      console.log("launch view");
      this.$router.push({
        //name: "investmentview",
        name: "investorview",
        //params: { id: event.currentTarget.id },
      });
    },
    createInvestor() {
      console.log("launch add");
      this.$router.push({
        name: "investoradd",
        //params: { id: this.paramId },
        //params: { id: event.currentTarget.id },
      });
    },
    async loadFile(file) {
      let text = await file.text();
      document.getElementById("output").textContent = text;
    },
  },
};
</script>
