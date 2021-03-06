<template>
  <div class="card w-100">
    <h2 class="card--title">{{$lang.labels.editCompany}}</h2>
    <transition name="fade">
      <div class="alert alert-success" v-if="success">
        <p>{{success}}</p>
      </div>
    </transition>
    <form class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="name">{{$lang.labels.name}}*</label>
          <input type="text" id="name" v-model="company.name" required class="form-control">
        </div>
        <div class="form-group">
          <label for="phone">{{$lang.labels.phone}}</label>
          <input type="text" id="phone" v-model="company.phone" class="form-control">
        </div>
        <div class="form-group">
          <label for="email">{{$lang.labels.email}}</label>
          <input type="email" id="email" v-model="company.email" class="form-control">
        </div>
        <div class="form-group">
          <label for="externalID">{{$lang.labels.externalID}}*</label>
          <input type="text" id="externalID" v-model="company.oosId" required class="form-control">
        </div>
        <div class="form-group">
          <label for="currency">{{$lang.labels.currency}}*</label>
          <select name="currency" id="currency" v-model="company.currency" required class="form-control">
            <option :value="currency" v-for="currency in currencies" :key="currency">{{currency}}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="status">{{$lang.labels.status}}*</label>
          <select name="status" id="status" v-model="company.companyStatus" required class="form-control">
            <option value="active">{{$lang.labels.active}}</option>
            <option value="inactive">{{$lang.labels.inactive}}</option>
          </select>
        </div>
        <div class="form-check">
          <label for="testMode" class="form-check-label">
            <input type="checkbox" id="testMode" class="form-check-input" v-model="company.test">
            {{$lang.labels.testMode}}</label>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="address1">{{$lang.labels.addressLine}} 1*</label>
          <input type="text" id="address1" v-model="company.address.line1" required class="form-control">
        </div>
        <div class="form-group">
          <label for="address2">{{$lang.labels.addressLine}} 2</label>
          <input type="text" id="address2" v-model="company.address.line2" class="form-control">
        </div>
        <div class="form-group">
          <label for="address3">{{$lang.labels.addressLine}} 3</label>
          <input type="text" id="address3" v-model="company.address.line3" class="form-control">
        </div>
        <div class="form-group">
          <label for="address4">{{$lang.labels.addressLine}} 4</label>
          <input type="text" id="address4" v-model="company.address.line4" class="form-control">
        </div>
        <div class="form-group">
          <label for="locality">{{$lang.labels.locality}}</label>
          <input type="text" id="locality" v-model="company.address.locality" class="form-control">
        </div>
        <div class="form-group">
          <label for="town">{{$lang.labels.townCity}}*</label>
          <input type="text" id="town" v-model="company.address.townCity" required class="form-control">
        </div>
        <div class="form-group">
          <label for="country">{{$lang.labels.country}}*</label>
          <input type="text" id="country" v-model="company.address.country" required class="form-control">
        </div>
        <div class="form-group">
          <label for="postalcode">{{$lang.labels.postalcode}}*</label>
          <input type="text" id="postalcode" v-model="company.address.postalCode" required class="form-control">
        </div>
      </div>
      <div class="alert alert-danger w-100" v-if="err">
        <p>{{err}}</p>
      </div>
      <div class="col-md-12">
        <router-link :to="`/${language}/company/list`">&#8249; {{$lang.actions.cancel}}</router-link>
        <input type="submit" class="btn" :value="$lang.actions.update" :class="{'btn-primary': !disabled, 'btn-disabled': disabled}" :disabled="disabled" @click.prevent="submit">
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        company: {
          id: null,
          oosId: null,
          phone: null,
          name: null,
          email: null,
          companyStatus: null,
          currency: null,
          test: true,
          address: {
            line1: null,
            line2: null,
            line3: null,
            line4: null,
            locality: null,
            townCity: null,
            country: null,
            postalCode: null,
          },
        },
        success: '',
        err: '',
        disabled: false,
        currencies: ['EUR', 'GBP'],
        language: this.$cookie.get('lang') || 'en',
      };
    },

    methods: {
      submit() {
        // Get the required fields
        const required = Array.from(this.$el.querySelectorAll('[required]'));
        this.err = '';

        // Filter through the required fields and return the empty ones
        const empty = required.filter((field) => {
          // Remove is-invalid class if present on the field
          field.classList.remove('is-invalid');

          // If fields has no value, return it to array and add is-invalid class
          if (field.value.length === 0) {
            field.classList.add('is-invalid');
            return field;
          }
          return false;
        });

        // If there are empty fields show error and return
        if (empty.length > 0) {
          this.err = this.$lang.errors.missingRequired;
          return;
        }

        // Post the form data
        this.$http.post(`company/update/${this.company.id}`, this.company)
          .then((res) => {
            if (res.body.status === 'Success') {
              this.success = res.body.statusText;
              setTimeout(() => {
                this.success = '';
              }, 3000);
              return;
            }
            // If response has fieldErrors array
            if (res.body.fieldErrors) {
              res.body.fieldErrors.forEach((field) => {
                this.err += field.message;
                this.err += '\n';
              });
              return;
            }
            this.err = res.body.statusText;
          }, (err) => {
            // If response has fieldErrors array
            if (err.body.fieldErrors) {
              err.body.fieldErrors.forEach((field) => {
                this.err += field.message;
                this.err += '\n';
              });
              return;
            }
            this.err = err.body.statusText || err.body.message;
          });
      },
    },

    created() {
      // Get company by id, if none return, disable submit button
      this.$http.get(`company/${this.$route.params.id}`)
        .then((res) => {
          if (res.body.status === 'Success') {
            this.company = res.body.company;
            return;
          }
          this.err = res.body.statusText || res.body.message;
          this.disabled = true;
        }, (err) => {
          this.err = err.body.statusText || err.body.message;
          this.disabled = true;
        });

      // Get currency list. If none returned, keep default values
      this.$http.get('system/currency')
        .then((res) => {
          if (res.body.status === 'Success') {
            this.currencies = res.body.currencies;
          }
        });
    },

    mounted() {
      // If route has query param new, show success message
      if (this.$route.query.new) {
        this.success = 'Company created successfuly!';
        setTimeout(() => {
          this.success = '';
        }, 3000);
      }
    },
  };
</script>

<style lang="scss" scoped>
  .btn-primary {
    margin-left: 15px;
  }
  .alert-danger p {
    white-space: pre-line;
  }
</style>
