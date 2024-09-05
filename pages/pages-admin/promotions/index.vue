<template>
    <div class="full-width column wrap  items-start content-start q-pa-lg">
        <div class="full-width row justify-between q-pb-sm">
            <p class="text-h4">Product Campaign and Discounts</p>
            <q-btn color="secondary" label="+ Promotion" @click="openCreate" outline square size="md" />
        </div>
        <q-separator class="full-width row" color="orange" inset />
        <div class="full-width column wrap">
            <PromotionsList />
        </div>
    </div>
</template>

<script setup lang="ts">
import PromotionsList from "@/components/admin/promotions/PromotionsList.vue";
const router = useRouter();
definePageMeta({
    layout: 'admin',
    middleware: [
        'auth'
    ],
});
useHead({
    title: `Product Options`,
    meta: [
        {
            name: 'description',
            content:
                '',
        },
    ],
});
const openCreate = () => {
    router.push('create');
};
</script>

<style lang="scss" scoped></style>