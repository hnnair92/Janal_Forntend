<template>
  <CustomerHome />
</template>

<script setup lang="ts">
import CustomerHome from "@/components/customer/customer/screens/CustomerHome.vue";
const router = useRouter();
definePageMeta({
  layout: "default",
  middleware: ["auth", "customer"],
});
useHead({
  title: `Customer Dashboard`,
  meta: [
    {
      name: "customer dashboard",
      content: "View customer orders and detail",
    },
  ],
});
</script>

<style lang="scss" scoped></style>
