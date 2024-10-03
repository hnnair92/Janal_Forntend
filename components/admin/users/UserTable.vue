<template>
  <div class="full-width column wrap items-start content-start">
    <div class="row full-width justify-end">
      <q-btn
        color="secondary"
        size="md"
        unelevated
        to="/pages-admin/users/create/"
        class="q-ma-md"
        ><q-icon name="add" class="q-pr-sm" /> Create User</q-btn
      >
    </div>
    <div class="full-width row q-pa-md">
      <div class="col-8">
        <label class="text-secondary">You can search by name or email.</label>
        <q-input
          v-model="searchText"
          type="text"
          outlined
          dense
          class="full-width"
          clearable
          @change="resetPagination"
        />
      </div>
      <div class="col-2 q-mt-lg q-px-xs">
        <q-btn
          color="secondary"
          icon="search"
          label="Search"
          unelevated
          class="q-ml-sm full-width"
          @click="resetPagination"
        />
      </div>
      <div class="col-2 q-mt-lg q-px-xs">
        <q-btn
          color="grey"
          icon="refresh"
          label="Reset"
          unelevated
          size="md"
          class="q-ml-sm full-width"
          @click="resetFilter"
        />
      </div>
    </div>
    <div class="q-pa-sm full-width">
      <q-table
        title="Users"
        :rows="users"
        :columns="columns"
        row-key="id"
        flat
        :rows-per-page-options="[10, 20, 50]"
        @row-click="handleRowClick"
      >
        <template #body-cell-name="props">
          <q-td :props="props">
            <div class="q-nowrap">
              {{ props.row.name }}
              <q-icon
                v-if="props.row.is_admin || props.row.is_superuser"
                name="security"
                color="secondary"
                size="sm"
              />

              <q-icon
                v-if="props.row.is_staff"
                name="badge"
                color="secondary"
                size="sm"
              />
            </div>
          </q-td>
        </template>
        <template #body-cell-is_active="props">
          <q-td :props="props">
            <q-icon
              v-if="props.row.is_active"
              name="check_circle"
              color="green"
              size="sm"
            />
            <q-icon v-else name="cancel" color="red" size="sm" />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";
import { AllFieldsUser, UsersService } from "@/openapi/";

@Component({
  name: "UserTable",
})
export class UserTable extends Vue {
  users: [] = [];
  searchText = "";
  pagination = {
    rowsPerPage: 10,
    page: 1,
    rowsNumber: 0,
  };

  columns: any = [
    {
      name: "id",
      required: true,
      label: "ID",
      align: "left",
      field: (row: any) => row.id,
      format: (val: any) => `${val}`,
      sortable: true,
    },
    {
      name: "name",
      label: "Name",
      field: "name",
      align: "left",
      sortable: true,
    },
    {
      name: "email",
      label: "Email",
      field: "email",
      align: "left",
    },
    {
      name: "last_login",
      label: "Last Login",
      field: "last_login",
      align: "left",
      format: (val: any) => {
        return val ? new Date(val).toLocaleString() : "Not Available";
      },
    },
    {
      name: "is_active",
      label: "Active",
      field: "is_active",
      align: "left",
    },
  ];

  @Watch("pagination", { deep: true })
  getAllUsers() {
    UsersService.usersList(
      this.searchText,
      this.pagination.page,
      this.pagination.rowsPerPage
    ).then((res: AllFieldsUser) => {
      this.users = res.results;
      this.users = this.users.sort((a: any, b: any) => a.id - b.id);
    });
  }

  handleRowClick(event: any, row: any) {
    this.$router.push(`/pages-admin/users/${row.id}`);
  }

  resetPagination() {
    this.pagination.page = 1;
    this.getAllUsers();
  }

  resetFilter() {
    this.searchText = "";
    this.resetPagination();
  }

  mounted() {
    this.getAllUsers();
  }
}
export default toNative(UserTable);
</script>

<style scoped>
#delete-icon {
  cursor: pointer;
}
</style>
