<template>
  <Loading :isLoading="loading"></Loading>
  <div class="full-width column wrap items-start content-start">
    <div class="q-pa-sm q-d-flex column full-width">
      <div class="q-flex-grow-1 row justify-end q-mb-sm">
        <q-btn
          color="grey"
          icon="arrow_left"
          unelevated
          outline
          class="q-mx-sm"
        />
        <div class="q-pt-sm">
          {{ startRecord }} - {{ endRecord }} of {{ pagination.rowsNumber }}
        </div>
        <q-btn
          color="grey"
          icon="arrow_right"
          unelevated
          outline
          size="md"
          class="q-mx-sm"
        />
      </div>
      <q-input
        v-model="searchQuery"
        color="secondary"
        type="text"
        label="Search order here"
        outlined
        dense
        clearable
        debounce="500"
        class="q-mb-sm"
      />
      <div
        class="q-pa-sm"
        v-for="(order, i) in serverData"
        :key="`order-id-${i}`"
        v-if="serverData.length"
      >
        <OrderCard :orderInfo="order" @ship-order="shipOrderEvent"></OrderCard>
      </div>
      <div v-else class="q-pa-md text-center">
        <p class="text-subtitle2">No results found!</p>
      </div>
    </div>
    <q-dialog v-model="shippingConfirm" persistent>
      <q-card
        class="q-pa-md"
        :style="{ width: $q.platform.is.mobile ? '100%' : '50%' }"
      >
        <q-card-section>
          <div class="text-h6">Tracking information</div>
        </q-card-section>
        <q-card-section class="column">
          <label class="text-weight-medium">Tracking Partner Name</label>
          <q-input
            v-model="shipOrder.tracking_partner_name"
            outlined
            type="text"
            dense
            class="q-py-sm"
            color="secondary"
            :rules="validationRules.required"
            clearable
          ></q-input>
          <label class="text-weight-medium q-mt-md">Tracking ID</label>
          <q-input
            v-model="shipOrder.tracking_id"
            outlined
            type="text"
            dense
            class="q-py-sm"
            color="secondary"
            :rules="validationRules.required"
            clearable
          ></q-input>
          <label class="text-weight-medium q-mt-md">Tracking Link</label>
          <q-input
            v-model="shipOrder.tracking_partner_link"
            outlined
            type="text"
            dense
            class="q-py-sm"
            color="secondary"
            clearable
          ></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="shippingConfirm = false" />
          <q-btn
            unelevated
            label="Ship"
            color="secondary"
            @click="finalShipOrder"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { AdminService, AdminOrder } from "@/openapi";
import { Component, Vue, Watch, Prop, toNative } from "vue-facing-decorator";
import OrderCard from "@/components/admin/orders/sections/OrderCard.vue";
import Loading from "@/components/public/Loading.vue";

@Component({
  name: "OrderViewCards",
  components: { OrderCard, Loading },
})
export class OrderViewCards extends Vue {
  @Prop({ required: true }) tab: any;

  serverData: Array<AdminOrder> = Array<AdminOrder>();
  searchQuery = "";

  loading = false;
  shippingConfirm = false;
  shipOrder: AdminOrder = <AdminOrder>{};

  pagination = {
    rowsPerPage: 10,
    page: 1,
    rowsNumber: 0,
  };

  validationRules = {
    required: [
      (val: any) => !!val || "This value cannot be empty. Field is required",
    ],
  };

  mounted() {
    this.loadData();
  }
  get startRecord() {
    if (this.pagination.page > 1) {
      return this.pagination.page * this.pagination.rowsPerPage;
    } else {
      return this.pagination.page;
    }
  }
  get endRecord() {
    if (this.pagination.page > 1) {
      return (
        this.pagination.page * this.pagination.rowsPerPage +
        this.pagination.rowsPerPage
      );
    } else {
      return this.pagination.rowsPerPage;
    }
  }

  // @Watch("pagination", { deep: true })
  @Watch("searchQuery")
  loadData() {
    this.loading = true;
    AdminService.adminOrdersList(
      this.searchQuery,
      this.pagination.page,
      this.pagination.rowsPerPage,
      this.tab
    )
      .then((res: any) => {
        this.serverData = res.results;
        this.pagination.rowsNumber = res.count;
        // this.pagination.page = res.page;
      })
      .finally(() => (this.loading = false));
  }
  resetPagination() {
    this.pagination.page = 1;
    this.loadData();
  }

  shipOrderEvent(order: AdminOrder) {
    this.shippingConfirm = true;
    this.shipOrder = order;
  }
  @Watch("shippingConfirm")
  shippingConfirmChange() {
    if (!this.shippingConfirm) {
      this.shipOrder = <AdminOrder>{};
    }
  }
  finalShipOrder() {
    if (
      !this.shipOrder.tracking_id ||
      !this.shipOrder.tracking_partner_link ||
      !this.shipOrder.tracking_partner_name
    ) {
      this.$q.notify({
        message: "All tracking information is required!",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
      return;
    }

    if (this.shipOrder && this.shipOrder.id) {
      AdminService.adminOrdersOrderShipped(
        this.shipOrder.id,
        this.shipOrder
      ).then(() => {
        const message = `Order ${this.shipOrder.customer_order_id} has been shipped`;
        this.$q.notify({
          message: message,
          color: "green",
          position: "top",
          classes: "text-body1",
        });
        this.resetPagination();
        this.shippingConfirm = false;
      });
    }
  }
}
export default toNative(OrderViewCards);
</script>

<style scoped>
.add-border {
  border: 1px solid #edce68;
}
</style>
