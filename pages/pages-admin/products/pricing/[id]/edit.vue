<template>
  <ColorPriceCreateEdit :fabricId.sync="$route.params.id" />
</template>

<script setup lang="ts">
import ColorPriceCreateEdit from "@/components/admin/productPricing/ColorPriceCreateEdit.vue";
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
