<template>
  <div class="full-width column wrap items-start content-start">
    <CreateUser />
  </div>
</template>

<script setup>
import CreateUser from "../../../components/admin/users/CreateUser.vue";
definePageMeta({
  layout: "admin",
  middleware: ["auth", "admin"],
});
</script>

<style lang="scss" scoped></style>
