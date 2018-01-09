// jshint esversion: 6
import cookie from 'vue-cookie';

export default {
  userData: {
    isLoggedIn: false,
    expires: '8h',
  },

  // Post form data for auth
  login(vm, authData, cb) {
    if (process.env.NODE_ENV === 'production') {
      vm.$http.post('login', authData)
        .then((res) => {
          // Save uuid to Cookie
          vm.$cookie.set('uuid', res.body.sessionId, { expires: this.expires });
          this.userData.isLoggedIn = true;
          cb(null, res);
        }, (err) => {
          cb(err, null);
        });
    } else {
      vm.$cookie.set('uuid', '5a22a0c5e4b01e55fe550f4e', { expires: this.expires });
      this.userData.isLoggedIn = true;
      const res = {};
      res.body = {};
      res.body.status = 'Success';
      cb(null, res);
    }
  },

  // Removes uuid, which logs the user out
  logout() {
    cookie.delete('uuid');
    this.userData.isLoggedIn = false;
  },

  // Check if uuid exists
  isLoggedIn() {
    const id = cookie.get('uuid');
    if (id) {
      this.userData.isLoggedIn = true;
    } else {
      this.userData.isLoggedIn = false;
    }
    return this.userData.isLoggedIn;
  },
};
