<template>
  <div class="q-d-flex q-flex-grow-1">
    <!-- Skeleton loader-->
    <div class="q-pa-md q-d-flex q-flex-grow-1 row" v-if="loading">
      <div class="col-12 q-pa-sm">
        <q-card flat>
          <div>
            <div class="row items-start no-wrap q-mt-sm">
              <q-skeleton size="56px" square animation="fade" />

              <div class="col q-pl-sm">
                <q-skeleton type="text" square width="30%" animation="fade" />
                <q-skeleton type="text" square height="12px" animation="fade" />
                <q-skeleton
                  type="text"
                  square
                  height="12px"
                  width="75%"
                  animation="fade"
                />
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div v-else-if="myOrders && myOrders.length">
      <div v-for="order in myOrders">
        <OrderCard :orderInfo="order" :enableControl="false"></OrderCard>
      </div>
    </div>
    <div v-else>
      <p>No Orders Found</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { CustomerOrder, CustomerService } from "@/openapi/";
import OrderCard from "@/components/admin/orders/sections/OrderCard.vue";
@Component({
  name: "CustomerOrdersTab",
  components: { OrderCard },
})
export class CustomerOrdersTab extends Vue {
  myOrders: Array<CustomerOrder> = Array<CustomerOrder>();
  mounted() {
    this.getOrders();
  }
  loading = false;
  getOrders() {
    this.loading = true;
    CustomerService.customerOrdersList()
      .then((result: Array<CustomerOrder>) => {
        this.myOrders = result;
      })
      .finally(() => (this.loading = false));
  }
}
export default toNative(CustomerOrdersTab);
</script>
