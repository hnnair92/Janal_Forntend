<template>
  <div class="full-width column wrap items-start content-start q-pt-md">
    <div class="q-pa-sm full-width">
      <q-card flat>
        <q-tabs
          v-model="tab"
          dense
          class="text-black q-pa-md"
          active-color="secondary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="pending" label="Pending" />
          <q-tab name="shipped" label="Shipped" />
          <q-tab name="all" label="all" />

          <!-- <q-tab name="movies" label="Movies" /> -->
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="pending">
            <OrderViewCards tab="pending"></OrderViewCards>
          </q-tab-panel>

          <q-tab-panel name="shipped">
            <OrderViewCards tab="shipped"></OrderViewCards>
          </q-tab-panel>

          <q-tab-panel name="all">
            <OrderViewCards tab="all"></OrderViewCards>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { AdminService, AdminOrder } from "@/openapi";
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";
import OrderViewCards from "@/components/admin/orders/sections/OrderViewCards.vue";
@Component({
  name: "AdminOrderList",
  components: { OrderViewCards },
})
export class AdminOrderList extends Vue {
  // serverData: Array<AdminOrder> = Array<AdminOrder>();

  // loading = false;
  tab = "pending";
  // columns:any= [
  //     { name: 'customer_order_id', align: 'center', label: 'Order ID', field: 'customer_order_id', sortable: false },
  //     { name: 'items', align: 'center', label: 'Order Items', field: 'items', sortable: false },
  //     { name: 'shipping_address', align: 'center', label: 'Shipping Address', field: 'shipping_address', sortable: false },
  //     { name: 'sale_total', align: 'center', label: 'Total Sales', field: 'sale_total', sortable: false },
  //     { name: 'tax', align: 'center', label: 'Tax', field: 'tax', sortable: false },
  //     { name: 'created_on', align: 'center', label: 'Created On', field: 'created_on', sortable: false },
  //     { name: 'actions', align: 'center', label: 'Action' },
  // ]

  // pagination = {
  //     rowsPerPage: 10,
  //     page: 1,
  //     rowsNumber: 0
  // };

  // mounted() {
  //     this.loadData();
  // }

  // @Watch("pagination", { deep: true })
  // loadData() {
  //     this.loading = true;
  //     AdminService.adminOrdersList(this.pagination.page, this.pagination.rowsPerPage)
  //         .then((res: any) => {
  //             this.serverData = res.results;
  //             this.pagination.rowsNumber = res.count;
  //             // this.pagination.page = res.page;
  //         }).finally(() => this.loading = false);
  // }
  // updatePagination(props: any) {
  //     this.pagination = props.pagination
  // }

  // handleButtonClick(rowData: AdminOrder) {
  //     // Perform the desired action using the rowData from the clicked row
  //     // For example, you can access rowData.id, rowData.name, or any other property as needed.
  //     (this as any).$router.push(`/pages-admin/promotions/${rowData.id}/edit`)
  // }
}

export default toNative(AdminOrderList);
</script>

<style scoped>
.add-border {
  border: 1px solid #edce68;
}
</style>
