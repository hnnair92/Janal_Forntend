<template>
    <CreateEditPromotions createdMode="true" />
</template>

<script setup lang="ts">
import CreateEditPromotions from "@/components/admin/promotions/CreateEditPromotions.vue"
definePageMeta({
    layout: 'admin',
    middleware: [
        'auth'
    ],
});
useHead({
    title: `Promotions`,
    meta: [
        {
            name: 'Create Product',
            content:
                '',
        },
    ],
});
</script>

<style scoped></style>