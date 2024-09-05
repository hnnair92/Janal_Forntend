<template>
  <div class="full-width column wrap items-start content-start">
    <div class="q-pa-sm full-width">
      <q-table
        :rows="optionsList"
        :columns="columns"
        row-key="name"
        flat
        v-model:pagination="pagination"
        :loading="loading"
        @request="updatePagination"
      >
        <!-- Add a button in the actions column -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div align="center">
              <q-btn
                @click="handleButtonClick(props.row)"
                color="secondary"
                label="Edit"
                outline
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import { DynamicAttribute, DynamicAttributesService } from "@/openapi";
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";

@Component({
  name: "ProductOptionsList",
})
export class ProductOptionsList extends Vue {
  optionsList: Array<DynamicAttribute> = [];
  loading = false;

  columns: any = [
    { name: "id", align: "center", label: "ID", field: "id", sortable: false },
    {
      name: "name",
      align: "center",
      label: "Category Name",
      field: "name",
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
    this.loadData();
  }

  updatePagination(props: any) {
    this.pagination = props.pagination;
  }

  @Watch("pagination", { deep: true })
  loadData() {
    DynamicAttributesService.dynamicAttributesList(
      this.pagination.page,
      this.pagination.rowsPerPage
    ).then((res: any) => {
      this.optionsList = res.results;
      this.pagination.rowsNumber = res.count; // Update the totalItems with the server's total count
    });
  }
  handleButtonClick(rowData: DynamicAttribute) {
    // Perform the desired action using the rowData from the clicked row
    // For example, you can access rowData.id, rowData.name, or any other property as needed.
    this.$router.push(`/pages-admin/products/options/${rowData.id}/edit`);
  }
}
export default toNative(ProductOptionsList);
</script>

<style lang="scss" scoped></style>
