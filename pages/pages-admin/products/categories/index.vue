<template>
  <div class="full-width column wrap items-start content-start q-pa-lg">
    <div class="full-width row justify-between q-pb-md">
      <p class="text-h4">Categories</p>
      <q-btn
        color="secondary"
        label="+ Category"
        @click="openCreate"
        outline
        size="md"
        padding="sm"
      />
    </div>

    <q-separator class="full-width row" color="orange" inset />
    <div class="full-width column wrap">
      <AdminCategoryIndex></AdminCategoryIndex>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminCategoryIndex from "@/components/admin/categories/AdminCategoriesList.vue";
const router = useRouter();
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
useHead({
  title: `Categories | Shades4U`,
  meta: [
    {
      name: "description",
      content: "",
    },
  ],
});

const openCreate = () => {
  router.push("create");
};
</script>

<style lang="scss" scoped></style>
