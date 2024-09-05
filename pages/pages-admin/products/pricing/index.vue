<template>
  <div class="full-width column wrap items-start content-start q-pa-lg">
    <div class="full-width row justify-between q-pb-md">
      <p class="text-h4">Products Pricing</p>
      <q-btn
        color="secondary"
        label="Edit Multiple Product Pricing"
        @click="openCreate"
        outline
        unelevated
      />
    </div>

    <q-separator class="full-width row" color="orange" inset />
    <AdminProductPricingList></AdminProductPricingList>
  </div>
</template>
<script setup lang="ts">
import AdminProductPricingList from "@/components/admin/productPricing/AdminProductPricingList.vue";
const router = useRouter();
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
useHead({
  title: `Product Pricing`,
  meta: [
    {
      name: "Edit price for each fabric here",
    },
  ],
});
const openCreate = () => {
  router.push("editMultiple");
};
</script>

<style lang="scss" scoped></style>
