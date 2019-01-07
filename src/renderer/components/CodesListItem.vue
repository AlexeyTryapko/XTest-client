<template>
<div class="card">
    <h1 class="card-title">
        <router-link :to="{ name: 'Code', params: { id: code['.key'] } }">
          <p style="color: black"> {{  code  }}</p>
        </router-link>
    </h1>
</div>
</template>

<script>
export default {
  props: {
    code: {
      required: true,
      type: String,
    }
  },
}
</script>
