'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'VuePagingCrazy',
  props: {
    value: {
      type: Number,
      default: undefined
    },
    pageCount: {
      type: Number,
      required: true,
      default: undefined
    },
    forcePage: {
      type: Number,
      default: undefined
    },
    pageRange: {
      type: Number,
      default: 5
    },
    dataCount: {
      type: Number,
      default: 0
    },
    clickHandler: {
      type: Function,
      default: function _default() {}
    },
    labelOptions: {
      type: Object,
      default: function _default() {
        return {
          showing: 'Showing',
          to: 'to',
          of: 'of',
          entries: 'entries',
          prevText: '<',
          nextText: '>'
        };
      }
    },
    classOptions: {
      type: Object,
      default: function _default() {
        return {
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
          disabledClass: 'disabled'
        };
      }
    }
  },
  data: function data() {
    return {
      innerValue: 1
    };
  },
  computed: {
    showFrom: function showFrom() {
      return this.dataCount > 0 ? (this.selected - 1) * this.pageRange + 1 : 0;
    },
    showTo: function showTo() {
      var showToVal = this.showFrom + this.pageRange - 1;
      return showToVal > this.dataCount ? this.dataCount : showToVal;
    },
    selected: {
      get: function get() {
        return this.value || this.innerValue;
      },
      set: function set(newValue) {
        this.innerValue = newValue;
      }
    },
    pages: function pages() {
      var _this = this;

      var items = {};

      if (this.pageCount <= this.pageRange) {
        for (var index = 0; index < this.pageCount; index++) {
          var page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1
          };
          items[index] = page;
        }
      } else {
        var setPageItem = function setPageItem(index) {
          var page = {
            index: index,
            content: index + 1,
            selected: index === _this.selected - 1
          };
          items[index] = page;
        };

        var selectedRangeLow = Math.floor(this.selected / this.pageRange) * this.pageRange;

        if (this.selected % this.pageRange == 0) {
          selectedRangeLow = (Math.floor(this.selected / this.pageRange) - 1) * this.pageRange;
        }

        var selectedRangeHigh = selectedRangeLow + this.pageRange - 1;

        for (var i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i);
        }
      }

      return items;
    },
    isShowPage: function isShowPage() {
      return this.dataCnt > 0;
    }
  },
  watch: {},
  beforeUpdate: function beforeUpdate() {
    if (this.forcePage === undefined) return;

    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage;
    }
  },
  methods: {
    handlePageSelected: function handlePageSelected(selected) {
      if (selected < 0 || selected > this.pageCount || this.selected === selected) return;
      this.innerValue = selected;
      this.$emit('input', selected);
      this.clickHandler(selected);
    },
    prevPage: function prevPage() {
      if (this.selected <= 1) return;
      this.handlePageSelected(this.selected - 1);
    },
    nextPage: function nextPage() {
      if (this.selected >= this.pageCount) return;
      this.handlePageSelected(this.selected + 1);
    },
    prevPageSelected: function prevPageSelected() {
      return this.selected === 1;
    },
    nextPageSelected: function nextPageSelected() {
      return this.selected === this.pageCount || this.pageCount === 0;
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classOptions.containerClass
  }, [_vm._ssrNode("<div" + _vm._ssrClass(null, _vm.classOptions.showing) + "><p>" + _vm._ssrEscape("\n      " + _vm._s(_vm.labelOptions.showing) + "\n      " + _vm._s(' ') + "\n      ") + "<span>" + _vm._ssrEscape(_vm._s(_vm.showFrom)) + "</span>" + _vm._ssrEscape("\n      " + _vm._s(' ') + "\n      " + _vm._s(_vm.labelOptions.to) + "\n      " + _vm._s(' ') + "\n      ") + "<span>" + _vm._ssrEscape(_vm._s(_vm.showTo)) + "</span>" + _vm._ssrEscape("\n      " + _vm._s(' ') + "\n      " + _vm._s(_vm.labelOptions.of) + "\n      " + _vm._s(' ') + "\n      ") + "<span>" + _vm._ssrEscape(_vm._s(_vm.dataCount)) + "</span>" + _vm._ssrEscape("\n      " + _vm._s(' ') + "\n      " + _vm._s(_vm.labelOptions.entries) + "\n    ") + "</p></div> <ul" + _vm._ssrClass(null, _vm.classOptions.paging) + "><li" + _vm._ssrClass(null, [_vm.classOptions.prevClass, _vm.prevPageSelected() ? _vm.classOptions.disabledClass : '']) + "><a" + _vm._ssrAttr("tabindex", _vm.prevPageSelected() ? -1 : 0) + _vm._ssrClass(null, _vm.classOptions.prevLinkClass) + ">" + _vm._s(_vm.labelOptions.prevText) + "</a></li> " + _vm._ssrList(_vm.pages, function (page, idx) {
    return "<li" + _vm._ssrClass(null, [_vm.classOptions.pageClass, page.selected ? _vm.classOptions.activeClass : '', page.disabled ? _vm.classOptions.disabledClass : '']) + ">" + (page.disabled ? "<a tabindex=\"0\"" + _vm._ssrClass(null, _vm.classOptions.pageLinkClass) + ">" + _vm._ssrEscape(_vm._s(page.content)) + "</a>" : "<a tabindex=\"0\"" + _vm._ssrClass(null, _vm.classOptions.pageLinkClass) + ">" + _vm._ssrEscape(_vm._s(page.content)) + "</a>") + "</li>";
  }) + " <li" + _vm._ssrClass(null, [_vm.classOptions.nextClass, _vm.nextPageSelected() ? _vm.classOptions.disabledClass : '']) + "><a" + _vm._ssrAttr("tabindex", _vm.nextPageSelected() ? -1 : 0) + _vm._ssrClass(null, _vm.classOptions.nextLinkClass) + ">" + _vm._s(_vm.labelOptions.nextText) + "</a></li></ul>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-b3e8bdf0_0", {
    source: ".showing{clear:both;float:left;padding:.755em}.showing>p{font-size:13px}.paging{display:inline-block;padding-left:0;margin:20px 0;border-radius:4px}.paging>li{display:inline}.paging>li>a,.paging>li>span{position:relative;float:left;padding:4px 8px;line-height:1.42857143;text-decoration:none;color:#337ab7;background-color:#fff;border:1px solid #ddd;margin-left:-1px;cursor:pointer;font-size:12px}.paging>li:first-child>a,.paging>li:first-child>span{margin-left:0;border-bottom-left-radius:4px;border-top-left-radius:4px}.paging>li:last-child>a,.paging>li:last-child>span{border-bottom-right-radius:4px;border-top-right-radius:4px}.paging>li>a:focus,.paging>li>a:hover,.paging>li>span:focus,.paging>li>span:hover{z-index:3;color:#23527c;background-color:#eee;border-color:#ddd}.paging>.active>a,.paging>.active>a:focus,.paging>.active>a:hover,.paging>.active>span,.paging>.active>span:focus,.paging>.active>span:hover{z-index:2;color:#fff;background-color:#337ab7;border-color:#337ab7;cursor:default}.paging>.disabled>a,.paging>.disabled>a:focus,.paging>.disabled>a:hover,.paging>.disabled>span,.paging>.disabled>span:focus,.paging>.disabled>span:hover{color:#777;background-color:#fff;border-color:#ddd;cursor:not-allowed}.paging-lg>li>a,.paging-lg>li>span{padding:10px 16px;font-size:18px;line-height:1.3333333}.paging-lg>li:first-child>a,.paging-lg>li:first-child>span{border-bottom-left-radius:6px;border-top-left-radius:6px}.paging-lg>li:last-child>a,.paging-lg>li:last-child>span{border-bottom-right-radius:6px;border-top-right-radius:6px}.paging-sm>li>a,.paging-sm>li>span{padding:5px 10px;font-size:12px;line-height:1.5}.paging-sm>li:first-child>a,.paging-sm>li:first-child>span{border-bottom-left-radius:3px;border-top-left-radius:3px}.paging-sm>li:last-child>a,.paging-sm>li:last-child>span{border-bottom-right-radius:3px;border-top-right-radius:3px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-b3e8bdf0";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);

var VuePagingCrazy = __vue_component__;VuePagingCrazy.install = function (Vue) {
  Vue.component(VuePagingCrazy.name, VuePagingCrazy);
};var components$1=/*#__PURE__*/Object.freeze({__proto__:null,'default':VuePagingCrazy,VuePagingCrazy:VuePagingCrazy});var install = function installVuePagingSimple(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default':install,VuePagingCrazy:VuePagingCrazy});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;