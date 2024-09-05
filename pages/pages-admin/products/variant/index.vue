<template>
    <div class="full-width column wrap  items-start content-start q-pa-lg">
        <div class="full-width row justify-between q-pb-sm">
            <p class="text-h4">Product Variants</p>
            <q-btn color="secondary" label="+ Variant" @click="openCreate" outline size="md" padding="sm" />
        </div>
        <q-separator class="full-width row" color="orange" inset />
        <div class="full-width column wrap">
            <ProductVariantsList />
        </div>
    </div>
</template>

<script setup lang="ts">
import ProductVariantsList from "@/components/admin/productVariant/ProductVariantsList.vue";
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