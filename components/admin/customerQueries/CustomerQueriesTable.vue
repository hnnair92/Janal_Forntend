<template>
  <div class="full-width column wrap items-start content-start">
    <q-tabs v-model="activeTab" class="full-width">
      <q-tab name="pending">Pending</q-tab>
      <q-tab name="resolved">Resolved</q-tab>
    </q-tabs>

    <q-tab-panels v-model="activeTab" class="q-pa-sm full-width">
      <q-tab-panel name="pending">
        <q-table
          :rows="pendingData"
          :columns="columns"
          row-key="id"
          title="Pending Enquiries"
          flat
          :rows-per-page-options="[10, 20, 50]"
          no-data-label="No pending enquiries."
          style="width: 100%"
          @row-click="openDialog"
        >
          <template #body-cell-is_resolved="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.is_resolved"
                color="secondary"
                @click="updateIsResolved(props.row.id)"
              />
            </q-td>
          </template>

          <template #body-cell-actions="props">
            <q-td :props="props">
              <q-icon
                id="delete-icon"
                name="delete"
                size="sm"
                color="red"
                @click="confirmDelete(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>
      <q-tab-panel name="resolved">
        <q-table
          :rows="resolvedData"
          :columns="columns"
          row-key="id"
          title="Resolved Enquiries"
          flat
          :rows-per-page-options="[10, 20, 50]"
          no-data-label="No data available. Please switch to Pending tab to see new queries."
          style="width: 100%"
          @row-click="openDialog"
        >
          <template #body-cell-is_resolved="props">
            <q-td :props="props">
              <q-checkbox
                v-model="props.row.is_resolved"
                color="secondary"
                @click="updateIsResolved(props.row.id)"
              />
            </q-td>
          </template>

          <template #body-cell-actions="props">
            <q-td :props="props">
              <q-icon
                id="delete-icon"
                name="delete"
                size="sm"
                color="red"
                @click="confirmDelete(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>
    </q-tab-panels>

    <q-dialog v-model="dialogVisible">
      <q-card>
        <div class="row full-width justify-between q-pa-sm">
          <q-card-section
            >Message from
            <span class="text-bold">{{
              selectedRow?.name
            }}</span></q-card-section
          >
          <q-icon
            name="cancel"
            color="red"
            size="sm"
            style="cursor: pointer"
            class="q-mt-sm"
            @click="closeDialog"
          />
        </div>
        <q-separator class="q-mx-md" />
        <q-card-section>{{ selectedRow?.message }}</q-card-section>
        <q-card-actions align="right">
          <q-btn color="secondary" label="Close" @click="closeDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDeleteDialog">
      <q-card>
        <q-card-section>
          <q-card-title class="text-bold">Confirm Delete!</q-card-title>
          <br />
          <q-card-text>
            Are you sure you want to delete this enquiry?
          </q-card-text>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="secondary" flat @click="cancelDelete" />
          <q-btn
            label="Delete"
            color="negative"
            @click="deleteMessage(selectedItem)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { ref } from "vue";
import { PublicService, ContactUsFormData, AdminService } from "@/openapi";

@Component({
  name: "CustomerQueriesTable",
})
export class CustomerQueriesTable extends Vue {
  customerData = [];
  selectedItem = null;
  showDeleteDialog = false;
  showResolveDialog = false;
  val = ref(false);
  activeTab = "pending";
  characterLimit = 150;
  dialogVisible: boolean = false;
  selectedRow: any = null;

  columns: any = [
    {
      name: "id",
      required: true,
      label: "ID",
      align: "left",
      field: (row: any) => row.id,
      format: (val: any) => `${val}`,
      sortable: false,
    },
    {
      name: "name",
      label: "Name",
      field: "name",
      align: "left",
      sortable: false,
    },
    {
      name: "phone",
      label: "Phone",
      field: "phone_number",
      align: "left",
      format: (val: any) => {
        // Format phone number as xxx-yyy-zzzz
        return val.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      },
    },
    {
      name: "email",
      label: "Email",
      field: "email",
      align: "left",
    },
    {
      name: "message",
      label: "Message",
      field: (row: any) => this.truncateMessage(row.message),
      align: "left",
      style:
        "width: 300px; white-space: normal; word-wrap: break-word; line-height: 1.5;",
    },
    {
      name: "is_resolved",
      label: "Resolved",
      field: "is_resolved",
      align: "left",
    },
    {
      name: "actions",
      label: "Actions",
      align: "center",
      field: "actions",
      format: (_val: any, row: any) => {
        return {
          slot: "actions",
          row,
        };
      },
    },
  ];

  openDialog(_event: MouseEvent, row: any) {
    if (row) {
      this.selectedRow = row;
      this.dialogVisible = true;
    }
  }

  closeDialog() {
    this.dialogVisible = false;
  }

  getAllCustomerQueries() {
    AdminService.adminContactUsList().then((res: any) => {
      this.customerData = res.results;
    });
  }

  confirmDelete(item: any) {
    this.selectedItem = item;
    this.showDeleteDialog = true;
  }

  cancelDelete() {
    this.selectedItem = null;
    this.showDeleteDialog = false;
  }

  deleteMessage(id: any) {
    AdminService.adminContactUsDelete(id).then(() => {
      this.getAllCustomerQueries();
      this.$q.notify({
        message: "Deleted Successfully!",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
      this.showDeleteDialog = false;
      this.selectedItem = null;
    });
  }

  get pendingData() {
    return this.customerData.filter(
      // eslint-disable-next-line prettier/prettier
      (item: ContactUsFormData) => !item.is_resolved
    );
  }

  get resolvedData() {
    return this.customerData.filter(
      // eslint-disable-next-line prettier/prettier
      (item: ContactUsFormData) => item.is_resolved
    );
  }

  updateIsResolved(row: any) {
    AdminService.adminContactUsPartialUpdate(
      row,
      // eslint-disable-next-line prettier/prettier
      this.customerData.filter((obj: ContactUsFormData) => obj.id === row)[0]
    ).then(() => {
      this.$q.notify({
        message: "Enquiry status updated",
        color: "green",
        position: "top",
        classes: "text-body1",
      });
    });
  }

  truncateMessage(message: any) {
    if (message.length > this.characterLimit) {
      return message.substring(0, this.characterLimit) + "..."; // Truncate the message if it exceeds the character limit
    }
    return message;
  }

  mounted() {
    this.getAllCustomerQueries();
  }
}
export default toNative(CustomerQueriesTable);
</script>

<style scoped>
#delete-icon {
  cursor: pointer;
}
</style>
