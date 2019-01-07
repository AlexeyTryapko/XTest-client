<template>
<div class="card">
    <h1 class="card-title">
        <router-link :to="{ name: 'Codes', params: { id: category['.key'] } }">
         <p style="color: black"> {{  category.title  }}</p>
        </router-link>
    </h1>
</div>
</template>

<script>
export default {
  props: {
    category: {
      required: true,
      type: Object,
    }
  },
}
</script>
