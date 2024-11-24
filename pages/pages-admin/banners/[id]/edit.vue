<template>
  <CreateEditBanners :promotionId="$route.params.id" />
</template>

<script setup lang="ts">
import CreateEditBanners from "@/components/admin/banners/CreateEditBanners.vue";
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
useHead({
  title: `Promotions`,
  meta: [
    {
      name: "Edit Product",
      content: "",
    },
  ],
});
</script>

<style scoped></style>
