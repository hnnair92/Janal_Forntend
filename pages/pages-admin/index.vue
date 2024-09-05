<template>
  <div class="full-width column wrap items-start content-start">
    <AdminDashboard />
  </div>
</template>

<script setup>
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard.vue";
definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});
</script>

<style lang="scss" scoped></style>
