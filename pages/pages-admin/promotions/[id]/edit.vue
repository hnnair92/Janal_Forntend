<template>
    <CreateEditPromotions :promotionId="$route.params.id" />
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
            name: 'Edit Product',
            content:
                '',
        },
    ],
});
</script>

<style scoped></style>