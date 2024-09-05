<template>
  <div class="q-pa-md full-width">
    <div class="row justify-between q-pa-sm">
      <p class="text-h4 text-secondary">Dashboard</p>
    </div>

    <div class="row q-mb-md">
      <div class="col-xs-12 col-md-4">
        <OrderCard />
      </div>
      <div class="col-xs-12 col-md-4">
        <CategoriesCard />
      </div>
      <div class="col-xs-12 col-md-4">
        <ProductsCard />
      </div>
    </div>

    <q-separator class="q-my-md q-mx-md" />

    <div class="row justify-between q-pa-sm">
      <p class="text-h4 text-secondary">Sales</p>
    </div>

    <div>
      <AdminChart />
    </div>

    <q-separator class="q-my-md q-mx-md" />

    <div class="row q-mb-md">
      <div class="col-xs-12 col-md-4">
        <PromotionsCard />
      </div>
      <div class="col-xs-12 col-md-4">
        <EnquiriesCard />
      </div>
      <div class="col-xs-12 col-md-4">
        <UsersCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import AdminChart from "@/components/admin/dashboard/AdminChart.vue";
import OrderCard from "@/components/admin/dashboard/cards/OrderCard.vue";
import CategoriesCard from "@/components/admin/dashboard/cards/CategoriesCard.vue";
import ProductsCard from "@/components/admin/dashboard/cards/ProductsCard.vue";
import PromotionsCard from "@/components/admin/dashboard/cards/PromotionsCard.vue";
import EnquiriesCard from "@/components/admin/dashboard/cards/EnquiriesCard.vue";
import UsersCard from "@/components/admin/dashboard/cards/UsersCard.vue";

@Component({
  name: "AdminDashboard",
  components: {
    AdminChart,
    OrderCard,
    CategoriesCard,
    ProductsCard,
    PromotionsCard,
    EnquiriesCard,
    UsersCard,
  },
})
export class AdminDashboard extends Vue {}
export default toNative(AdminDashboard);
</script>
