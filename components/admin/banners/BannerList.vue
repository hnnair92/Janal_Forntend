<template>
  <div class="full-width column wrap items-start content-start q-pt-md">
    <div class="q-pa-sm full-width">
      <q-table
        :rows="serverData"
        :columns="columns"
        row-key="name"
        flat
        v-model:pagination="pagination"
        :loading="loading"
        @request="updatePagination"
      >
        <template v-slot:body-cell-is_enabled="props">
          <q-td :props="props">
            <q-icon
              v-if="props.row.is_enabled"
              name="done"
              color="green"
              size="md"
            />
            <q-icon v-else name="close" color="red" size="md" />
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div align="center">
              <q-btn
                @click="handleButtonClick(props.row)"
                color="secondary"
                label="Edit"
                flat
              />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-created_on="props">
          <q-td :props="props">
            {{ $dayjs(props.row.created_on).format("LLL") }}
          </q-td>
        </template>
        <template v-slot:body-cell-color_options="props">
          <q-td :props="props">
            <div v-for="color in props.row.color_options">
              {{ color.color_name }}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import {
  AdminBannerManagementService,
  CampaignsService,
  Promotion,
} from "@/openapi";
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";

@Component({
  name: "PromotionsList",
})
export class BannerList extends Vue {
  serverData: Array<Promotion> = Array<Promotion>();

  loading = false;

  columns: any = [
    {
      name: "name",
      align: "center",
      label: "Banner Name",
      field: "name",
      sortable: false,
    },
    {
      name: "is_enabled",
      align: "center",
      label: "Active",
      field: "is_enabled",
      sortable: false,
    },
    {
      name: "start_date",
      align: "center",
      label: "Start Date",
      field: "start_date",
      sortable: false,
    },
    {
      name: "end_date",
      align: "center",
      label: "End Date",
      field: "end_date",
      sortable: false,
    },
    {
      name: "created_on",
      align: "center",
      label: "Created On",
      field: "created_on",
      sortable: false,
    },
    { name: "actions", align: "center", label: "Action" },
  ];

  pagination = {
    rowsPerPage: 10,
    page: 1,
    rowsNumber: 0,
  };

  mounted() {
    // this.loadData();
  }

  @Watch("pagination", { deep: true })
  loadData() {
    this.loading = true;
    AdminBannerManagementService.adminBannersList(
      this.pagination.page,
      this.pagination.rowsPerPage
    )
      .then((res: any) => {
        this.serverData = res.results;
        this.pagination.rowsNumber = res.count;
        // this.pagination.page = res.page;
      })
      .finally(() => (this.loading = false));
  }
  updatePagination(props: any) {
    this.pagination = props.pagination;
  }

  handleButtonClick(rowData: Promotion) {
    // Perform the desired action using the rowData from the clicked row
    // For example, you can access rowData.id, rowData.name, or any other property as needed.
    (this as any).$router.push(`/pages-admin/banners/${rowData.id}/edit`);
  }
}
export default toNative(BannerList);
</script>

<style scoped>
.add-border {
  border: 1px solid #edce68;
}
</style>
