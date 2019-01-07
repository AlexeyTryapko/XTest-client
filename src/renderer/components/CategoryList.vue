<template>
  <div class="list">
    <CategoryListItem
      v-for="category in categories"
      :category="category"
      :key="category['.key']"
      class="item"
    />
  </div>
</template>

<script>
import CategoryListItem from './CategoryListItem'

export default {
  components: {
    CategoryListItem,
  },
  props: {
    categories: {
      required: true,
      type: Array,
    }
  },
}
</script>
<style media="screen" scoped>
  .list {
    width: 640px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }

  .item{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    width: 300px;
    height: 250px;
    background-color: #00BCD4;
    border-radius: 10px;
  }
</style>
