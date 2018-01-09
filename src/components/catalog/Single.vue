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
      <div class="card-body">
        <div class="mb-3">
          <h3 class="d-inline-block mr-3">Views</h3>
          <button class="btn btn-round btn-primary" @click="editViews = true"><i class="material-icons d-inline-block">add</i></button>
        </div>
        <div class="views p-3 mb-3" @click="editViewToggle">
          <p class="m-0" v-if="views.length === 0">Click to add views</p>
          <ul class="p-0 m-0">
            <li class="btn btn-clear mr-2" v-for="(view, index) in views" :key="index">
              <p class="d-inline-block mr-2">{{view.name[language]}}</p>
              <i class="material-icons btn-primary" @click.stop="editView(view, index)">edit</i>
              <i class="material-icons btn-danger" @click.stop="deleteView(index)">delete</i>
            </li>
          </ul>
        </div>
        <div class="mb-3">
          <h3 class="d-inline-block m-0">Items</h3>
          <div class="item-actions d-inline-block">
            <i class="material-icons" @click="itemModal = true">add</i>
          </div>
        </div>
        <ul class="primary">
          <item @click.stop.prevent
            v-for="(item, index) in items"
            :key="index"
            :index="index"
            @selected="select"
            @deleted="deleteItem"
            @addItem="addItemEvent"
            @editItem="editItem"
            :itemData="item"></item>
        </ul>
      </div>
    </div>
    <transition name="fade">
      <item-modal v-if="itemModal" :views="views" :items="items" @submit="addItem" @submitItemEdit="submitItemEdit" @close="itemModal = false;"></item-modal>
    </transition>
    <transition name="fade">
      <view-modal v-if="editViews" :edit="currentView" @submit="addView" @update="editViewSubmit" @close="editViews = false;"></view-modal>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue';
  import * as fetch_data from '../../assets/fetch_data';
  export default {
    data() {
      return {
        err: '',
        success: '',
        items: [],
        views: [],
        currentView: null,
        itemModal: false,
        editViews: false,
        editItems: false,
        selectedItem: null,
        actionPath: null,
        language: this.$cookie.get('lang') || 'en',
      };
    },
    methods: {
      addItemEvent(event) {
        this.actionPath = event;
        this.itemModal = true;
      },
      addView(event) {
        this.views.push(event);
      },
      editViewToggle() {
        if (this.views.length > 0) return;
        this.editViews = true;
      },
      editView(view, index) {
        this.currentView = {
          view,
          index,
        };
        this.editViews = true;
      },
      editViewSubmit(event) {
        this.views[event.index] = event.view;
      },
      deleteView(index) {
        this.views.splice(index, 1);
      },
      addItem(event) {
        if (this.actionPath !== null) {
          this.addItemToChild(event);
          return;
        }
        const goDeeper = (item, indexes) => {
          if (indexes.length > 0) {
            const postition = indexes.length - 1;
            const index = indexes[postition];
            indexes.splice(postition, 1);
            const target = indexes.length === 0 ? item[index] : item[index].items;
            return goDeeper(target, indexes);
          }
          return item;
        };
        if (this.selectedItem === null) {
          this.items.push(event);
        } else {
          const indexes = this.selectedItem;
          const item = goDeeper(this.items, indexes);
          if (item.items) {
            const items = item.items;
            items.push(event);
            Vue.set(item, 'items', items);
          } else {
            Vue.set(item, 'items', [event]);
          }
        }
      },
      addItemToChild(event) {
        this.select(this.actionPath);
        const addToTarget = (target, list, item) => {
          if (list.length === 0) {
            if (!target.items) {
              Vue.set(target, 'items', [item]);
            } else {
              const items = target.items;
              items.push(item);
              Vue.set(target, 'items', items);
            }
            return true;
          }
          const position = list.length - 1;
          const index = list[position];
          list.splice(position, 1);
          const newTarget = target.items[index];
          return addToTarget(newTarget, list, item);
        };
        const position = this.actionPath.length - 1;
        const current = this.actionPath[position];
        this.actionPath.splice(position, 1);
        addToTarget(this.items[current], this.actionPath, event);
        this.actionPath = null;
      },
      select(event) {
        let data;
        if (!event.path) {
          data = {
            path: JSON.parse(JSON.stringify(event)),
            select: true,
          };
        } else {
          data = JSON.parse(JSON.stringify(event));
        }
        const deselectSiblings = (target, list, select) => {
          if (list.length === 1) {
            const position = list[0];
            const deselected = target.items.map((current, index) => {
              const item = current;
              if (select) {
                item.selected = position === index;
                return item;
              }
              item.selected = false;
              return item;
            });
            Vue.set(target, 'items', deselected);
            return true;
          }
          const position = list.length - 1;
          const index = list[position];
          list.splice(position, 1);
          const newTarget = target.items[index];
          console.log(newTarget);
          return deselectSiblings(newTarget, list, select);
        };
        this.selectedItem = data.path;
        if (data.path.length === 1) {
          this.items = this.items.map((current, index) => {
            const item = current;
            item.selected = index === data.path[0];
            return item;
          });
        } else {
          const position = this.selectedItem.length - 1;
          const current = this.selectedItem[position];
          this.selectedItem.splice(position, 1);
          deselectSiblings(this.items[current], this.selectedItem, data.select);
        }
        this.selectedItem = null;
      },
      editItem(event){
        let data;
        if (!event.path) {
          data = {
            path: JSON.parse(JSON.stringify(event)),
            select: true,
          };
        } else {
          data = JSON.parse(JSON.stringify(event));
        }
        this.editItems = true;
        this.itemModal = true;
        console.log('item edit', data)
      },
      submitItemEdit(event){
       if (this.actionPath !== null) {
          this.addItemToChild(event);
          return;
        }
        const goDeeper = (item, indexes) => {
          if (indexes.length > 0) {
            const postition = indexes.length - 1;
            const index = indexes[postition];
            indexes.splice(postition, 1);
            const target = indexes.length === 0 ? item[index] : item[index].items;
            return goDeeper(target, indexes);
          }
          return item;
        };
        if (this.selectedItem === null) {
          this.items.push(event);
        } else {
          const indexes = this.selectedItem;
          const item = goDeeper(this.items, indexes);
          if (item.items) {
            const items = item.items;
            items.push(event);
            Vue.set(item, 'items', items);
          } else {
            Vue.set(item, 'items', [event]);
          }
        }
      },
      deleteItem(event) {
        const deleteItem = (target, list) => {
          if (list.length === 1) {
            const position = list[0];
            const deleted = target.items.filter((item, index) => {
              console.log(index, position);
              if (index !== position) return item;
              return false;
            });
            Vue.set(target, 'items', deleted);
            return true;
          }
          const position = list.length - 1;
          const index = list[position];
          list.splice(position, 1);
          const newTarget = target.items[index];
          console.log(newTarget);
          return deleteItem(newTarget, list);
        };
        if (event.length === 1) {
          this.items = this.items.filter((item, index) => {
            if (index !== event[0]) return item;
            return false;
          });
        } else {
          const position = event.length - 1;
          const current = event[position];
          event.splice(position, 1);
          console.log(event);
          deleteItem(this.items[current], event);
        }
      },
      fetchCatalog() {
        fetch(`https://qasun2.onmapos.com/sunbackend/catalog/${this.$route.params.id}`, {
          method: 'get',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
        }).then(function(response) {
          return response.json();
        }).then(function(data) {
            this.items = data.catalog.itemsList;
            this.views = data.catalog.views;
            console.log('response catalog', data)
        }).catch((e)=>{
            console.log('fetch catalog is wasted')
            this.items = fetch_data.catalog.catalog.itemsList
            this.views = fetch_data.catalog.catalog.views
        })
      },
    },
    created(){
        this.fetchCatalog()
    },
    components: {
      itemModal: () => import('../modals/SingleItem'),
      viewModal: () => import('../modals/ViewsModal'),
    },
  };
</script>

<style lang="scss" scoped>
  .card-actions {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
  ul.primary {
    padding: 0;
    list-style: none;

    li {
      padding: 5px;
      cursor: pointer;
    }
    ul {
      padding-left: 10px;
    }
  }
  h3 {
    vertical-align: middle;    
  }
  .item-actions {
    margin-left: 1rem;

    i {
      vertical-align: middle;
      cursor: pointer;
      padding: 5px;
      border-radius: 50%;
      color: #555;
      transition: color 125ms ease-in;   
      &:hover {
        color: #111;
      }
    }
  }
</style>
