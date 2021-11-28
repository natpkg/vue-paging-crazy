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
      default: () => {}
    },
    labelOptions: {
      type: Object,
      default: () => ({
        showing: 'Showing',
        to: 'to',
        of: 'of',
        entries: 'entries',
        prevText: '<',
        nextText: '>'
      })
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
        disabledClass: 'disabled'
      })
    }
  },

  data() {
    return {
      innerValue: 1
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
      }
    },
    pages: function () {
      let items = {};

      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1
          };
          items[index] = page;
        }
      } else {
        let setPageItem = index => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1
          };
          items[index] = page;
        };

        let selectedRangeLow = Math.floor(this.selected / this.pageRange) * this.pageRange;

        if (this.selected % this.pageRange == 0) {
          selectedRangeLow = (Math.floor(this.selected / this.pageRange) - 1) * this.pageRange;
        }

        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;

        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= this.pageCount - 1; i++) {
          setPageItem(i);
        }
      }

      return items;
    },

    isShowPage() {
      return this.dataCnt > 0;
    }

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
      if (selected < 0 || selected > this.pageCount || this.selected === selected) return;
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
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    class: _vm.classOptions.containerClass
  }, [_c('div', {
    class: _vm.classOptions.showing
  }, [_c('p', [_vm._v("\n      " + _vm._s(_vm.labelOptions.showing) + "\n      " + _vm._s(' ') + "\n      "), _c('span', [_vm._v(_vm._s(_vm.showFrom))]), _vm._v("\n      " + _vm._s(' ') + "\n      " + _vm._s(_vm.labelOptions.to) + "\n      " + _vm._s(' ') + "\n      "), _c('span', [_vm._v(_vm._s(_vm.showTo))]), _vm._v("\n      " + _vm._s(' ') + "\n      " + _vm._s(_vm.labelOptions.of) + "\n      " + _vm._s(' ') + "\n      "), _c('span', [_vm._v(_vm._s(_vm.dataCount))]), _vm._v("\n      " + _vm._s(' ') + "\n      " + _vm._s(_vm.labelOptions.entries) + "\n    ")])]), _vm._v(" "), _c('ul', {
    class: _vm.classOptions.paging
  }, [_c('li', {
    class: [_vm.classOptions.prevClass, _vm.prevPageSelected() ? _vm.classOptions.disabledClass : '']
  }, [_c('a', {
    class: _vm.classOptions.prevLinkClass,
    attrs: {
      "tabindex": _vm.prevPageSelected() ? -1 : 0
    },
    domProps: {
      "innerHTML": _vm._s(_vm.labelOptions.prevText)
    },
    on: {
      "click": function ($event) {
        return _vm.prevPage();
      },
      "keyup": function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.prevPage();
      }
    }
  })]), _vm._v(" "), _vm._l(_vm.pages, function (page, idx) {
    return _c('li', {
      key: idx,
      class: [_vm.classOptions.pageClass, page.selected ? _vm.classOptions.activeClass : '', page.disabled ? _vm.classOptions.disabledClass : '']
    }, [page.disabled ? _c('a', {
      class: _vm.classOptions.pageLinkClass,
      attrs: {
        "tabindex": "0"
      }
    }, [_vm._v(_vm._s(page.content))]) : _c('a', {
      class: _vm.classOptions.pageLinkClass,
      attrs: {
        "tabindex": "0"
      },
      on: {
        "click": function ($event) {
          return _vm.handlePageSelected(page.index + 1);
        },
        "keyup": function ($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }

          return _vm.handlePageSelected(page.index + 1);
        }
      }
    }, [_vm._v(_vm._s(page.content))])]);
  }), _vm._v(" "), _c('li', {
    class: [_vm.classOptions.nextClass, _vm.nextPageSelected() ? _vm.classOptions.disabledClass : '']
  }, [_c('a', {
    class: _vm.classOptions.nextLinkClass,
    attrs: {
      "tabindex": _vm.nextPageSelected() ? -1 : 0
    },
    domProps: {
      "innerHTML": _vm._s(_vm.labelOptions.nextText)
    },
    on: {
      "click": function ($event) {
        return _vm.nextPage();
      },
      "keyup": function ($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }

        return _vm.nextPage();
      }
    }
  })])], 2)]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-b3e8bdf0_0", {
    source: ".showing{clear:both;float:left;padding:.755em}.showing>p{font-size:13px}.paging{display:inline-block;padding-left:0;margin:20px 0;border-radius:4px}.paging>li{display:inline}.paging>li>a,.paging>li>span{position:relative;float:left;padding:4px 8px;line-height:1.42857143;text-decoration:none;color:#337ab7;background-color:#fff;border:1px solid #ddd;margin-left:-1px;cursor:pointer;font-size:12px}.paging>li:first-child>a,.paging>li:first-child>span{margin-left:0;border-bottom-left-radius:4px;border-top-left-radius:4px}.paging>li:last-child>a,.paging>li:last-child>span{border-bottom-right-radius:4px;border-top-right-radius:4px}.paging>li>a:focus,.paging>li>a:hover,.paging>li>span:focus,.paging>li>span:hover{z-index:3;color:#23527c;background-color:#eee;border-color:#ddd}.paging>.active>a,.paging>.active>a:focus,.paging>.active>a:hover,.paging>.active>span,.paging>.active>span:focus,.paging>.active>span:hover{z-index:2;color:#fff;background-color:#337ab7;border-color:#337ab7;cursor:default}.paging>.disabled>a,.paging>.disabled>a:focus,.paging>.disabled>a:hover,.paging>.disabled>span,.paging>.disabled>span:focus,.paging>.disabled>span:hover{color:#777;background-color:#fff;border-color:#ddd;cursor:not-allowed}.paging-lg>li>a,.paging-lg>li>span{padding:10px 16px;font-size:18px;line-height:1.3333333}.paging-lg>li:first-child>a,.paging-lg>li:first-child>span{border-bottom-left-radius:6px;border-top-left-radius:6px}.paging-lg>li:last-child>a,.paging-lg>li:last-child>span{border-bottom-right-radius:6px;border-top-right-radius:6px}.paging-sm>li>a,.paging-sm>li>span{padding:5px 10px;font-size:12px;line-height:1.5}.paging-sm>li:first-child>a,.paging-sm>li:first-child>span{border-bottom-left-radius:3px;border-top-left-radius:3px}.paging-sm>li:last-child>a,.paging-sm>li:last-child>span{border-bottom-right-radius:3px;border-top-right-radius:3px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var __vue_component__$1 = __vue_component__;

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  VuePagingCrazy: __vue_component__$1
});

// Import vue components

const install = function installVuePagingSimple(Vue) {
  Object.entries(components).forEach(_ref => {
    let [componentName, component] = _ref;
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export { __vue_component__$1 as VuePagingCrazy, install as default };
