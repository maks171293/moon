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
        <router-link :to="`/${language}/catalog/create`">{{$lang.actions.createCatalog}}</router-link>
        <div class="form-group">
          <input type="text" :placeholder="$lang.labels.catalogFilter" @keyup="filterArray" v-model="filter" class="form-control">
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>{{$lang.labels.modified}}</th>
              <th>{{$lang.labels.status}}</th>
              <th>{{$lang.labels.actions}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(catalog, index) in catalogs" :key="index">
              <td>{{catalog.id}}</td>
              <td>{{catalog.modifiedOn}}</td>
              <td>{{catalog.status}}</td>
              <td>
                <button class="btn btn-round btn-primary" @click="editCatalog(catalog.id)"><i class="material-icons">edit</i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>  
</template>

<script>
  // import WebHelpers from '../../helpers/web';
  // import dateHelpers from '../../helpers/date';

  // let webHelpers;
  import * as fetch_data from '../../assets/fetch_data'
  export default {
    data() {
      return {
        err: '',
        success: '',
        filter: '',
        catalogs: [],
        language: this.$cookie.get('lang') || 'en',
      };
    },
    methods: {
      filterArray() {
      },
      fetchAllCatalogs(){
        fetch('https://qasun2.onmapos.com/sunbackend/catalog/getall', {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
        }).then(function(response) {
          return response.json();
        }).then(function(data) {
          this.catalogs = data.catalogs
        }).catch((e)=>{
          this.catalogs = fetch_data.catalogs
        });
      },
      fetchCatalog() {
        fetch('https://qasun2.onmapos.com/sunbackend/catalog/5a0a2f4ee4b0c02db81529e9', {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
        }).then(function(response) {
          return response.json();
        }).then(function(data) {
          console.log('response login', data)
        }).catch((e)=>{
          console.log('fetch catalog is wasted')
        })
      },
      editCatalog(id) {
        console.log('laalala', id);
        this.$router.push({ name: "catalogCreate", params: { id: id } });
      }
    },
    created(){
      this.fetchAllCatalogs()
    }
    /* async created() {
      webHelpers = new WebHelpers(this);
      const res = await webHelpers.post('catalog/getall', {});
      if (res.status === 200) {
        this.catalogs = res.body.catalogs.map((current) => {
          const catalog = current;
          catalog.modifiedOn = dateHelpers.formatDate(catalog.modifiedOn);
          return catalog;
        });
      }
    }, */
  };
</script>

<style>

</style>
