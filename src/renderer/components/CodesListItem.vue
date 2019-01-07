<template>
<div class="card">
    <h1 class="card-title">
        <router-link :to="{ name: 'Code', params: { id: code['.key'] } }">
          {{ code }}
        </router-link>
    </h1>
</div>
</template>

<script>
export default {
  props: {
    code: {
      required: true,
      type: Object,
    }
  },
}
</script>
