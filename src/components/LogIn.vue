<template>
  <div class="row justify-content-center">
    <div class="col-md-6 login-image">
      <img src="~@/assets/images/dashboard-bg.jpg" alt="">
    </div>
    <div class="col-md-6 login">
      <div>
        <h1>{{$lang.global.projectName}}</h1>
        <div class="form-error aler alert-danger" v-if="err">
          <p>{{err}}</p>
        </div>
        <form>
          <div class="form-group">
            <input type="text" class="form-control" name="userName" v-model="formData.userName" :placeholder="$lang.labels.username">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" name="password" v-model="formData.password" :placeholder="$lang.labels.password">
          </div>
          <div class="form-group">
            <input type="submit" :value="$lang.actions.submit" class="btn btn-primary" @click.prevent="submit">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth/index';

  export default {
    data() {
      return {
        formData: {
          userName: '',
          password: '',
        },
        err: '',

      };
    },
    methods: {
      submit() {
        this.err = '';
        // Check if Username/Password are empty
        if (this.formData.userName.length === 0) {
          this.err = this.$lang.errors.missingUsername;
          return;
        }
        if (this.formData.password.length === 0) {
          this.err = this.$lang.errors.missingPassword;
          return;
        }
        // Authenticate user
        auth.login(this, this.formData, (err, res) => {
          if (err) {
            this.err = err.body.statusText;
            return;
          }
          // Check if status not Failed, if so redirect
          if (res.body.status !== 'Failed') {
            this.$router.push({ name: 'home' });
            return;
          }
          this.err = res.body.statusText;
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .col-md-6 {
    padding: 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    background-color: white;

    & > div {
      width: 50%;
      min-width: 340px;
    }
  }
  .row {
    height: 100%;
  }
  .form-error {
    padding: 10px 15px;
    margin: 15px 0;

    p {
      margin: 0;
    }
  }
  .login-image {
    position: relative;
    background: #007bff;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: auto;
      min-width: 100%;
      opacity: 0.6;
    }
  }
  h1 {
    margin-bottom: 15px;
  }
  @media only screen and (max-width: 992px) {
    .col-md-6:first-of-type {
      display: none;
    }
  }
</style>
