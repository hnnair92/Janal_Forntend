<template>
  <div class="full-width column wrap items-start content-start">
    <div class="q-pa-sm full-width">
      <q-table
        :rows="categoriesList"
        :columns="columns"
        row-key="name"
        flat
        v-model:pagination="pagination"
        :loading="loading"
        @request="updatePagination"
      >
        <template v-slot:body-cell-image="props">
          <q-td :props="props">
            <div class="d-flex" align="center">
              <!-- Use v-for to loop through the images list -->
              <q-avatar
                v-for="image in props.row.images"
                :key="image"
                square
                size="125px"
              >
                <img :src="image.large_image" />
              </q-avatar>
            </div>
          </q-td>
        </template>
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
            <div class="d-flex" align="center">
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
    </div>
  </div>
</template>

<script lang="ts">
import { CategoriesService, Category } from "@/openapi";
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";

@Component({
  name: "AdminCategoryIndex",
})
export class AdminCategoryIndex extends Vue {
  categoriesList: Array<Category> = [];

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
    {
      name: "is_enabled",
      align: "center",
      label: "Active",
      field: "is_enabled",
      sortable: false,
    },
    { name: "image", align: "center", label: "Image", field: "image" },
    { name: "actions", align: "center", label: "Action" },
  ];

  pagination = {
    rowsPerPage: 10,
    page: 1,
    rowsNumber: 0,
  };

  // get totalPages() {

  //     return Math.ceil(this.totalItems / this.itemsPerPage);
  // }

  mounted() {
    this.loadData();
  }

  @Watch("pagination", { deep: true })
  loadData() {
    this.loading = true;
    CategoriesService.categoriesList(
      this.pagination.page,
      this.pagination.rowsPerPage
    )
      .then((res: any) => {
        this.categoriesList = res.results;
        this.pagination.rowsNumber = res.count; // Update the totalItems with the server's total count
      })
      .finally(() => (this.loading = false));
  }
  updatePagination(props: any) {
    this.pagination = props.pagination;
  }

  handleButtonClick(rowData: Category) {
    // Perform the desired action using the rowData from the clicked row
    // For example, you can access rowData.id, rowData.name, or any other property as needed.
    this.$router.push(`/pages-admin/products/categories/${rowData.id}/edit`);
  }
}
export default toNative(AdminCategoryIndex);
</script>

<style lang="scss" scoped></style>
