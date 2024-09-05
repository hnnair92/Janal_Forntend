<template>
  <CreateEditProducts createdMode="true" />
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
  title: `Products | Add New`,
  meta: [
    {
      name: 'Create Product',
      content:
        '',
    },
  ],
});
</script>

<style scoped></style>