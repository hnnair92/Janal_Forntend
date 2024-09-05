<template>
  <CreateEditCategories :categoryId="$route.params.id" />
</template>
  
<script setup lang="ts">
import CreateEditCategories from "@/components/admin/categories/CreateEditCategories.vue"
definePageMeta({
  layout: 'admin',
  middleware: [
    'auth'
  ],
});
useHead({
  title: `Products | Categories`,
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