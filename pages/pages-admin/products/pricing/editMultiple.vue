<template>
  <ColorPriceCreateEditMultiple />
</template>

<script setup lang="ts">
import ColorPriceCreateEditMultiple from "@/components/admin/productPricing/ColorPriceCreateEditMultiple.vue";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
useHead({
  title: `Product Price | Edit`,
  meta: [
    {
      name: "Edit Product Pricing",
      content: "",
    },
  ],
});
</script>

<style scoped></style>
