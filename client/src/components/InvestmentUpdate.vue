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
                ref="codeInput"
                v-model="investorCode"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Investor Code:"
                required
                @blur="checkNames"
              ></v-text-field>

              <v-text-field
                ref="linkedEmailInput"
                v-model="project"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Project:"
                required
                @blur="checkNames"
              ></v-text-field>

              <v-text-field
                ref="linkedEmailInput"
                v-model="linkedUnit"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Linked Unit:"
                required
                @blur="checkNames"
              ></v-text-field>

              <v-text-field
                ref="linkedEmailInput"
                v-model="investmentAmount"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Investment Amount:"
                required
                @blur="checkNames"
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
                v-model="loanAgreementSignDate"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Loan Agreement Sign Date:"
                required
                @blur="checkNames"
              ></v-text-field>
              <v-text-field
                ref="surnameInput"
                v-model="investmentDate"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Investment Date:"
                required
                @blur="checkNames"
              ></v-text-field>
              <v-text-field
                v-model="investmentPerc"
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
                v-model="releaseDate"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Release Date:"
                required
                @blur="checkNames"
              ></v-text-field>
              <v-text-field
                ref="surnameInput"
                v-model="releaseAmount"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Release Amount:"
                required
                @blur="checkNames"
              ></v-text-field>
              <v-text-field
                v-model="releasePerc"
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
                ref="nameInput"
                v-model="repaymentDate"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Repayment Date:"
                required
                @blur="checkNames"
              ></v-text-field>
              <v-text-field
                ref="surnameInput"
                v-model="repaymentAmount"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Repayment Amount:"
                required
                @blur="checkNames"
              ></v-text-field>
              <!-- to be a checkbox -->
              <v-checkbox
                v-model="investmentClosed"
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
                v-model="singedLoanAgreementFile"
                label="Signed Loan Agreement"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload Disclaimer Letter"
                persistent-hint
              ></v-file-input>
              <!-- </v-col>
              <v-col cols="12" sm="12"> -->
              <v-file-input
                v-model="POPFile"
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
                  v-model="attorneyConfirmLetterFile"
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
                @click="createUser"
              >
                Create Investor
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
    investorCode: "",
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
    //

    linkedEmail: "",

    person: "",
    buyers: 0,
    buyersSwicth: 1,

    investorInitials: "",
    investorSurname: "",
    investorIDNumber: "",

    investorTwoCode: "",
    investorTwoInitials: "",
    investorTwoSurname: "",
    investorTwoIDNumber: "",

    companyName: "",
    regNumber: "",

    companyRepInitials: "",
    companyRepSurname: "",
    companyRepIDNumber: "",

    contact: "",
    contactEmail: "",
    contactTwoEmail: "",

    streetNo: "",
    streetName: "",
    addressSuburb: "",
    province: "",
    addressPostalCode: "",

    boxNo: "",
    postalSuburb: "",
    postalCode: "",

    bankName: "",
    accountName: "",
    branchCode: "",
    accountNumber: "",

    ficaDate: "",

    investorOneDisclaimerFile: "",
    investorOneIDFile: null,
    investorOnePOAFile: null,

    investorTwoDisclaimerFile: null,
    investorTwoIDFile: null,
    investorTwoPOAFile: null,

    representativeDisclaimerFile: null,
    representativeIDFile: null,
    representativePOAFile: null,
    companyResolutionFile: null,
    companyRefDocsFile: null,
    companyPOAFile: null,

    mobile: {
      countryCode: "ZA",
      isValid: false,
      phoneNumber: "",
      phoneNumberTwo: "",
    },
    landline: {
      countryCode: "ZA",
      isValid: false,
      phoneNumber: "",
      phoneNumberTwo: "",
    },

    snackbar: false,
    snackbarMessage: "",
    checkbox: false,
    // ^^ wip

    mobileResults: {},
    // good rules examples
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 15 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  async mounted() {
    this.testServer();
  },
  watch: {},

  methods: {
    async testServer() {
      await axios({
        method: "get",
        url: `http://localhost:3000/test`,
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

    async saveInvestor() {
      let files = [];
      let contains = [];
      if (this.investorOneDisclaimerFile !== null) {
        contains.push("investorOneDisclaimerFile");
        files.push(this.investorOneDisclaimerFile); // append mimetype here?
      }

      // investorOneDisclaimerFile: null,
      if (this.investorOneIDFile !== null) {
        contains.push("investorOneIDFile");
        files.push(this.investorOneIDFile); // append mimetype here?
      }
      // investorOneIDFile: null,
      if (this.investorOnePOAFile !== null) {
        contains.push("investorOnePOAFile");
        files.push(this.investorOnePOAFile); // append mimetype here?
      }
      // investorOnePOAFile: null,

      if (this.investorTwoDisclaimerFile !== null) {
        contains.push("investorTwoDisclaimerFile");
        files.push(this.investorTwoDisclaimerFile); // append mimetype here?
      }
      // investorTwoDisclaimerFile: null,
      if (this.investorTwoIDFile !== null) {
        contains.push("investorTwoIDFile");
        files.push(this.investorTwoIDFile); // append mimetype here?
      }
      // investorTwoIDFile: null,
      if (this.investorTwoPOAFile !== null) {
        contains.push("investorTwoPOAFile");
        files.push(this.investorTwoPOAFile); // append mimetype here?
      }
      // investorTwoPOAFile: null,

      if (this.representativeDisclaimerFile !== null) {
        contains.push("representativeDisclaimerFile");
        files.push(this.representativeDisclaimerFile); // append mimetype here?
      }
      // representativeDisclaimerFile: null,
      if (this.representativeIDFile !== null) {
        contains.push("representativeIDFile");
        files.push(this.representativeIDFile); // append mimetype here?
      }
      // representativeIDFile: null,
      if (this.representativePOAFile !== null) {
        contains.push("representativePOAFile");
        files.push(this.representativePOAFile); // append mimetype here?
      }
      // representativePOAFile: null,
      if (this.companyResolutionFile !== null) {
        contains.push("companyResolutionFile");
        files.push(this.companyResolutionFile); // append mimetype here?
      }
      // companyResolutionFile: null,
      if (this.companyRefDocsFile !== null) {
        contains.push("companyRefDocsFile");
        files.push(this.companyRefDocsFile); // append mimetype here?
      }
      // companyRefDocsFile: null,
      if (this.companyPOAFile !== null) {
        contains.push("companyPOAFile");
        files.push(this.companyPOAFile); // append mimetype here?
      }
      // companyPOAFile: null

      let formData = new FormData();
      for (var x = 0; x < files.length; x++) {
        formData.append("documents", files[x]);
      }

      formData.append("investorCode", this.investorCode);
      formData.append("linkedEmail", this.linkedEmail);
      formData.append("investorInitials", this.investorInitials);
      formData.append("investorSurname", this.investorSurname);
      formData.append("investorIDNumber", this.investorIDNumber);

      formData.append("investorTwoCode", this.investorTwoCode);
      formData.append("investorTwoInitials", this.investorTwoInitials);
      formData.append("investorTwoSurname", this.investorTwoSurname);
      formData.append("investorTwoIDNumber", this.investorTwoIDNumber);

      formData.append("companyName", this.companyName);
      formData.append("regNumber", this.regNumber);

      formData.append("companyRepInitials", this.companyRepInitials);
      formData.append("companyRepSurname", this.companyRepSurname);
      formData.append("companyRepIDNumber", this.companyRepIDNumber);

      formData.append("contactEmail", this.contactEmail);
      formData.append("contactTwoEmail", this.contactTwoEmail);

      formData.append("mobile", this.mobile.phoneNumber);
      formData.append("landline", this.landline.phoneNumber);
      formData.append("mobileTwo", this.mobile.phoneNumberTwo);
      formData.append("landlineTwo", this.landline.phoneNumberTwo);

      formData.append("streetNo", this.streetNo);
      formData.append("streetName", this.streetName);
      formData.append("addressSuburb", this.addressSuburb);
      formData.append("province", this.province);
      formData.append("addressPostalCode", this.addressPostalCode);

      formData.append("boxNo", this.boxNo);
      formData.append("postalSuburb", this.postalSuburb);
      formData.append("postalCode", this.postalCode);

      formData.append("bankName", this.bankName);
      formData.append("accountName", this.accountName);
      formData.append("branchCode", this.branchCode);
      formData.append("accountNumber", this.accountNumber);

      formData.append("ficaDate", this.ficaDate);

      formData.append("person", this.person);

      await axios({
        method: "post",
        url: `${url}/createInvestor`,
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
