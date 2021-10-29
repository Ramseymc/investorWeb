<template>
  <v-container fluid>
    <div>
      <br />
      <!-- <v-row> -->
      <!-- <v-col > -->

      <v-layout align-center justify-center style="padding: 8px">
        <v-form ref="form" v-model="valid" lazy-validation>
          <h2>Update Investor</h2>

          <!-- Person / company and 2 People radio buttons -->
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-radio-group
                  v-model="this.SelectedInvestor[0].person_mode"
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
                <v-radio-group v-model="this.SelectedInvestor[0].buyers" v-if="this.SelectedInvestor[0].person_mode === 'person'" row>
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
          </v-container>

          <!-- Investor Code & Linked email - read-only fields -->
          <v-container>
            <v-row>
              <v-text-field
           
                v-model="this.SelectedInvestor[0].investor_acc_number"

         
                label="Investor Code"
                required
              ></v-text-field>

              <v-text-field
                ref="linkedEmailInput"
                v-model="this.SelectedInvestor[0].linked_email"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Linked User Email (Portal):"
                required
              ></v-text-field>
            </v-row>
          </v-container>

          <!-- 1 investor details -->
          <v-container v-if="this.SelectedInvestor[0].person_mode === 'person'">
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Investor One Details</h3>
              </v-col>
              <v-text-field
                ref="nameInput"
                v-model="this.SelectedInvestor[0].investor_name"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Investor Initials"
                required
              ></v-text-field>
              <v-text-field
                ref="surnameInput"
                v-model="this.SelectedInvestor[0].investor_surname"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Investor Surname"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].investor_id_number"
                label="ID Number*"
                required
              ></v-text-field>
            </v-row>
          </v-container>

          <!-- 2nd investor details -->
          <v-container v-if="this.SelectedInvestor[0].person_mode === 'person' && this.SelectedInvestor[0].buyers === '2'">
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Investor Two Details</h3>
              </v-col>
              <v-text-field
    
                v-model="this.SelectedInvestor[0].investor_two_name"
             
                label="Investor Two Initials"
                
              ></v-text-field>
              <v-text-field
      
                v-model="this.SelectedInvestor[0].investor_two_surname"
         
              
                label="Investor Two Surname"
              
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].investor_two_id_number"
  
              ></v-text-field>
            </v-row>
          </v-container>

          <!-- company details -->
          <v-container v-if="this.SelectedInvestor[0].person_mode === 'company'">
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Company Details</h3>
              </v-col>
              <v-text-field
                ref="companyNameInput"
                v-model="this.SelectedInvestor[0].company_name"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Company Name"
                required
              ></v-text-field>
              <v-text-field
                ref="companyRegInput"
                v-model="this.SelectedInvestor[0].ref_number"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Registration/Trust No"
                required
              ></v-text-field>
            </v-row>
          </v-container>

          <!-- company representative details -->
          <v-container v-if="this.SelectedInvestor[0].person_mode === 'company'">
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Company Representative Details</h3>
              </v-col>
              <v-text-field
                ref="nameInput"
                v-model="this.SelectedInvestor[0].company_rep_initals"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Investor Two Initials"
                required
              ></v-text-field>
              <v-text-field
                ref="surnameInput"
                v-model="this.SelectedInvestor[0].company_rep_surname"
                :counter="20"
                maxValue="20"
                :rules="nameRules"
                label="Investor Two Surname"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].company_rep_id_number"
                label="Investor Two ID Number*"
                required
              ></v-text-field>
            </v-row>
          </v-container>

          <!-- contact 1 details - person -->
          <v-container v-if="this.SelectedInvestor[0].person_mode === 'person'">
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Contact One Details</h3>
              </v-col>
              <v-text-field
                v-model="this.SelectedInvestor[0].contact_email"
                label="Contact One Email*"
                required
              ></v-text-field>
              <v-col cols="6" style="background-color: lightgrey">
                <span>Contact One - Mobile - Required</span>
                <VuePhoneNumberInput
                  id="phoneNumber1"
                  v-model="this.mobile.phoneNumber"
                  ref="mobile"
                  clearable
                  default-country-code="ZA"
                  show-code-on-list
                  :only-countries="['ZA']"
                
                />
              </v-col>
              <v-col cols="6" style="background-color: lightgrey">
                <span>Contact One - Landline</span>
                <VuePhoneNumberInput
                  id="phoneNumber2"
                  v-model="this.SelectedInvestor[0].investor_landline"
                  ref="landline"
                  clearable
                  default-country-code="ZA"
                  show-code-on-list
                  :only-countries="['ZA']"
  
                />
              </v-col>
            </v-row>
          </v-container>

          <!-- contact 2 details - show if 2 people or trust/company mode-->
          <v-container v-if="this.SelectedInvestor[0].person_mode === 'person' && buyers === '2'">
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Contact Two Details</h3>
              </v-col>
              <v-text-field
                v-model="this.SelectedInvestor[0].contact_two_email"
                label="Contact Two Email"
                required
              ></v-text-field>
              <v-col cols="6" style="background-color: lightgrey">
                <v-col cols="12" sm="12">
                  <span>Contact Two Mobile - Required</span>
                </v-col>
                <VuePhoneNumberInput
                  id="phoneNumber3"
                  v-model="this.SelectedInvestor[0].mobile_two"
                  ref="mobile"
                  clearable
                  default-country-code="ZA"
                  show-code-on-list
                  :only-countries="['ZA']"
     
                />
              </v-col>
              <v-col cols="6" style="background-color: lightgrey">
                <v-col cols="12" sm="12">
                  <span>Contact Two Landline</span>
                </v-col>
                <VuePhoneNumberInput
                  id="phoneNumber4"
                  v-model="this.SelectedInvestor[0].landline_two"
                  ref="landline"
                  clearable
                  default-country-code="ZA"
                  show-code-on-list
                  :only-countries="['ZA']"
                 
                />
              </v-col>
            </v-row>
          </v-container>

          <!-- Address details - always -->
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Address Details</h3>
              </v-col>
              <v-text-field
                v-model="this.SelectedInvestor[0].street_no"
                label="Street No"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].street_name"
                label="Street Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].address_suburb"
                label="Suburb"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].province"
                label="Province"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].address_postal_code"
                label="Postal Code"
                required
              ></v-text-field>
            </v-row>
          </v-container>

          <!-- Postal Address - always -->
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Postal Address</h3>
              </v-col>
              <v-text-field
                v-model="this.SelectedInvestor[0].box_no"
                label="Box No"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].postal_suburb"
                label="Suburb"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].postal_code"
                label="Postal Code"
                required
              ></v-text-field>
            </v-row>
          </v-container>

          <!-- Banking details - always -->
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Banking Details</h3>
              </v-col>
              <v-text-field
                v-model="this.SelectedInvestor[0].bank_name"
                label="Bank Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].account_name "
                label="Account Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].branch_code"
                label="Branch Code"
                required
              ></v-text-field>
              <v-text-field
                v-model="this.SelectedInvestor[0].account_no"
                label="Account No"
                required
              ></v-text-field>
            </v-row>
          </v-container>

          <!-- FICA Details - always ? -->
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <h3>FICA Details</h3>
              </v-col>
              <v-text-field
                v-model="this.SelectedInvestor[0].fica_date"
                label="FICA Date"
                required
              ></v-text-field>
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
          <v-container v-if="this.SelectedInvestor[0].person_mode === 'person'">
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Investor One File Uploads</h3>
              </v-col>
              <v-file-input
                v-model="this.SelectedInvestor[0].investorOneDisclaimerFile"
                label="Upload Disclaimer Letter"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload Disclaimer Letter"
                persistent-hint
              ></v-file-input>
              <!-- </v-col>
              <v-col cols="12" sm="12"> -->
              <v-file-input
                v-model="this.SelectedInvestor[0].investorOneIDFile"
                label="Upload ID"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload ID"
                persistent-hint
              ></v-file-input>
              <!-- </v-col>
              <v-col cols="12" sm="12"> -->
              <v-file-input
                v-model="this.SelectedInvestor[0].investorOnePOAFile"
                label="Upload POA"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload POA"
                persistent-hint
              ></v-file-input>
            </v-row>
          </v-container>

          <!-- investor2 file uploads - show if company mode-->
          <v-container v-if="this.SelectedInvestor[0].person_mode === 'person' && this.SelectedInvestor[0].buyers === '2'">
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Investor Two File Uploads</h3>
              </v-col>
              <v-file-input
                v-model="this.SelectedInvestor[0].investorTwoDisclaimerFile"
                label="Upload Disclaimer Letter"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload Disclaimer Letter"
                persistent-hint
              ></v-file-input>
              <v-file-input
                v-model="this.SelectedInvestor[0].investorTwoIDFile"
                label="Upload ID"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload ID"
                persistent-hint
              ></v-file-input>
              <v-file-input
                v-model="this.SelectedInvestor[0].investorTwoPOAFile"
                label="Upload POA"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload POA"
                persistent-hint
              ></v-file-input>
            </v-row>
          </v-container>

          <!-- company/trust file uploads -->
          <v-container v-if="this.SelectedInvestor[0].person_mode === 'company'">
            <v-row>
              <v-col cols="12" sm="12">
                <h3>Company & Representative File Uploads</h3>
              </v-col>
              <v-file-input
                v-model="this.SelectedInvestor[0].representativeDisclaimerFile"
                label="Upload Representation Disclaimer Letter"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload Disclaimer Letter"
                persistent-hint
              ></v-file-input>
              <v-file-input
                v-model="this.SelectedInvestor[0].representativeIDFile"
                label="Upload Representation ID"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload ID"
                persistent-hint
              ></v-file-input>
              <v-file-input
                v-model="this.SelectedInvestor[0].representativePOAFile"
                label="Representative POA"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload POA"
                persistent-hint
              ></v-file-input>
              <v-file-input
                v-model="this.SelectedInvestor[0].companyResolutionFile"
                label="Company / Trust Resolution"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload Company / Trust Resolution"
                persistent-hint
              ></v-file-input>
              <v-file-input
                v-model="this.SelectedInvestor[0].companyRefDocsFile"
                label="Company / Trust Reg Docs"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload Company / Trust Reg Docs"
                persistent-hint
              ></v-file-input>
              <v-file-input
                v-model="this.SelectedInvestor[0].companyPOAFile"
                label="Company / Trust POA"
                accept="image/jpeg, image/jpg, image/png, image/bmp, application/pdf"
                filled
                hint="Upload Company / Trust POA"
                persistent-hint
              ></v-file-input>
            </v-row>
          </v-container>

          <!-- Action Buttons -->
          <v-container>
            <v-row>
              <v-checkbox
                v-model="checkbox"
                color="#111d5e"              
                label="Confirm Information is Correct?"
                required
              ></v-checkbox>

              <v-btn
                text
                color="success"
                class="mr-4"
                v-if="checkbox"
                @click="updateInvestor"
              >
                Update Investor
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
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
let url = process.env.VUE_APP_BASEURL;

