<template>
  <div :class="classOptions.containerClass">
    <div :class="classOptions.showing">
      <span>
        {{ labelOptions.showing }}
        {{ ' ' }}
        <span>{{ showFrom }}</span>
        {{ ' ' }}
        {{ labelOptions.to }}
        {{ ' ' }}
        <span>{{ showTo }}</span>
        {{ ' ' }}
        {{ labelOptions.of }}
        {{ ' ' }}
        <span>{{ dataCount }}</span>
        {{ ' ' }}
        {{ labelOptions.entries }}
      </span>
    </div>
    <ul :class="classOptions.paging">
      <li
        :class="[
          classOptions.prevClass,
          prevPageSelected() ? classOptions.disabledClass : '',
        ]"
      >
        <a
          @click="prevPage()"
          @keyup.enter="prevPage()"
          :class="classOptions.prevLinkClass"
          :tabindex="prevPageSelected() ? -1 : 0"
          v-html="labelOptions.prevText"
        ></a>
      </li>
      <li
        :key="idx"
        v-for="(page, idx) in pages"
        :class="[
          classOptions.pageClass,
          page.selected ? classOptions.activeClass : '',
          page.disabled ? classOptions.disabledClass : '',
        ]"
      >
        <a
          v-if="page.disabled"
          :class="classOptions.pageLinkClass"
          tabindex="0"
          >{{ page.content }}</a
        >
        <a
          v-else
          @click="handlePageSelected(page.index + 1)"
          @keyup.enter="handlePageSelected(page.index + 1)"
          :class="classOptions.pageLinkClass"
          tabindex="0"
          >{{ page.content }}</a
        >
      </li>
      <li
        :class="[
          classOptions.nextClass,
          nextPageSelected() ? classOptions.disabledClass : '',
        ]"
      >
        <a
          @click="nextPage()"
          @keyup.enter="nextPage()"
          :class="classOptions.nextLinkClass"
          :tabindex="nextPageSelected() ? -1 : 0"
          v-html="labelOptions.nextText"
        ></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VuePagingCrazy',
  props: {
    value: {
      type: Number,
      default: undefined,
    },
    pageCount: {
      type: Number,
      required: true,
      default: undefined,
    },
    forcePage: {
      type: Number,
      default: undefined,
    },
    pageRange: {
      type: Number,
      default: 5,
    },
    dataCount: {
      type: Number,
      default: 0,
    },
    clickHandler: {
      type: Function,
      default: () => {},
    },
    labelOptions: {
      type: Object,
      default: () => ({
        showing: 'Showing',
        to: 'to',
        of: 'of',
        entries: 'entries',
        prevText: '<',
        nextText: '>',
      }),
    },
    classOptions: {
      type: Object,
      default: () => ({
        containerClass: '',
        showing: 'showing',
        paging: 'paging',
        pageClass: '',
        pageLinkClass: '',
        prevClass: '',
        prevLinkClass: '',
        nextClass: '',
        nextLinkClass: '',
        activeClass: 'active',
        disabledClass: 'disabled',
      }),
    },
  },
  data() {
    return {
      innerValue: 1,
    };
  },
  computed: {
    showFrom() {
      return this.dataCount > 0 ? (this.selected - 1) * this.pageRange + 1 : 0;
    },

    showTo() {
      const showToVal = this.showFrom + this.pageRange - 1;
      return showToVal > this.dataCount ? this.dataCount : showToVal;
    },

    selected: {
      get: function () {
        return this.value || this.innerValue;
      },
      set: function (newValue) {
        this.innerValue = newValue;
      },
    },
    pages: function () {
      let items = {};
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1,
          };
          items[index] = page;
        }
      } else {
        let setPageItem = (index) => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1,
          };
          items[index] = page;
        };

        let selectedRangeLow =
          Math.floor(this.selected / this.pageRange) * this.pageRange;
        if (this.selected % this.pageRange == 0) {
          selectedRangeLow =
            (Math.floor(this.selected / this.pageRange) - 1) * this.pageRange;
        }
        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;

        for (
          let i = selectedRangeLow;
          i <= selectedRangeHigh && i <= this.pageCount - 1;
          i++
        ) {
          setPageItem(i);
        }
      }
      return items;
    },
    isShowPage() {
      return this.dataCnt > 0;
    },
  },
  watch: {},

  beforeUpdate() {
    if (this.forcePage === undefined) return;
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage;
    }
  },
  methods: {
    handlePageSelected(selected) {
      if (
        selected < 0 ||
        selected > this.pageCount ||
        this.selected === selected
      )
        return;
      this.innerValue = selected;
      this.$emit('input', selected);
      this.clickHandler(selected);
    },
    prevPage() {
      if (this.selected <= 1) return;
      this.handlePageSelected(this.selected - 1);
    },
    nextPage() {
      if (this.selected >= this.pageCount) return;
      this.handlePageSelected(this.selected + 1);
    },

    prevPageSelected() {
      return this.selected === 1;
    },

    nextPageSelected() {
      return this.selected === this.pageCount || this.pageCount === 0;
    },
  },
};
</script>

<style scoped>
.showing {
  clear: both;
  float: left;
  margin: 20px;
}
.showing > span {
  position: relative;
  float: left;
  padding: 5px 8px;
  line-height: 1.42857143;
  text-decoration: none;
  background-color: #ffffff;
  margin-left: -1px;
  cursor: pointer;
  font-size: 12px;
}

.paging {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
}
.paging > li {
  display: inline;
}
.paging > li > a,
.paging > li > span {
  position: relative;
  float: left;
  padding: 4px 8px;
  line-height: 1.42857143;
  text-decoration: none;
  color: #337ab7;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  margin-left: -1px;
  cursor: pointer;
  font-size: 12px;
}
.paging > li:first-child > a,
.paging > li:first-child > span {
  margin-left: 0;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}
.paging > li:last-child > a,
.paging > li:last-child > span {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}
.paging > li > a:hover,
.paging > li > span:hover,
.paging > li > a:focus,
.paging > li > span:focus {
  z-index: 3;
  color: #23527c;
  background-color: #eeeeee;
  border-color: #dddddd;
}
.paging > .active > a,
.paging > .active > span,
.paging > .active > a:hover,
.paging > .active > span:hover,
.paging > .active > a:focus,
.paging > .active > span:focus {
  z-index: 2;
  color: #ffffff;
  background-color: #337ab7;
  border-color: #337ab7;
  cursor: default;
}
.paging > .disabled > span,
.paging > .disabled > span:hover,
.paging > .disabled > span:focus,
.paging > .disabled > a,
.paging > .disabled > a:hover,
.paging > .disabled > a:focus {
  color: #777777;
  background-color: #ffffff;
  border-color: #dddddd;
  cursor: not-allowed;
}
.paging-lg > li > a,
.paging-lg > li > span {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
}
.paging-lg > li:first-child > a,
.paging-lg > li:first-child > span {
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
}
.paging-lg > li:last-child > a,
.paging-lg > li:last-child > span {
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
}
.paging-sm > li > a,
.paging-sm > li > span {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.paging-sm > li:first-child > a,
.paging-sm > li:first-child > span {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}
.paging-sm > li:last-child > a,
.paging-sm > li:last-child > span {
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
</style>
