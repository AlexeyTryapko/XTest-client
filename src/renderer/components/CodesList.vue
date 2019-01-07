<template>
  <div class="list">
    <CodesListItem
      v-for="code in codes"
      :code="code"
      :key="code['.key']"
      class="item"
    />
  </div>
</template>

<script>
import CodesListItem from './CodesListItem'

export default {
  components: {
    CodesListItem,
  },
  props: {
    codes: {
      required: true,
      type: Array,
    }
  },
}
</script>
<style media="screen" scoped>
  .list {
    width: 850px;
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
    padding: 15px;
    min-width: 250px;
    height: 150px;
    background-color: #00BCD4;
    border-radius: 10px;
  }
</style>
