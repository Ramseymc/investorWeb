<template>
  <v-container fluid>
    <div>
      <br />
      <!-- <v-row> -->
      <!-- <v-col > -->

      <v-layout align-center justify-center style="padding: 8px">
        <v-form ref="form" v-model="valid" lazy-validation>
          <h2>Update Investment</h2>

          <!-- Person / company and 2 People radio buttons -->
          <!-- <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-radio-group
                  v-model="person"
                  @change="personCompanySwitch"
                  row
                >
                  <v-radio
                    label="Individual"
                    color="blue"
                    value="person"
                  ></v-radio>
                  <v-radio
                    label="Company / Trust"
                    color="purple darken-2"
                    value="company"
                  ></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12" md="4">
                <v-radio-group v-model="buyers" v-if="person === 'person'" row>
                  <v-radio
                    label="1 Person"
                    color="blue darken-3"
                    value="1"
                  ></v-radio>
                  <v-radio
                    label="2 People"
                    color="green darken-3"
                    value="2"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-container> -->

          <!-- Investor Code & Linked email - read-only fields -->
          <v-container>
            <v-row>
              <v-text-field
                v-model="this.SelectedInvestment[0].investor_acc_number"
                label="Investor Code:"
              ></v-text-field>

              <v-text-field
                v-model="this.SelectedInvestment[0].project"
                label="Project:"
              ></v-text-field>

              <v-text-field
                ref="linkedEmailInput"
                v-model="this.SelectedInvestment[0].linked_unit"
                :counter="20"
                maxValue="20"
                label="Linked Unit:"
                required
              ></v-text-field>

              <v-text-field
                ref="linkedEmailInput"
                v-model="this.SelectedInvestment[0].investment_amount"
                :counter="20"
                maxValue="20"
                label="Investment Amount:"
                required
              ></v-text-field>
            </v-row>
          </v-container>

          <!-- 1 investor details -->
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <!-- <h3>Investor One Details</h3> -->
              </v-col>
              <v-text-field
                ref="nameInput"
                v-model="this.SelectedInvestment[0].end_date"
                :counter="20"
                maxValue="20"
                label="Loan Agreement Sign Date (enddate*):"
                required
              ></v-text-field>
              <v-text-field
                ref="surnameInput"
                v-model="this.SelectedInvestment[0].datecreated"
                :counter="20"
                maxValue="20"
                label="Investment Date:"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestment[0].investment_interest_rate"
                label="Investment %:"
                required
              ></v-text-field>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <!-- <h3>Investor One Details</h3> -->
              </v-col>
              <v-text-field
                ref="nameInput"
                v-model="this.SelectedInvestment[0].releaseDate"
                :counter="20"
                maxValue="20"
                label="Release Date:"
                required
              ></v-text-field>
              <v-text-field
                ref="surnameInput"
                v-model="this.SelectedInvestment[0].releaseAmount"
                :counter="20"
                maxValue="20"
                label="Release Amount:"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestment[0].releasePerc"
                label="Release %:"
                required
              ></v-text-field>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <!-- <h3>Investor One Details</h3> -->
              </v-col>
              <v-text-field
                v-model="this.SelectedInvestment[0].end_date"
                label="Repayment Date(*end date):"
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestment[0].repayment_amount"
                label="Repayment Amount:"
              ></v-text-field>
              <!-- to be a checkbox -->
              <v-checkbox
                v-model="this.SelectedInvestment[0].investment_closed"
                label="Investment Closed?"
                color="success"
                value="success"
                hide-details
              ></v-checkbox>
              <!-- <v-text-field
                v-model="investmentClosed"
                label="Investment Closed?"
                required
              ></v-text-field> -->
            </v-row>
          </v-container>

          <!-- File uploads - always -->
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <h3>File Uploads</h3>
              </v-col>
            </v-row>
          </v-container>

          <!-- investor1 file uploads -->
          <v-container>
            <v-row>
              <v-col cols="12" sm="12"> </v-col>
              <v-file-input
                v-model="this.SelectedInvestment[0].singedLoanAgreementFile"
                label="Signed Loan Agreement"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload Disclaimer Letter"
                persistent-hint
              ></v-file-input>
              <!-- </v-col>
              <v-col cols="12" sm="12"> -->
              <v-file-input
                v-model="this.SelectedInvestment[0].POPFile"
                label="POP File"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload ID"
                persistent-hint
              ></v-file-input>
              <!-- </v-col>
              
              <v-col cols="12" sm="12">
              <v-col cols="12" sm="12"> -->
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <v-file-input
                  v-model="this.SelectedInvestment[0].attorneyConfirmLetterFile"
                  label="Attorney Confirmation Letter"
                  accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                  filled
                  hint="Upload POA"
                  persistent-hint
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>

          <!-- Action Buttons -->
          <v-container>
            <v-row>
              <v-checkbox
                v-model="checkbox"
                color="#111d5e"
                :rules="[
                  (v) =>
                    !!v ||
                    'You must ensure that all information entered here is correct As modifying it after it is created will require outside assistance!',
                ]"
                label="Confirm Information is Correct?"
                required
              ></v-checkbox>

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
              <v-snackbar v-model="snackbar">
                {{ snackbarMessage }}
                <v-btn color="pink" text @click="snackbar = false">
                  Close
                </v-btn>
              </v-snackbar>
            </v-row>
          </v-container>
        </v-form>
      </v-layout>
      <!-- </v-col> -->
      <!-- </v-row> -->
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
//import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
let url = process.env.VUE_APP_BASEURL;

