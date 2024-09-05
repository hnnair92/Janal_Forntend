<template>
  <div class="full-width column wrap items-start content-start q-pt-md">
    <div class="q-pa-sm full-width">
      <q-card flat class="q-pa-sm">
        <div class="row q-mb-sm q-pa-sm justify-end">
          <div class="col-10">
            <label class="text-secondary"
              >You can search by fabric name, product name, color name</label
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
          :rows="serverData"
          :columns="columns"
          row-key="name"
          flat
          v-model:pagination="pagination"
          :loading="loading"
          @request="updatePagination"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div align="center">
                <q-btn
                  @click="priceEditClick(props.row)"
                  class="q-ml-sm"
                  color="green"
                  label="Prices"
                  unelevated
                  outline
                />
                <q-btn
                  class="q-ml-sm"
                  @click="handleButtonClick(props.row)"
                  color="secondary"
                  label="Edit"
                  unelevated
                  outline
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
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { FabricOptionsService, FabricOptions } from "@/openapi";
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";

@Component({
  name: "ProductVariantsList",
})
export class ProductVariantsList extends Vue {
  serverData: Array<FabricOptions> = Array<FabricOptions>();

  loading = false;
  searchText = "";
  columns: any = [
    {
      name: "fabric_name",
      align: "center",
      label: "Fabric Name",
      field: "fabric_name",
      sortable: false,
    },
    {
      name: "product_name",
      align: "center",
      label: "Product",
      field: "product_name",
    },
    {
      name: "color_options",
      align: "center",
      label: "Color Options",
      field: "color_options",
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
    FabricOptionsService.fabricOptionsList(
      this.searchText,
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

  handleButtonClick(rowData: FabricOptions) {
    // Perform the desired action using the rowData from the clicked row
    // For example, you can access rowData.id, rowData.name, or any other property as needed.
    (this as any).$router.push(
      `/pages-admin/products/variant/${rowData.id}/edit`
    );
  }

  priceEditClick(rowData: FabricOptions) {
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
export default toNative(ProductVariantsList);
</script>

<style scoped>
.thumbnail {
  height: 200px;
  width: 200px;
}

.upload-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.add-border {
  border: 1px solid #edce68;
}
</style>
