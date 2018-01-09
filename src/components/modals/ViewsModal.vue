<template>
  <div class="modal" @click="$emit('close')">
    <div class="modal-dialog" role="document" @click.stop>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit View</h5>
          <button type="button" class="close" data-dismiss="modal" @click="$emit('close')" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="err" v-if="err"><i class="material-icons">warning</i> {{err}}</div>
          <div class="table-responsive" v-else>
            <table class="table table-hover table-bordered table-striped">
              <thead>
                <tr>
                  <td>Language</td>
                  <td>Name</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in view.names" :key="index">
                  <td>{{item.language}}</td>
                  <td><input type="text" :value="item.name" @input="item.name = $event.target.value" class="form-control"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>  
        <div class="modal-footer">
          <div class="dropdown"
            v-if="languages.length > 0"
            @click="$event.currentTarget.children[1].classList.toggle('show')">
            <button class="btn btn-light w-100 dropdown-toggle" type="button">Add language</button>
            <ul class="dropdown-menu">
              <li 
                class="dropdown-item" 
                v-for="(lang, index) in languages"
                :key="index"
                v-if="lang !== language"
                @click="addLang(lang, index)">{{lang}}
              </li>
            </ul>
          </div>
          <button class="btn btn-primary" @click="submit()">Submit</button>
        </div>      
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['edit'],
    data() {
      return {
        err: '',
        language: this.$cookie.get('lang') || 'en',
        languages: [
          'de',
        ],
        view: {
          names: [
            {
              language: this.$cookie.get('lang') || 'en',
              name: '',
            },
          ],
        },
        isEdit: false,
      };
    },
    methods: {
      addLang(lang, langIndex) {
        this.view.names.push({
          language: lang,
          name: '',
        });
        this.languages.splice(langIndex, 1);
      },
      submit() {
        const view = {};
        view.name = {};
        this.view.names.forEach((entry) => {
          if (entry.name !== '') {
            view.name[entry.language] = entry.name;
          }
        });
        if (this.isEdit) {
          const index = this.edit.index;
          this.$emit('update', {
            view,
            index,
          });
        } else {
          this.$emit('submit', view);
        }
        this.$emit('close');
      },
    },
    created() {
      if (this.edit) {
        this.isEdit = true;
        const view = this.edit.view;
        const languages = Object.keys(view.name);
        this.view.names = [];
        languages.forEach((language) => {
          let index = null;
          this.view.names.push({
            language,
            name: view.name[language],
          });
          this.languages.forEach((lang, i) => {
            if (lang === language) {
              index = i;
            }
          });
          if (index !== null) {
            this.languages.splice(index, 1);
          }
        });
      }
    },
  };
</script>

<style lang="scss" scoped>
  .err {
    color: crimson;
    font-size: 16px;
    padding: 15px;
    padding-top: 0;
  }
  .modal {
    display: block;
    background: rgba(0, 0, 0, 0.5);

    &-body {
      max-height: 80vh;
      overflow-y: auto;
    }
  }
  @media (min-width: 576px) {
    .modal-dialog {
        max-width: 70%;
    }
  }

</style>