export default {
  name: "investmentupdate",
  components: {
    // VuePhoneNumberInput,
  },
  props: {
    dialog: Boolean,
    investmentId: String,
  },
  metaInfo: {
    title: "Update Investment",
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
    // add data models here

    roleId: null,
    jobId: null,
    jobType: null,
    jobTypes: [],
    role: [],
    roles: [],
    valid: true, // crm
    value: true,

    // investment form data
    SelectedInvestment: [],
    investorCode: "",
    investorId: "",
    project: "",
    linkedUnit: "",
    investmentAmount: "",
    loanAgreementSignDate: "",
    investmentDate: "",
    investmentPerc: "",
    releaseDate: "",
    releaseAmount: "",
    releasePerc: "",
    repaymentDate: "",
    repaymentAmount: "",
    investmentClosed: false,
    singedLoanAgreementFile: null,
    POPFile: null,
    attorneyConfirmLetterFile: null,

    snackbar: false,
    snackbarMessage: "",
    checkbox: false,
  }),

  async mounted() {
    this.paramId = parseInt(this.$route.params.id);
    this.testServer();
    this.getInvestmentDetails();
  },
  watch: {},

  methods: {
    async getInvestmentDetails() {
      let data = {
        id: 1, // use the $store.developement.id
        paramId: this.paramId,
      };
      console.log(data);
      await axios({
        method: "post",
        url: `${url}/getInvestmentDetails`, // use store url
        data: data,
      })
        .then(
          (response) => {
            response.data.forEach((investment) => {
              this.SelectedInvestment.push(investment);
              // this.InvestorCode = investment.investor_acc_number;
            });
            console.log(
              "this.SelectedInvestment List = ",
              this.SelectedInvestment
            );
            // use a method here to set the local properties for v-models setFormValues()
            // this.setFormValues() // this.InvestorName = this.SelectedInvestor.investor_name etc
            this.setFormValues();
          },
          (error) => {
            console.log(error);
          }
        )
        .catch((e) => {
          console.log(e);
        });
      // get the details from the selected investorId
    },
    async testServer() {
      await axios({
        method: "get",
        url: `${url}/test`,
      }).then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    test(event) {
      console.log(event);
    },

    personCompanySwitch() {
      this.buyers = "1";
    },

    getFiles() {
      let files = [];
      let contains = [];
      console.log(
        "(this.singedLoanAgreementFile) = ",
        this.singedLoanAgreementFile
      );
      if (this.singedLoanAgreementFile !== null) {
        contains.push("singedLoanAgreementFile");
        files.push(this.singedLoanAgreementFile); // append mimetype here?
      }

      // investorOneDisclaimerFile: null,
      if (this.POPFile !== null) {
        contains.push("POPFile");
        files.push(this.POPFile); // append mimetype here?
      }
      // investorOneIDFile: null,
      if (this.attorneyConfirmLetterFile !== null) {
        contains.push("attorneyConfirmLetterFile");
        files.push(this.attorneyConfirmLetterFile); // append mimetype here?
      }
      return files;
    },

    async updateInvestment() {
      let files = [];
      let contains = [];
      console.log(
        "(this.singedLoanAgreementFile) = ",
        this.singedLoanAgreementFile
      );
      if (this.singedLoanAgreementFile !== null) {
        contains.push("singedLoanAgreementFile");
        files.push(this.singedLoanAgreementFile); // append mimetype here?
      }

      // investorOneDisclaimerFile: null,
      if (this.POPFile !== null) {
        contains.push("POPFile");
        files.push(this.POPFile); // append mimetype here?
      }
      // investorOneIDFile: null,
      if (this.attorneyConfirmLetterFile !== null) {
        contains.push("attorneyConfirmLetterFile");
        files.push(this.attorneyConfirmLetterFile); // append mimetype here?
      }

      console.log("contains:", contains);
      console.log("files:", files);

      let formData = new FormData();
      for (var x = 0; x < files.length; x++) {
        formData.append("documents", files[x]);
      } // get it in the route and see if documents has stuff
      formData.append("contains", contains);
      formData.append("investorCode", this.investorId);
      formData.append("investorCode", this.investorCode);
      formData.append("project", this.project);
      formData.append("linkedUnit", this.linkedUnit);
      formData.append("investmentAmount", this.investmentAmount);
      formData.append("loanAgreementSignDate", this.loanAgreementSignDate);

      formData.append("investmentDate", this.investmentDate);
      formData.append("releaseDate", this.releaseDate);
      formData.append("releaseAmount", this.releaseAmount);
      formData.append("releasePerc", this.releasePerc);

      formData.append("repaymentDate", this.repaymentDate);
      formData.append("repaymentAmount", this.repaymentAmount);

      formData.append("companyRepInitials", this.companyRepInitials);
      formData.append("companyRepSurname", this.companyRepSurname);
      formData.append("companyRepIDNumber", this.companyRepIDNumber);

      formData.append("investmentClosed", this.investmentClosed);
      formData.append("ficaDate", this.ficaDate);
      formData.append("person", this.person);
      await axios({
        method: "post",
        url: `${url}/updateInvestment`,
        data: formData,
      }).then(
        (response) => {
          console.log(response.data);
          this.snackbar = true;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    reset() {
      this.$refs.form.reset();
      this.checkbox = false;
    },
  },
};
</script>

<style scoped>
p {
  color: red;
  font-size: 80%;
  text-align: left;
}
</style>
