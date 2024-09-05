<template>
    <div class="full-width column wrap items-start content-start q-pa-lg">
        <AdminOrderList />
    </div>
</template>

<script setup lang="ts">
import AdminOrderList from "@/components/admin/orders/AdminOrderList.vue";
const router = useRouter();
definePageMeta({
    layout: 'admin',
    middleware: [
        'auth'
    ],
});
useHead({
    title: `Orders`,
    meta: [
        {
            name: 'description',
            content:
                '',
        },
    ],
});

</script>

<style lang="scss" scoped></style>