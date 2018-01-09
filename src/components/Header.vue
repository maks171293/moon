<template>
  <div class="header-wrap w-100">
    <header class="d-flex justify-content-between">
        <div>
          <h2>{{$lang.global.projectName}}</h2>
        </div>
        <nav>
          <ul class="nav">
            <li class="nav-item" v-for="(item, index) in menu" :key="index">
              <router-link :to="`/${language}${item.path}`" active-class="active" class="nav-link">{{$lang.header[item.title]}}</router-link>
            </li>
          </ul>
        </nav>
        <div>
          <p>User XYZ</p>
          <router-link v-if="isLoggedIn" to="/log-out">{{$lang.header.logout}}</router-link>
          <div class="d-inline-block dropdown">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" @click="openLang = !openLang">
              {{language}}
            </button>
            <ul class="dropdown-menu" :class="{'show': openLang}">
              <li class="dropdown-item" v-for="lang in languages" :key="lang" @click="changeLang(lang)" v-if="lang !== language">{{lang}}</li>
            </ul>
          </div>
        </div>
    </header>
  </div>
</template>

<script>
  import auth from '@/auth/index';

  export default {
    data() {
      return {
        menu: [
          {
            path: '/company/list',
            title: 'companies',
          },
          {
            path: '/accounts',
            title: 'accounts',
          },
          {
            path: '/printers',
            title: 'printers',
          },
          {
            path: '/catalog',
            title: 'catalogs',
          },
        ],
        openLang: false,
        language: this.$cookie.get('lang') || 'en',
        languages: ['en', 'de'],
        isLoggedIn: auth.isLoggedIn(),
      };
    },
    methods: {
      // Set language and add to cookie, then change route
      changeLang(lang) {
        this.language = lang;
        this.$lang.setLang(lang);
        this.$cookie.set('lang', lang, { expires: '8h' });
        this.openLang = !this.openLang;
        this.$router.push({ name: this.$route.name, params: { lang } });
      },
    },
  };
</script>

<style lang="scss" scoped>
  header {
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  p, a {
    padding: .5rem 1rem;
  }
  p {
    display: inline-block;
  }
  h2 {
    font-size: 36px;
  }
  .header-wrap {
    position: relative;
    background: #007bff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    z-index: 10;
    
    .nav-link.active {
      color: #fff;
    }
    .nav-link, h2, a, p {
      color: #fff;
    }
    h2 {
      margin-bottom: 0;
    }
    .dropdown-item {
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 992px) {
    header .row {
      text-align: center;
    }
    .header-wrap h2 {
      margin-bottom: 15px;
    }
    ul {
      display: block;
    }
    li {
      display: inline-block
    }
  }
</style>
