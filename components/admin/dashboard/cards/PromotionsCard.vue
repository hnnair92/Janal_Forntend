<template>
  <q-card flat bordered class="my-card q-pa-sm q-ma-sm">
    <q-card-section>
      <q-icon name="package" />
      <div style="cursor: pointer" @click="promotions">
        <div class="text-h4 text-bold row justify-center">
          <div class="column items-center text-secondary">Promotions</div>
        </div>
        <div class="text-subtitle2 q-mt-sm column items-center">
          <span class="text-h6">Active</span>
          <div>
            <span class="text-h3">{{ active }}</span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <div class="row justify-between full-width">
        <div
          class="column items-center"
          style="cursor: pointer"
          @click="promotions"
        >
          <q-btn flat class="text-subtitle2">Total</q-btn>
          <div>
            <span>{{ count }}</span>
          </div>
        </div>
        <div
          class="column items-center"
          style="cursor: pointer"
          @click="addNew"
        >
          <q-btn flat>Add New</q-btn>
          <div>
            <span><q-icon name="add_circle" size="sm" /></span>
          </div>
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { CampaignsService } from "@/openapi";

@Component({
  name: "PromotionsCard",
})
export class PromotionsCard extends Vue {
  serverData = null;
  count: number = 0;
  active: number = 0;

  promotions() {
    this.$router.push(`/pages-admin/promotions/`);
  }

  addNew() {
    this.$router.push(`/pages-admin/promotions/create/`);
  }

  mounted() {
    CampaignsService.campaignsList().then((res) => {
      (this as any).serverData = res;
      this.count = res.count;
      this.active = res.results?.filter(
        (obj) => obj.is_enabled === true
      ).length;
    });
  }
}
export default toNative(PromotionsCard);
</script>
