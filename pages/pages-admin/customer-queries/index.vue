<template>
  <div class="full-width column wrap items-start content-start q-pa-lg">
    <CustomerQueriesTable />
  </div>
</template>

<script setup lang="ts">
import CustomerQueriesTable from "@/components/admin/customerQueries/CustomerQueriesTable.vue";
// const router = useRouter();
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
</script>

<style lang="scss" scoped></style>
