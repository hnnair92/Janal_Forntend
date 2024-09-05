<template>
  <div class="full-width column wrap items-start content-start q-pt-md">
    <div class="q-pa-sm full-width">
      <q-card flat class="q-pa-sm">
        <div class="row q-mb-sm q-pa-sm">
          <div class="col-10">
            <label class="text-secondary"
              >You can search by Fabric Name, Color Name</label
            >
            <q-input v-model="searchText" type="text" outlined dense />
          </div>
          <div class="col-1 q-mt-lg q-px-sm">
            <q-btn
              class="q-mx-sm full-width"
              color="secondary"
              icon="search"
              label="Search"
              @click="resetPagination"
              unelevated
            />
          </div>
          <div class="col-1 q-mt-lg q-px-sm">
            <q-btn
              class="q-mx-sm full-width"
              color="grey"
              icon="refresh"
              label="Reset"
              @click="resetFilter"
              unelevated
            />
          </div>
        </div>
        <q-table
          :rows="productPricingList"
          :columns="columns"
          row-key="name"
          flat
          wrap-cells
          v-model:pagination="pagination"
          :loading="loading"
          @request="updatePagination"
        >
          <template v-slot:body-cell-colors="props">
            <q-td :props="props">
              <div>{{ props.row.colors }}</div>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div align="center">
                <q-btn
                  @click="handleButtonClick(props.row)"
                  color="primary"
                  label="Edit"
                  flat
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import {
  AdminProductFabricsColors,
  AdminProductFabricsService,
  SimpleFabricOptions,
} from "@/openapi";
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";

@Component({
  name: "AdminProductPricingList",
})
export class AdminProductPricingListIndex extends Vue {
  productPricingList: Array<SimpleFabricOptions> = [];

  loading = false;

  searchText = "";
  columns: any = [
    {
      name: "fabric_name",
      align: "center",
      label: "Fabric Name",
      field: "fabric_name",
      sortable: false,
      classes: "q-table--col-auto-width",
    },
    {
      name: "product_name",
      align: "center",
      label: "Product Name",
      field: "product_name",
      sortable: false,
      classes: "q-table--col-auto-width",
    },
    {
      name: "colors",
      align: "center",
      label: "Colors",
      field: "colors",
      sortable: false,
      classes: "q-table--col-auto-width",
    },
    // { name: "image", align: "center", label: "Image", field: "image" },
    {
      name: "actions",
      align: "center",
      label: "Action",
      classes: "q-table--col-auto-width",
    },
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
    AdminProductFabricsService.adminProductFabricsList(
      this.searchText,
      this.pagination.page,
      this.pagination.rowsPerPage
    )
      .then((res: any) => {
        this.productPricingList = res.results;
        this.pagination.rowsNumber = res.count;
      })
      .finally(() => (this.loading = false));
  }
  updatePagination(props: any) {
    this.pagination = props.pagination;
  }

  handleButtonClick(rowData: AdminProductFabricsColors) {
    // Perform the desired action using the rowData from the clicked row
    // For example, you can access rowData.id, rowData.name, or any other property as needed.
    (this as any).$router.push(
      `/pages-admin/products/pricing/${rowData.id}/edit`
    );
  }
  resetPagination() {
    this.pagination.page = 1;
    this.loadData();
  }
  resetFilter() {
    this.searchText = "";
    this.resetPagination();
  }
}
export default toNative(AdminProductPricingListIndex);
</script>

<style lang="scss" scoped></style>
