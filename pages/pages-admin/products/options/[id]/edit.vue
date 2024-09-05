<template>
  <CreateEditProductOptions :optionsId="$route.params.id" />
</template>
  
<script setup lang="ts">
import CreateEditProductOptions from "@/components/admin/productOptions/CreateEditProductOptions.vue";
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
      name: 'Create Product',
      content:
        '',
    },
  ],
});
</script>
  
<style scoped></style>