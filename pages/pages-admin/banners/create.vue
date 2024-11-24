<template>
  <CreateEditBanners createdMode="true" />
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
      name: "Create Product",
      content: "",
    },
  ],
});
</script>

<style scoped></style>
