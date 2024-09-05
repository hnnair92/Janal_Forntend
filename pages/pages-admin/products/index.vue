<template>
  <div class="full-width column wrap  items-start content-start q-pa-lg">
    <div class="full-width row justify-between q-pb-md">
      <p class="text-h4">Products</p>
      <q-btn color="secondary" label="+ Product" @click="openCreate" outline square size="md" />
    </div>

    <q-separator class="full-width row" color="orange" inset />

    <AdminProductIndex></AdminProductIndex>
  </div>
</template>

<script setup lang="ts">

import AdminProductIndex from "@/components/admin/products/AdminProductList.vue"
const router = useRouter()
definePageMeta({
  layout: 'admin',
  middleware: [
    'auth'
  ],
});
useHead({
  title: `Products | Our Shop`,
  meta: [
    {
      name: 'description',
      content:
        '',
    },
  ],
});
const openCreate = () => {
  router.push('create');
};
</script>

<style lang="scss" scoped></style>