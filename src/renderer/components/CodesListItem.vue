<template>
<div class="card">
    <h1 class="card-title">
        <router-link :to="{ name: 'Info', params: { id: Object.keys(code)[0] } }">
          <p style="color: black"> {{  Object.values(code)[0]  }}</p>
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
