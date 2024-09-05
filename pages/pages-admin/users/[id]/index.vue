<template>
  <div class="full-width column wrap items-start content-start">
    <UserDetails :user-id="$route.params.id" />
  </div>
</template>

<script setup>
import UserDetails from "@/components/admin/users/UserDetails.vue";
definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});
</script>

<style lang="scss" scoped></style>