export default {
  name: "investorupdate",
  components: {
    VuePhoneNumberInput,
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
    roleId: null,
    jobId: null,
    jobType: null,
    jobTypes: [],
    role: [],
    roles: [],
    valid: true, // crm
    value: true,

    // investor form data
    SelectedInvestor: [],
    paramId: 0,
    investorCode: "",
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
    this.paramId = parseInt(this.$route.params.id);
    console.log("Mounted update investorID = ", this.paramId)
    //this.getAllInvestments();
    this.testServer();
    this.getInvestorDetails()
  },
  watch: {},

  methods: {
    async setFormValues() {
      this.person = this.SelectedInvestor[0].person
      this.investorCode = this.SelectedInvestor[0].investor_acc_number
      this.linkedEmail = this.SelectedInvestor[0].linked_email
      this.mobile.phoneNumber = this.SelectedInvestor[0].investor_mobile

  // need to get the form details to savethem just put this method in both and copy data() - 25 minuteas bro

      console.log("this.investorCode = " , this.investorCode)
//  investorCode: "",
//     linkedEmail: "",

//     person: "",
//     buyers: 0,
//     buyersSwicth: 1,

//     investorInitials: "",
//     investorSurname: "",
//     investorIDNumber: "",

//     investorTwoCode: "",
//     investorTwoInitials: "",
//     investorTwoSurname: "",
//     investorTwoIDNumber: "",

//     companyName: "",
//     regNumber: "",

//     companyRepInitials: "",
//     companyRepSurname: "",
//     companyRepIDNumber: "",

//     contact: "",
//     contactEmail: "",
//     contactTwoEmail: "",

//     streetNo: "",
//     streetName: "",
//     addressSuburb: "",
//     province: "",
//     addressPostalCode: "",

//     boxNo: "",
//     postalSuburb: "",
//     postalCode: "",

//     bankName: "",
//     accountName: "",
//     branchCode: "",
//     accountNumber: "",

//     ficaDate: "",

//     investorOneDisclaimerFile: "",
//     investorOneIDFile: null,
//     investorOnePOAFile: null,

//     investorTwoDisclaimerFile: null,
//     investorTwoIDFile: null,
//     investorTwoPOAFile: null,

//     representativeDisclaimerFile: null,
//     representativeIDFile: null,
//     representativePOAFile: null,
//     companyResolutionFile: null,
//     companyRefDocsFile: null,
//     companyPOAFile: null,

//     mobile: {
//       countryCode: "ZA",
//       isValid: false,
//       phoneNumber: "",
//       phoneNumberTwo: "",
//     },
//     landline: {
//       countryCode: "ZA",
//       isValid: false,
//       phoneNumber: "",
//       phoneNumberTwo: "",
//     },

//     snackbar: false,
//     snackbarMessage: "",
//     checkbox: false,
    },
    async getInvestorDetails() {
      let data = {
        id: 1, // use the $store.developement.id
        paramId: this.paramId,
      };
      console.log(data);
      await axios({
        method: "post",
        url: `${url}/getInvestorDetails`, // use store url
        data: data,
      })
        .then(
          (response) => {
            response.data.forEach((investor) => {
              this.SelectedInvestor.push(investor);
             // this.InvestorCode = investment.investor_acc_number;
            });
            console.log("this.SelectedInvestor List = ", this.SelectedInvestor);
            // use a method here to set the local properties for v-models setFormValues()
           // this.setFormValues() // this.InvestorName = this.SelectedInvestor.investor_name etc 
           this.setFormValues()
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

    async updateInvestor() {
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
        url: `${url}/updateInvestor`,
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
