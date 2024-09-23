<template>
  <div class="full-width column wrap items-start content-start">
    <TaxUtils />
  </div>
</template>

<script setup>
import TaxUtils from "@/components/admin/utils/TaxUtils.vue";
definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});
</script>

<style lang="scss" scoped></style>
