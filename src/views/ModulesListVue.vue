<template>
  <div class="moduleslist">
    <ModulesList/>
  </div>
</template>

<script>
// @ is an alias to /src
import ModulesList from '@/components/ModulesList.vue'

export default {
  name: 'ModulesListView',
  components: {
    ModulesList
  }
}
</script>
