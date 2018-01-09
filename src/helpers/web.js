class Helpers {
  constructor(vm) {
    this.vm = vm;
  }

  async get(url, data) {
    try {
      const res = await this.vm.$http.get(url, data);
      return res;
    } catch (err) {
      this.setError(err);
      return false;
    }
  }

  async post(url, data) {
    try {
      const res = await this.vm.$http.post(url, data);
      if (res.status !== 200) {
        this.setError(res);
      }
      return res;
    } catch (err) {
      this.setError(err);
      return false;
    }
  }

  setError(res) {
    if (res.body) {
      this.vm.err = res.body.statusText || res.body.message;
    } else {
      this.vm.err = 'Failed to make api call.';
    }
  }

  setSuccess(msg, interval) {
    this.vm.success = msg;
    if (interval) {
      setInterval(() => {
        this.vm.success = '';
      }, interval);
    }
  }
}

export default Helpers;
