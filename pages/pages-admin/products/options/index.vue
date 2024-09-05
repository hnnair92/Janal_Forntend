<template>
  <div class="full-width column wrap  items-start content-start q-pa-lg">
    <div class="full-width row justify-between q-pb-sm">
      <p class="text-h4">Product Options</p>
      <q-btn color="secondary" label="+ Option" outline @click="openCreate" />
    </div>

    <q-separator class="full-width row" color="orange" inset />
    <div class="full-width column wrap">
      <ProductOptionsList />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductOptionsList from "@/components/admin/productOptions/ProductOptionsList.vue";
const router = useRouter();
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