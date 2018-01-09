<template>
  <div class="row">
    <div class="card w-100">
      <div class="alert alert-danger" v-if="err">
        <p>{{err}}</p>
      </div>
      <transition name="fade">
        <div class="alert alert-success" v-if="success">
          <p>{{success}}</p>
        </div>
      </transition>
      <div class="card-actions d-flex justify-content-between">
        <router-link :to="`/${language}/company/create`">{{$lang.actions.createCompany}}</router-link>
        <div class="form-group">
          <input type="text" :placeholder="$lang.labels.filter" @keyup="filterArray" v-model="filter" class="form-control">
        </div>
      </div>
      <table class="table table-responsive table-striped table-bordered">
        <thead>
          <tr>
            <th @click="sortedArray($event, 'name')">{{$lang.labels.name}}</th>
            <th @click="sortedArray($event, 'currency')">{{$lang.labels.currency}}</th>
            <th @click="sortedArray($event, 'companyStatus')">{{$lang.labels.status}}</th>
            <th>{{$lang.labels.actions}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(company, index) in companyArray" :key="index">
            <td>{{company.name}}</td>
            <td>{{company.currency}}</td>
            <td><span v-if="company.companyStatus === 'active'">{{$lang.labels.active}}</span><span v-else>$lang.labels.inactive</span></td>
            <td>
              <router-link :to="`/${language}/company/${company.id}/edit`">{{$lang.actions.edit}}</router-link> | 
              <template v-if="company.companyStatus !== 'active'">
                <a href="#" @click.prevent="activateCompany(company.id, index)">{{$lang.actions.activate}}</a>
              </template>
              <template v-else>
                <a href="#" @click.prevent="deactivateCompany(company.id, index)">{{$lang.actions.deactivate}}</a>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        companies: [],
        filtered: [],
        filter: '',
        err: '',
        success: '',
        language: this.$cookie.get('lang') || 'en',
      };
    },

    methods: {
      sortedArray(event, sortBy) {
        // Get all table headers
        const th = Array.from(event.path[1].children);

        // Check should the sorting be inversed
        let inverse = !event.target.classList.contains('inverse');

        th.forEach((child) => {
          if (child !== event.target) {
            // Remove classes unless it's the target
            child.classList.remove('active', 'inverse');
          }
        });
        if (event.target.classList.contains('active')) {
          // If already active, add inverse
          event.target.classList.toggle('inverse');
        } else {
          // Add active and make inverse false
          event.target.classList.add('active');
          inverse = false;
        }

        // Simple comparison
        function compare(a, b) {
          const first = inverse ? b : a;
          const second = inverse ? a : b;
          if (first[`${sortBy}`] < second[`${sortBy}`]) {
            return -1;
          }
          if (first[`${sortBy}`] > second[`${sortBy}`]) {
            return 1;
          }
          return 0;
        }
        // Sort the array
        this.companies.sort(compare);
      },

      filterArray() {
        // Select table headers and remove active class for sorting
        const th = Array.from(this.$el.querySelectorAll('th'));
        th.forEach((child) => {
          child.classList.remove('active');
        });

        // Filter through company names, compare with the filter input
        this.filtered = this.companies.filter(company =>
          company.name.toLowerCase().includes(this.filter.toLowerCase()));
      },

      activateCompany(id, index) {
        this.err = '';
        this.$http.post(`company/activate/${id}`)
          .then((res) => {
            // If successful, mark status as active and show success message. Else, show the error
            if (res.body.status === 'Success') {
              this.companies[index].companyStatus = 'active';
              this.success = 'Company activated successfully!';
              setTimeout(() => {
                this.success = '';
              }, 3000);
              return;
            }
            this.err = res.body.statusText;
          }, (err) => {
            this.err = err.body.statusText || err.body.message;
          });
      },

      deactivateCompany(id, index) {
        this.err = '';
        this.$http.post(`company/deactivate/${id}`)
          .then((res) => {
            if (res.body.status === 'Success') {
            // If successful, mark status as inactive and show success message. Else, show the error
              this.companies[index].companyStatus = 'inactive';
              this.success = 'Company deactivated successfully!';
              setTimeout(() => {
                this.success = '';
              }, 3000);
              return;
            }
            this.err = res.statusText;
          }, (err) => {
            this.err = err.body.statusText || err.body.message;
          });
      },
    },

    computed: {
      companyArray() {
        // Computed property for the array. Show company array if user is not filtering.
        return this.filter.length > 0 ? this.filtered : this.companies;
      },
    },

    created() {
      // Get company list
      this.$http.get('company')
        .then((res) => {
          if (res.body.status === 'Success') {
            this.companies = res.body.companies;
            return;
          }
          this.err = res.body.statusText;
        }, (err) => {
          this.err = err.body.statusText || err.body.message;
        });
    },
  };
</script>

<style lang="scss" scoped>
  th {
    &:not(:last-child):after{
      display: inline;
      position: relative;
      content: "\25B4";
      margin-left: 5px;
    }
    
    &.active:not(.inverse):after {
      content: "\25BE";
    }
  }
</style>
