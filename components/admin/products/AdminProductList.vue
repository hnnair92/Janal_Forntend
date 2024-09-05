<template>
  <div class="full-width column wrap items-start content-start q-pt-md">
    <div class="q-pa-sm full-width">
      <q-card flat class="q-pa-sm">
        <div class="row q-mb-sm q-pa-sm">
          <div class="col-10">
            <label class="text-secondary"
              >You can search by product name, category name</label
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
          :rows="productList"
          :columns="columns"
          row-key="name"
          flat
          v-model:pagination="pagination"
          :loading="loading"
          @request="updatePagination"
        >
          <!-- <template v-slot:body-cell-image="props">
                    <q-avatar square size="128px">
                        <img :src="props.row.image" />
                    </q-avatar>
                </template> -->
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
import { ProductsService, Product } from "@/openapi";
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";

@Component({
  name: "AdminProductIndex",
})
export class AdminProductIndex extends Vue {
  productList: Array<Product> = [];

  loading = false;

  searchText = "";
  columns: any = [
    { name: "id", align: "center", label: "ID", field: "id", sortable: false },
    {
      name: "name",
      align: "center",
      label: "Category",
      field: "category_name",
      sortable: false,
    },
    {
      name: "name",
      align: "center",
      label: "Product Name",
      field: "name",
      sortable: false,
    },
    // { name: "image", align: "center", label: "Image", field: "image" },
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
    ProductsService.productsList(
      this.searchText,
      this.pagination.page,
      this.pagination.rowsPerPage
    )
      .then((res: any) => {
        this.productList = res.results;
        this.pagination.rowsNumber = res.count;
      })
      .finally(() => (this.loading = false));
  }
  updatePagination(props: any) {
    this.pagination = props.pagination;
  }

  handleButtonClick(rowData: Product) {
    // Perform the desired action using the rowData from the clicked row
    // For example, you can access rowData.id, rowData.name, or any other property as needed.
    (this as any).$router.push(`/pages-admin/products/${rowData.id}/edit`);
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
export default toNative(AdminProductIndex);
</script>

<style lang="scss" scoped></style>
