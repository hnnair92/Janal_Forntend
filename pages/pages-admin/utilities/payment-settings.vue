<template>
  <div class="full-width column wrap items-start content-start">
    <PaymentUtils />
  </div>
</template>

<script setup>
import PaymentUtils from "@/components/admin/utils/PaymentUtils.vue";
definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});
</script>

<style lang="scss" scoped></style>
