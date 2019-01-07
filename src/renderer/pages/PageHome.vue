<template>
<div>
  <router-link :to="{ name: 'InfoCode'}">Test code info</router-link>
  <header class="md-layout md-alignment-top-center">
    <h1 class="md-display-4">XTest</h1>
  </header>
  <main class="md-layout md-alignment-center-center">
    <CategoryList :categories="categories"/>
  </main>
</div>
</template>

<script>
import sourceData from '../data'
import PageCodeInfo from '../pages/PageCodeInfo'
import CategoryList from '../components/CategoryList'

export default {
  components: {
    CategoryList,
    PageCodeInfo
  },
  data() {
    return {
      categories: Object.values(sourceData.categories),
    }
  },
}
</script>
