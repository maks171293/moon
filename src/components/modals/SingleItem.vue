<template>
  <div class="modal" @click="$emit('close')">
    <div class="modal-dialog" role="document" @click.stop>
      <div class="modal-content">
        <transition name="fade" mode="out-in">
          <main v-if="!details && !editViews && !editPrinter">
            <div class="modal-header">
              <h5 class="modal-title">Add item</h5>
              <button type="button" class="close" data-dismiss="modal" @click="$emit('close')" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="err" v-if="err"><i class="material-icons">warning</i> {{err}}</div>
              <div class="row">
                <div class="col-md-12 mb-3">
                  <input class="form-control" type="number" placeholder="VAT rate" v-bind="vatRate" />
                </div>
                <div class="col-md-12 mb-3">
                  <h3 class="d-inline-block mb-3 mr-3">Views</h3>
                  <button class="btn btn-round btn-primary" v-if="selectedViews.length === 0" @click="editViewsToggle"><i class="material-icons d-inline-block">add</i></button>
                  <button class="btn btn-round btn-primary" v-else @click="editViewsToggle"><i class="material-icons d-inline-block">edit</i></button>
                  <div class="views mt-3 p-3" v-if="selectedViews.length > 0">
                    <ul class="p-0 m-0">
                      <li class="btn btn-clear mr-2" v-for="index in selectedViews" :key="index">
                        <p>{{views[index].name[language]}}</p>
                      </li>
                    </ul>
                  </div>                
                </div>
                <div class="col-md-12 mb-3">
                  <h3 class="d-inline-block mb-3 mr-3">Printer categories</h3>
                  <button class="btn btn-round btn-primary" v-if="selectedPrinters.length === 0" @click="editPrinterToggle()"><i class="material-icons d-inline-block">add</i></button>
                  <button class="btn btn-round btn-primary" v-else @click="editPrinterToggle()"><i class="material-icons d-inline-block">edit</i></button>
                  <div class="views mt-3 p-3" v-if="selectedPrinters.length > 0">
                    <ul class="p-0 m-0">
                      <li class="btn btn-clear mr-2" v-for="(category, index) in selectedPrinters" :key="index">
                        <p>{{category}}</p>
                      </li>
                    </ul>
                  </div>                   
                </div>
                <div class="col-md-6 mb-3">
                  <div class="table-responsive">
                    <div class="mb-3">
                      <h3 class="d-inline-block mr-3">Abbreviation</h3>
                      <button class="btn btn-round btn-primary" v-if="abbr === null" @click="openDetails('Abbreviation', 'abbr')"><i class="material-icons d-inline-block">add</i></button>
                      <button class="btn btn-round btn-primary" v-else @click="editItem('Abbreviation', 'abbr')"><i class="material-icons d-inline-block">edit</i></button>
                    </div>
                    <table class="table table-hover table-striped table-bordered" v-if="abbr !== null">
                      <thead>
                        <tr>
                          <td>Language</td>
                          <td>Name</td>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="(lang, index) in languages">
                          <tr v-if="abbr && abbr.name[lang]" :key="index">
                            <td>{{lang}}</td>
                            <td>{{abbr.name[lang]}}</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="table-responsive">
                    <div class="mb-3">
                      <h3 class="d-inline-block mr-3">Name</h3>
                      <button class="btn btn-round btn-primary" v-if="name === null" @click="openDetails('Name', 'name')"><i class="material-icons d-inline-block">add</i></button>
                      <button class="btn btn-round btn-primary" v-else @click="editItem('Name', 'name')"><i class="material-icons d-inline-block">edit</i></button>
                    </div>
                    <table class="table table-hover table-striped table-bordered" v-if="name !== null">
                      <thead>
                        <tr>
                          <td>Language</td>
                          <td>Name</td>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="(lang, index) in languages">
                          <tr v-if="name && name.name[lang]" :key="index">
                            <td>{{lang}}</td>
                            <td>{{name.name[lang]}}</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="table-responsive">
                    <div class="mb-3">
                      <h3 class="d-inline-block mr-3">Description</h3>
                      <button class="btn btn-round btn-primary" v-if="desc === null" @click="openDetails('Description', 'desc')"><i class="material-icons d-inline-block">add</i></button>
                      <button class="btn btn-round btn-primary" v-else @click="editItem('Description', 'desc')"><i class="material-icons d-inline-block">edit</i></button>
                    </div>
                    <table class="table table-hover table-striped table-bordered" v-if="desc !== null">
                      <thead>
                        <tr>
                          <td>Language</td>
                          <td>Name</td>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="(lang, index) in languages">
                          <tr v-if="desc && desc.name[lang]" :key="index">
                            <td>{{lang}}</td>
                            <td>{{desc.name[lang]}}</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="table-responsive">
                    <div class="mb-3">
                      <h3 class="d-inline-block mr-3">Sizes</h3>
                      <button class="btn btn-round btn-primary" v-if="sizes.length === 0" @click="openDetails('Sizes', 'sizes')"><i class="material-icons d-inline-block">add</i></button>
                      <button class="btn btn-round btn-primary" v-else @click="editItem('Sizes', 'sizes')"><i class="material-icons d-inline-block">edit</i></button>
                    </div>
                    <table class="table table-hover table-striped table-bordered" v-if="sizes.length !== 0">
                      <thead>
                        <tr>
                          <td>Language</td>
                          <td>Name</td>
                        </tr>
                      </thead>
                      <tbody class="multiple" v-for="(size, index) in sizes" :key="index">
                        <template colspan="2" v-for="(lang, langIndex) in languages">
                          <tr v-if="size.name[lang]" :key="langIndex">
                            <td>{{lang}}</td>
                            <td>{{size.name[lang]}}</td>
                          </tr>
                        </template>
                        <tr>
                          <th>Price</th>
                          <td>{{size.price}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="table-responsive">
                    <div class="mb-3">
                      <h3 class="d-inline-block mr-3">Options</h3>
                      <button class="btn btn-round btn-primary" v-if="options.length === 0" @click="openDetails('Options', 'options')"><i class="material-icons d-inline-block">add</i></button>
                      <button class="btn btn-round btn-primary" v-else @click="editItem('Options', 'options')"><i class="material-icons d-inline-block">edit</i></button>
                    </div>
                    <table class="table table-hover table-striped table-bordered" v-if="options.length !== 0">
                      <thead>
                        <tr>
                          <td>Language</td>
                          <td>Name</td>
                        </tr>
                      </thead>
                      <tbody class="multiple" v-for="(option, index) in options" :key="index">
                        <template colspan="2" v-for="(lang, langIndex) in languages">
                          <tr v-if="option.name[lang]" :key="langIndex">
                            <td>{{lang}}</td>
                            <td>{{option.name[lang]}}</td>
                          </tr>
                        </template>
                        <tr>
                          <th>Price</th>
                          <td>{{option.price}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="table-responsive">
                    <div class="mb-3">
                      <h3 class="d-inline-block mr-3">Styles</h3>
                      <button class="btn btn-round btn-primary" v-if="styles.length === 0" @click="openDetails('Styles', 'styles')"><i class="material-icons d-inline-block">add</i></button>
                      <button class="btn btn-round btn-primary" v-else @click="editItem('Styles', 'styles')"><i class="material-icons d-inline-block">edit</i></button>
                    </div>
                    <table class="table table-hover table-striped table-bordered" v-if="styles.length !== 0">
                      <thead>
                        <tr>
                          <td>Language</td>
                          <td>Name</td>
                        </tr>
                      </thead>
                      <tbody class="multiple" v-for="(style, index) in styles" :key="index">
                        <template colspan="2" v-for="(lang, langIndex) in languages">
                          <tr v-if="style.name[lang]" :key="langIndex">
                            <td>{{lang}}</td>
                            <td>{{style.name[lang]}}</td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="table-responsive">
                    <div class="mb-3">
                      <h3 class="d-inline-block mr-3">Variants</h3>
                      <button class="btn btn-round btn-primary" v-if="variants.length === 0" @click="openDetails('Variants', 'variants')"><i class="material-icons d-inline-block">add</i></button>
                      <button class="btn btn-round btn-primary" v-else @click="editItem('Variants', 'variants')"><i class="material-icons d-inline-block">edit</i></button>
                    </div>
                    <table class="table table-hover table-striped table-bordered" v-if="variants.length !== 0">
                      <thead>
                        <tr>
                          <td>Language</td>
                          <td>Name</td>
                        </tr>
                      </thead>
                      <tbody v-for="(variant, index) in variants" :key="index">
                        <template colspan="2" v-for="(lang, langIndex) in languages">
                          <tr v-if="variant.name[lang]" :key="langIndex">
                            <td>{{lang}}</td>
                            <td>{{variant.name[lang]}}</td>
                          </tr>
                        </template>
                        <tr>
                          <th>Price</th>
                          <td>{{variant.price}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label 
                    class="checkbox d-block"
                    :class="{'is-checked': labelPrint}">
                    <div @click="labelPrint = !labelPrint">
                      <span></span>
                      Label print
                    </div>
                  </label>   
                  <label 
                    class="checkbox d-block"
                    :class="{'is-checked': askDetails}">
                    <div @click="askDetails = !askDetails">
                      <span></span>
                      Ask details
                    </div>
                  </label>                  
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" @click="submitItem()">Submit</button>
            </div>
          </main>
        </transition>
        <transition name="fade" mode="out-in">
          <div class="description" v-if="details">
            <div class="modal-header">
              <h5 class="modal-title">Edit {{currentLabel}}</h5>
              <button type="button" class="close" data-dismiss="modal" @click="closeEdit()" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="err" v-if="err"><i class="material-icons">warning</i> {{err}}</div>
              <div v-if="hasMultiple">
                <div class="single-item mb-3" v-for="(edit, index) in currentEdit" :key="index">
                  <div class="table-responsive">
                    <table class="table table-hover table-bordered table-striped">
                      <thead>
                        <tr>
                          <td>Language</td>
                          <td>Name</td>
                          <td>Actions</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index2) in edit.names" :key="index2">
                          <td>{{item.language}}</td>
                          <td><input type="text" :value="item.name" @input="item.name = $event.target.value" class="form-control"></td>
                          <td><button class="btn btn-danger btn-round" @click="removeLang(index, index2)"><i class="material-icons">delete</i></button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="form-group clearfix">
                    <div class="dropdown float-left"
                      v-if="edit.languages.length > 0"
                      @click="$event.currentTarget.children[1].classList.toggle('show')">
                      <button class="btn btn-clear w-100 dropdown-toggle" type="button">Add language</button>
                      <ul class="dropdown-menu">
                        <li 
                          class="dropdown-item" 
                          v-for="(lang, langIndex) in edit.languages"
                          :key="langIndex"
                          @click="addEditLang(lang, langIndex, index)">{{lang}}
                        </li>
                      </ul>
                    </div>
                    <button class="btn btn-danger float-right" @click="removeEdit(index)">Delete item</button>
                  </div>

                  <div class="form-group" v-if="hasPrice">
                    <input type="number" class="form-control" v-model="edit.price" placeholder="Price">
                  </div>
                </div>
              </div>
              <div class="table-responsive" v-else>
                <table class="table table-hover table-bordered table-striped">
                  <thead>
                    <tr>
                      <td>Language</td>
                      <td>Name</td>
                      <td>Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in currentEdit[0].names" :key="index">
                      <td>{{item.language}}</td>
                      <td><input type="text" :value="item.name" @input="item.name = $event.target.value" class="form-control"></td>
                      <td><button class="btn btn-danger btn-round" @click="removeLang(0, index)"><i class="material-icons">delete</i></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>  
            <div class="modal-footer">
              <button class="btn btn-primary btn-round" @click="addEdit()" v-if="hasMultiple"><i class="material-icons">add</i></button>
              <div class="dropdown"
                v-if="!hasMultiple && currentEdit[0].languages.length > 0"
                @click="$event.currentTarget.children[1].classList.toggle('show')">
                <button class="btn btn-light w-100 dropdown-toggle" type="button">Add language</button>
                <ul class="dropdown-menu">
                  <li 
                    class="dropdown-item" 
                    v-for="(lang, index) in currentEdit[0].languages"
                    :key="index"
                    @click="addEditLang(lang, index)">{{lang}}
                  </li>
                </ul>
              </div>
              <button class="btn btn-primary" @click="submitEdit()">Submit</button>
            </div>        
          </div>
        </transition>
        <transition name="fade" mode="out-in">
          <div class="description" v-if="editViews">
            <div class="modal-header">
              <h5 class="modal-title">Edit Views</h5>
              <button type="button" class="close" data-dismiss="modal" @click="closeViews()" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul class="p-0 m-0">
                <li class="d-inline-block px-3 mr-2" v-for="(view, index) in catalogViews" :key="index">
                  <label 
                    class="checkbox"
                    :class="{'is-checked': view.selected}">
                    <div @click="check('catalogViews', index)">
                      <span></span>
                      {{view.name[language]}}
                    </div>
                  </label>
                </li>
              </ul>
            </div>  
            <div class="modal-footer">
              <button class="btn btn-primary" @click="submitViews()">Submit</button>
            </div>        
          </div>
        </transition>
        <transition name="fade" mode="out-in">
          <div class="description" v-if="editPrinter">
            <div class="modal-header">
              <h5 class="modal-title">Edit Printer categories</h5>
              <button type="button" class="close" data-dismiss="modal" @click="closePrinter()" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul class="p-0 m-0">
                <li class="d-inline-block px-3 mr-2" v-for="(printerCategory, index) in catalogPrinters" :key="index">
                  <label 
                    class="checkbox"
                    :class="{'is-checked': printerCategory.selected}">
                    <div @click="check('catalogPrinters', index)">
                      <span></span>
                      {{printerCategory.name}}
                    </div>
                  </label>
                </li>
              </ul>
            </div>  
            <div class="modal-footer">
              <button class="btn btn-primary" @click="submitPrinters()">Submit</button>
            </div>        
          </div>
        </transition>        
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
  export default {
    props: ['views', 'items'],
    data() {
      return {
        err: '',
        details: false,
        editViews: false,
        editPrinter: false,
        abbr: null,
        name: null,
        desc: null,
        sizes: [],
        options: [],
        styles: [],
        variants: [],
        selectedViews: [],
        catalogViews: [],
        catalogPrinters: [],
        viewsInEdit: [],
        vatRate: null,
        currentLabel: null,
        currentTarget: null,
        hasPrice: false,
        hasMultiple: false,
        labelPrint: false,
        askDetails: false,
        language: this.$cookie.get('lang') || 'en',
        languages: [
          'en',
          'de',
        ],
        pricedItems: [
          'sizes',
          'options',
          'variants',
        ],
        multipleItems: [
          'sizes',
          'options',
          'variants',
          'styles',
        ],
        currentEdit: [
          {
            names: [
              {
                language: this.$cookie.get('lang') || 'en',
                name: '',
              },
            ],
            languages: [
              'de',
            ],
            price: '',
          },
        ],
        selectedPrinters: [],
        printerCategories: [
          'LABEL',
          'KITCHEN1',
          'KITCHEN2',
          'KITCHEN3',
          'KITCHEN4',
          'KITCHEN5',
          'BAR1',
          'BAR2',
          'BAR3',
          'BAR4',
          'BAR5',
          'SALAD1',
          'SALAD2',
          'SALAD3',
          'SALAD4',
          'SALAD5',
        ],
      };
    },
    methods: {
      openDetails(label, target) {
        this.currentLabel = label;
        this.currentTarget = target;
        this.hasPrice = this.pricedItems.includes(target);
        this.hasMultiple = this.multipleItems.includes(target);
        this.details = true;
      },
      addEditLang(lang, langIndex, index) {
        const editIndex = this.hasMultiple ? index : 0;
        this.currentEdit[editIndex].names.push({
          language: lang,
          name: '',
        });
        this.currentEdit[editIndex].languages.splice(langIndex, 1);
      },
      removeEdit(index) {
        this.currentEdit.splice(index, 1);
      },
      removeLang(index, langIndex) {
        const name = this.currentEdit[index].names[langIndex].language;
        this.currentEdit[index].names.splice(langIndex, 1);
        this.currentEdit[index].languages.push(name);
      },
      addEdit() {
        this.currentEdit.push({
          names: [
            {
              language: this.$cookie.get('lang') || 'en',
              name: '',
            },
          ],
          languages: [
            'de',
          ],
          price: '',
        });
      },
      editPrinterToggle() {
        this.catalogPrinters = this.catalogPrinters.map((current) => {
          let found = false;
          this.selectedPrinters.forEach((printer) => {
            if (current.name === printer) {
              found = true;
            }
          });
          const printer = current;
          printer.selected = found;
          return printer;
        });
        this.editPrinter = true;
      },
      editViewsToggle() {
        this.catalogViews = this.catalogViews.map((current, index) => {
          let found = false;
          this.selectedViews.forEach((i) => {
            if (index === i) {
              found = true;
            }
          });
          const view = current;
          view.selected = found;
          return view;
        });
        this.editViews = true;
      },
      closePrinter() {
        this.catalogPrinters = this.catalogPrinters.map((current) => {
          const printer = current;
          printer.selected = false;
          return printer;
        });
        this.editPrinter = false;
      },
      closeViews() {
        this.catalogViews = this.catalogViews.map((current) => {
          const view = current;
          view.selected = false;
          return view;
        });
        this.editViews = false;
      },
      closeEdit() {
        this.err = '';
        this.currentEdit = [
          {
            names: [
              {
                language: this.$cookie.get('lang') || 'en',
                name: '',
              },
            ],
            languages: [
              'de',
            ],
            price: '',
          },
        ];
        this.details = false;
      },
      check(list, index) {
        this[list][index].selected = !this[list][index].selected;
        this.$forceUpdate();
      },
      submitViews() {
        const views = [];
        this.catalogViews.forEach((view, index) => {
          if (view.selected) {
            views.push(index);
          }
        });
        this.selectedViews = views;
        this.editViews = false;
      },
      submitPrinters() {
        const printers = [];
        this.catalogPrinters.forEach((printer) => {
          if (printer.selected) {
            printers.push(printer.name);
          }
        });
        this.selectedPrinters = printers;
        this.editPrinter = false;
      },
      editItem(label, target) {
        this.currentLabel = label;
        this.currentTarget = target;
        this.hasPrice = this.pricedItems.includes(target);
        this.hasMultiple = this.multipleItems.includes(target);
        if (this.hasMultiple) {
          const edits = [];
          this[target].forEach((entry) => {
            const langs = Object.keys(entry.name);
            const foundLangs = [];
            const names = [];
            const edit = {};
            langs.forEach((lang) => {
              const name = {
                language: lang,
                name: entry.name[lang],
              };
              names.push(name);
              this.languages.forEach((available, index) => {
                if (available === lang) {
                  foundLangs.push(index);
                }
              });
            });
            Object.assign(edit, { names });
            const editLangs = this.languages.filter((lang, index) => {
              let found = false;
              foundLangs.forEach((i) => {
                if (index === i) {
                  found = true;
                }
              });
              if (!found) {
                return lang;
              }
              return false;
            });
            Object.assign(edit, { languages: editLangs });
            if (this.hasPrice) {
              Object.assign(edit, { price: entry.price });
            }
            edits.push(edit);
          });
          this.currentEdit = edits;
        } else {
          const entry = this[target];
          const langs = Object.keys(entry.name);
          const foundLangs = [];
          const names = [];
          const edit = {};
          langs.forEach((lang) => {
            const name = {
              language: lang,
              name: entry.name[lang],
            };
            names.push(name);
            this.languages.forEach((available, index) => {
              if (available === lang) {
                foundLangs.push(index);
              }
            });
          });
          Object.assign(edit, { names });
          const editLangs = this.languages.filter((lang, index) => {
            let found = false;
            foundLangs.forEach((i) => {
              if (index === i) {
                found = true;
              }
            });
            if (!found) {
              return lang;
            }
            return false;
          });
          Object.assign(edit, { languages: editLangs });
          if (this.hasPrice) {
            Object.assign(edit, { price: entry.price });
          }
          this.currentEdit = [edit];
        }
        this.details = true;
      },
      submitEdit() {
        const target = this.currentTarget;
        const result = [];
        let err = false;
        this.currentEdit.forEach((current) => {
          const edit = {};
          edit.name = {};
          if (current.price === '' && this.hasPrice) {
            this.err = 'You must enter a price for each item.';
            err = true;
          }
          current.names.forEach((entry) => {
            if (entry.name === '') {
              this.err = 'You must enter a name for each language on each item.';
              err = true;
            }
            edit.name[entry.language] = entry.name;
          });
          if (current.price) {
            edit.price = current.price;
          }
          if (!err) {
            result.push(edit);
          }
        });
        if (err) return;
        this[target] = result;
        this[target] = this.hasMultiple ? result : result[0];
        this.closeEdit();
      },
      submitItem() {
        this.err = '';
        const item = {};
        if (this.name === null || Object.keys(this.name.name).length === 0) {
          this.err = 'You must enter a name for the item.';
        } else {
          Object.assign(item, { name: this.name.name });
        }
        if (this.vatRate === null || isNaN(this.vatRate)) {
          this.err = 'You must enter a VAT rate.';
        } else {
          Object.assign(item, { vatRate: this.vatRate });
        }
        if (this.sizes.length === 0 ||
          (this.sizes[0].name === null || Object.keys(this.sizes[0].name).length === 0)) {
          this.err = 'You must enter at least one size.';
        } else {
          Object.assign(item, { sizes: this.sizes });
        }
        if (this.styles.length === 0 ||
          (this.styles[0].name === null || Object.keys(this.styles[0].name).length === 0)) {
          this.err = 'You must enter at least one style.';
        } else {
          Object.assign(item, { styles: this.styles });
        }
        if (this.options.length !== 0 &&
          (this.options[0].name !== null && Object.keys(this.options[0].name).length !== 0)) {
          Object.assign(item, { options: this.options });
        }
        if (this.options.length !== 0 &&
          (this.options[0].name !== null && Object.keys(this.options[0].name).length !== 0)) {
          Object.assign(item, { options: this.options });
        }
        if (this.variants.length !== 0 &&
          (this.variants[0].name !== null && Object.keys(this.variants[0].name).length !== 0)) {
          Object.assign(item, { variants: this.variants });
        }
        if (this.abbr !== null && Object.keys(this.abbr.name).length !== 0) {
          Object.assign(item, { abbr: this.abbr.name });
        }
        if (this.desc !== null && Object.keys(this.desc.name).length !== 0) {
          Object.assign(item, { desc: this.desc.name });
        }
        const settings = {
          askDetails: this.askDetails,
          labelPrint: this.labelPrint,
        };
        Object.assign(item, { settings });
        Object.assign(item, { printerCategories: this.selectedPrinters });
        Object.assign(item, { views: this.selectedViews });
        Object.assign(item, { selected: false });
        this.$emit('submit', item);
        this.$emit('close');
      },
    },
    created() {
      console.log('propss', this.views, this.items);
      this.catalogViews = this.views.map((current) => {
        const view = current;
        view.selected = false;
        return view;
      });
      this.catalogPrinters = this.printerCategories.map((current) => {
        const printer = {
          name: current,
        };
        printer.selected = false;
        return printer;
      });
      if(this.items.length > 0){
        this.name = {
          name: {...this.items[0].name}
        }
        this.abbr = {
          name: {...this.items[0].abbr}
        }
        this.desc = {
          name: {...this.items[0].desc}
        }
        this.sizes = [...this.items[0].sizes]
        this.options = [...this.items[0].options]
        this.styles = [...this.items[0].styles]
        this.variants = this.items[0].variants || []
        this.selectedViews = this.items[0].views || []
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
  tbody.multiple {
    &:not(:last-child) {
      border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    }
  }
  label.checkbox {
    vertical-align: middle;
    margin-bottom: 10px;
    cursor: pointer;

    span {
      display: inline-block;
      position: relative;
      width: 18px;
      height: 18px;
      border-radius: 4px;
      background-color: #ffffff;
      border: 1px solid #d0d4d9;
      vertical-align: middle; 
      margin-right: 1px;

      &:before {
        content: "\E5CA";
        position: absolute;
        font-family: 'Material Icons';
        font-size: 24px;
        color: #2196F3;
        font-weight: 700;
        text-align: center;
        width: 22px;
        height: 26px;
        left: -2px;
        bottom: 0;
        margin: auto;
        transform: scale(0);
        transition: all 100ms ease-in;
      }
    }
    input {
      display: none;
    }
    &.is-checked span:before {
      transform: scale(1);
    }
  }

  .views {
    border: 2px dashed rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    p {
      text-align: center;
      color: rgba(0, 0, 0, 0.4);
      cursor: pointer;
    }
    li {
      cursor: default;
      p {
        margin: 0;
        vertical-align: middle;
        color: #333;
        cursor: default;
      }
      i {
        vertical-align: middle;
        font-size: 1.5rem;
        border-radius: 4px;
        padding: 0.5rem;
        cursor: pointer;
      }
    }
  }
  
  @media (min-width: 576px) {
    .modal-dialog {
        max-width: 90%;
    }
  }

</style>
