<template>
  <li @click.stop.prevent="select" :class="{ 'is-selected': itemData.selected }">
    <p class="d-inline-block">{{itemData.name[language]}}</p>
    <div class="item-actions d-inline-block">
        <i class="material-icons" @click.stop="addItemTrigger">add</i>
        <i class="material-icons" @click.stop="$emit('editItem', [index])">edit</i>
        <i class="material-icons" @click.stop="$emit('deleted', [index])">delete</i>
    </div>
    <ul @click.stop.prevent v-if="itemData.items && itemData.selected">
      <item
        @addItem="selectFurther($event, 'addItem')"
        @editItem="editItem"
        @click.stop.prevent
        v-for="(item, index) in itemData.items"
        :key="index"
        :index="index"
        :itemData="item"
        @deleted="selectFurther($event, 'deleted')"
        @selected="selectFurther($event, 'selected')"></item>
    </ul>
  </li>
</template>

<script>
  export default {
    props: ['itemData', 'index'],
    data() {
      return {
        language: this.$cookie.get('lang') || 'en',
        selected: this.itemData.selected,
      };
    },
    methods: {
      select() {
        const event = {
          select: !this.itemData.selected,
          path: [this.index],
        };
        this.$emit('selected', event);
      },
      addItemTrigger() {
        this.selected = true;
        this.$emit('addItem', [this.index]);
      },
      selectFurther(event, label) {
        // this.selected = !this.selected;
        const send = event;
        if (label === 'selected') {
          send.path.push(this.index);
        } else {
          send.push(this.index);
        }
        this.$emit(label, send);
      },
    },
  };
</script>

<style scoped lang="scss">
  ul {
    list-style: none;
  }
  li {
    transition: all 125ms ease-in;
    padding: 5px 0;
    &.is-selected {
      font-size: 1.4rem;
      color: #007bff;
    }
    &:not(.is-selected) {
      font-size: 1rem;
      color: #333;
    }
    ul {
      p {
        position: relative;
        padding-left: 2rem;
        margin: 0;

        &:before {
          display: block;
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 50%;
          width: 2px;
          background-color: rgba(0, 0, 0, 0.3);
        }
        &:after {
          display: block;
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          width: 1.5rem;
          height: 2px;
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
      &:not(:last-child) p:before {
        height: 100%;
      }

    }
  }
  .item-actions {
    margin-left: 1rem;
    opacity: 0;
    transition: opacity 125ms ease-in;

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
      &:last-of-type:hover {
        color: red;
      }
    }
  }
  li.is-selected > .item-actions,
  li:hover > .item-actions {
    opacity: 1;
  }
</style>
