<template>
  <q-card flat bordered class="my-card q-pa-sm q-ma-sm">
    <q-card-section style="cursor: pointer" @click="orders">
      <q-icon name="package" />
      <div>
        <div class="text-h4 text-bold row justify-center">
          <div class="column items-center text-secondary">Orders</div>
        </div>
        <div class="text-subtitle2 q-mt-sm column items-center">
          <span class="text-h6">New</span>
          <div>
            <span class="text-h3">{{ orderReceivedToday }}</span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <div class="row justify-between full-width">
        <div class="column items-center">
          <q-btn
            flat
            class="text-subtitle2"
            style="cursor: pointer"
            @click="orders"
            >Pending</q-btn
          >
          <div>
            <span>{{ pendingCount }}</span>
          </div>
        </div>
        <div class="column items-center">
          <q-btn flat style="cursor: pointer" @click="orders">Shipped</q-btn>
          <div>
            <span>{{ shippedCount }}</span>
          </div>
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { AdminService } from "@/openapi";

@Component({
  name: "OrderCard",
})
export class OrderCard extends Vue {
  serverData = undefined;
  searchQuery = "";

  countOrderReceivedToday() {
    const today = new Date().toISOString().split("T")[0];
    return (this as any).serverData?.results.filter(
      // eslint-disable-next-line prettier/prettier
      (obj: any) => obj.created_on.split("T")[0] === today
    ).length;
  }

  countStatusOccurrences(status: string): number {
    return (this as any).serverData?.results.filter(
      // eslint-disable-next-line prettier/prettier
      (obj: any) => obj.status === status
    ).length;
  }

  get pendingCount(): number {
    return this.countStatusOccurrences("pending");
  }

  get shippedCount(): number {
    return this.countStatusOccurrences("shipped");
  }

  get orderReceivedToday(): number {
    return this.countOrderReceivedToday();
  }

  orders() {
    this.$router.push(`/pages-admin/orders/`);
  }

  mounted() {
    AdminService.adminOrdersList(undefined, undefined, undefined, "all").then(
      (res) => {
        (this as any).serverData = res;
        // eslint-disable-next-line prettier/prettier
      }
    );
  }
}
export default toNative(OrderCard);
</script>
