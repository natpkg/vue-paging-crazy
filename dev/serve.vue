<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import { VuePagingCrazy } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  components: {
   VuePagingCrazy,
  },
  data() {
    return {
    }
  },
 methods: {
  }
});
</script>

<template>
  <div id="app">
    <vue-paging-crazy 
    :page-count="20"
    :data-count="100"
    />
  </div>
</template>
