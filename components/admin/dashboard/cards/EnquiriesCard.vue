<template>
  <q-card
    flat
    bordered
    class="my-card q-pa-sm q-ma-sm"
    style="cursor: pointer"
    @click="enquiries"
  >
    <q-card-section>
      <q-icon name="package" />
      <div>
        <div class="text-h4 text-bold row justify-center">
          <div class="column items-center text-secondary">Enquiries</div>
        </div>
        <div class="text-subtitle2 q-mt-sm column items-center">
          <span class="text-h6">New</span>
          <div>
            <span class="text-h3">{{ newEnquiries }}</span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <div class="row justify-between full-width">
        <div class="column items-center">
          <q-btn flat class="text-subtitle2">Pending</q-btn>
          <div>
            <span>{{ pendingEnquiries }}</span>
          </div>
        </div>
        <div class="column items-center">
          <q-btn flat>Resolved</q-btn>
          <div>
            <span>{{ resolvedEnquiries }}</span>
          </div>
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { AdminService, PublicService } from "@/openapi";

@Component({
  name: "EnquiriesCard",
})
export class EnquiriesCard extends Vue {
  serverData = null;
  pendingEnquiries: number = 0;
  totalEnquiries: number = 0;
  resolvedEnquiries: number = 0;

  getNewEnquiries() {
    const today = new Date().toISOString().split("T")[0];
    return (this as any).serverData?.results.filter(
      // eslint-disable-next-line prettier/prettier
      (obj: any) => obj.created_on.split("T")[0] === today
    ).length;
  }

  get newEnquiries() {
    return this.getNewEnquiries();
  }

  enquiries() {
    this.$router.push(`/pages-admin/customer-queries/`);
  }

  getAllEnquiries() {
    AdminService.adminContactUsList().then((res) => {
      (this as any).serverData = res;
      this.pendingEnquiries = res.results.filter(
        // eslint-disable-next-line prettier/prettier
        (obj) => !obj.is_resolved
      ).length;
      this.resolvedEnquiries = res.count - this.pendingEnquiries;
    });
  }

  mounted() {
    this.getAllEnquiries();
  }
}
export default toNative(EnquiriesCard);
</script>
