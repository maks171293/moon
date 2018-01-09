<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate() {
    const lang = this.$route.path.split('/')[1];
    if (lang !== 'en' && lang !== 'de') {
      return;
    }
    this.$lang.setLang(lang);
    this.$cookie.set('lang', lang, { expires: '8h' });
  },
};
</script>

<style lang="scss">
  #app {
    height: 100vh;
    background: #eee;
    overflow-y: auto;
  }
  .btn {
    cursor: pointer;
  }
  .btn-light {
    background-color: #fff;
    color: transparentize(#000, 0.2);
    border-color: #f8f9fa;
    border-width: 1px;
    &:hover {
      background-color: #fff;
    }
  }

  .btn-form {
    border-color: #dae0e5;
    overflow: hidden;
  }

  .btn-clear {
    background-color: #fff;
    color: transparentize(#000, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .btn-round {
    display: inline-block;
    position: relative;
    width: 45px;
    min-width: 45px;
    height: 45px;
    padding: 0;
    overflow: hidden;
    box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
    border-radius: 45px;
    border: 0px;
    line-height: 45px;
    margin: 0 5px;
    background-clip: padding-box;
    transition: all .4s cubic-bezier(.25,.8,.25,1);
    transition-property: background-color,box-shadow,transform;

    i {
      display: block;
      position: absolute;
      top: 1px;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 50%;
      width: 18px;
      min-width: 18px;
      height: 18px;
      min-height: 18px;
      font-size: 18px;
      margin: auto;
      fill: currentColor;
      text-rendering: optimizeLegibility;
    }

    &:hover {
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px rgba(0,0,0,.14), 0 1px 14px rgba(0,0,0,.12);
    }
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
  .card {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-top: 30px;
    padding: 30px;

    &-error {
      color: crimson;
      p {
        margin: 0;
      }
    }
  }

  // Animation
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity 325ms ease-in;
  }
  .fade-leave-active {
    opacity: 0;
    transition: opacity 225ms ease-out;
  }

  .fade-down-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  .fade-down-enter-active {
    transition: all 125ms ease-in;
    transform: translateY(0);
  }
  .fade-down-leave-active {
    transition: all 225ms ease-out;
    opacity: 0;
    transform: translateY(10px);
  }
</style>
