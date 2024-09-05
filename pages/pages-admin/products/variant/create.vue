<template>
    <CreateEditProductVariant createdMode="true" />
</template>

<script setup lang="ts">
import CreateEditProductVariant from "@/components/admin/productVariant/CreateEditProductVariant.vue";
definePageMeta({
    layout: 'admin',
    middleware: [
        'auth'
    ],
});
useHead({
    title: `Product Variants`,
    meta: [
        {
            name: 'Edit Product Variant',
            content:
                '',
        },
    ],
});
</script>

<style scoped></style>