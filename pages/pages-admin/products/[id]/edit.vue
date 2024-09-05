<template>
  <CreateEditProducts :productId="$route.params.id" />
</template>
  
<script setup lang="ts">

import CreateEditProducts from "@/components/admin/products/CreateEditProducts.vue"
definePageMeta({
  layout: 'admin',
  middleware: [
    'auth'
  ],
});
useHead({
  title: `Product Options`,
  meta: [
    {
      name: 'Edit Product',
      content:
        '',
    },
  ],
});
</script>
  
<style scoped></style>