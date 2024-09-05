<template>
  <CreateEditProductVariant :productVariantId="$route.params.id" />
</template>
  
<script setup lang="ts">
import CreateEditProductVariant from "@/components/admin/productVariant/CreateEditProductVariant.vue"
definePageMeta({
  layout: 'admin',
  middleware: [
    'auth'
  ],
});
useHead({
  title: `Products | Edit`,
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