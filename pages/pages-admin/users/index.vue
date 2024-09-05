<template>
  <div class="full-width column wrap items-start content-start">
    <UserTable />
  </div>
</template>

<script setup>
import UserTable from "@/components/admin/users/UserTable.vue";
definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});
</script>

<style lang="scss" scoped></style>
