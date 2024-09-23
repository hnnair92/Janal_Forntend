<template>
  <div class="full-width column wrap items-start content-start q-pa-lg">
    <div class="full-width row justify-between q-pb-md">
      <div><p class="text-h4">Tax Management</p></div>
      <div>
        <q-btn
          color="secondary"
          label="+ Tax Rate"
          @click="openCreate"
          outline
          size="md"
          padding="sm"
        />
      </div>
    </div>

    <q-separator class="full-width row" color="orange" inset />

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
          <template v-slot:body-cell-gst_rate="props">
            <q-td :props="props"> {{ props.row.gst_rate }}% </q-td>
          </template>
          <template v-slot:body-cell-pst_rate="props">
            <q-td :props="props">
              <span v-if="props.row.pst_rate">{{ props.row.pst_rate }}%</span>
            </q-td>
          </template>
          <template v-slot:body-cell-hst_rate="props">
            <q-td :props="props">
              <span v-if="props.row.hst_rate">{{ props.row.hst_rate }}% </span>
            </q-td>
          </template>
          <template v-slot:body-cell-total_tax_rate="props">
            <q-td :props="props">
              {{ parseFloat(props.row.total_tax_rate) }}%
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                color="secondary"
                label="Edit"
                outline
                unelevated
                size="sm"
                @click="editClick(props.row)"
              />
              <q-btn
                class="q-ml-sm"
                color="red"
                label="Delete"
                outline
                unelevated
                size="sm"
                @click="deleteItem(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <q-dialog
      v-model="editDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center q-pb-sm">
          <div class="text-h6 text-secondary">
            {{ activeItem.id ? "Edit" : "Add" }} Tax
          </div>
        </q-card-section>
        <q-separator class="q-mx-md" />
        <q-card-section class="q-pa-none">
          <ErrorDisplay :errorResponse.sync="errorText" v-if="errorText" />
        </q-card-section>

        <q-card-section>
          <div class="q-pb-md">
            Note: Taxes are calculated on the base price.
            <ul>
              <li>
                GST: The federal Goods and Services Tax (GST) rate, which is 5%
                across all provinces.
              </li>
              <li>
                PST: The Provincial Sales Tax (PST) rate, applicable only in
                some provinces.
              </li>
              <li>
                HST: The Harmonized Sales Tax (HST) rate, applicable in specific
                provinces that combine GST and PST into a single tax.
              </li>
            </ul>
          </div>
          <label class="text-weight-medium q-pb-md">Province</label>
          <q-select
            outlined
            v-model="activeItem.province"
            :options="provinces"
            option-label="name"
            option-value="id"
            emit-value
            map-options
            dense
            class="q-my-sm"
          />
          <label class="text-weight-medium q-pb-md">GST Rate</label>
          <q-input
            class="q-my-sm"
            square
            v-model="activeItem.gst_rate"
            outlined
            type="number"
            dense
          ></q-input>
          <label class="text-weight-medium q-pb-md">PST Rate</label>
          <q-input
            class="q-my-sm"
            square
            v-model="activeItem.pst_rate"
            outlined
            type="number"
            dense
          ></q-input>
          <label class="text-weight-medium q-pb-md">HST Rate</label>
          <q-input
            class="q-my-sm"
            square
            v-model="activeItem.hst_rate"
            outlined
            type="number"
            dense
          ></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="editDialog = false" />
          <q-btn
            outline
            unelevated
            color="secondary"
            label="Save"
            @click="saveData"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <ConfirmDeleteDialog
      :isOpen="isDeleteOpen"
      @confirm="deleteConfirm"
      @update:isOpen="isDeleteOpen = $event"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative, Watch } from "vue-facing-decorator";
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog.vue";
import ErrorDisplay from "@/components/common/ErrorDisplay.vue";
import {
  ApiError,
  Province,
  ProvincesService,
  ProvinceTaxRate,
  ProvinceTaxRatesService,
} from "@/openapi/";
@Component({
  name: "TaxUtils",
  components: { ConfirmDeleteDialog, ErrorDisplay },
})
export class TaxUtils extends Vue {
  loading = false;
  isDeleteOpen = false;
  activeItem: ProvinceTaxRate = <ProvinceTaxRate>{};
  pagination = {
    rowsPerPage: 10,
    page: 1,
    rowsNumber: 0,
  };
  provinces: Array<Province> = Array<Province>();

  serverData: Array<ProvinceTaxRate> = Array<ProvinceTaxRate>();
  editDialog = false;
  errorText = "";

  columns: any = [
    {
      name: "province_name",
      align: "center",
      label: "Province",
      field: "province_name",
      sortable: false,
    },
    {
      name: "gst_rate",
      align: "center",
      label: "GST Rate",
      field: "gst_rate",
      sortable: false,
    },
    {
      name: "pst_rate",
      align: "center",
      label: "PST Rate",
      field: "pst_rate",
      sortable: false,
    },
    {
      name: "hst_rate",
      align: "center",
      label: "HST Rate",
      field: "hst_rate",
      sortable: false,
    },
    {
      name: "total_tax_rate",
      align: "center",
      label: "Total Tax Rate",
      field: "total_tax_rate",
      sortable: false,
    },
    {
      name: "actions",
      align: "center",
      label: "Actions",
      field: "actions",
      sortable: false,
    },
  ];

  mounted() {
    this.getAllProvinces();
  }

  @Watch("editDialog")
  dialogChanged() {
    if (!this.editDialog) {
      this.activeItem = <ProvinceTaxRate>{};
    }
  }

  getAllProvinces() {
    ProvincesService.provincesList().then((res: any) => {
      if (res && res.results) {
        this.provinces = res.results;
      }
    });
  }
  @Watch("pagination", { deep: true })
  getExistingTaxRates() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    ProvinceTaxRatesService.adminProvinceTaxList(
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

  openCreate() {
    this.editDialog = true;
    this.activeItem = <ProvinceTaxRate>{};
  }
  deleteItem(row: any) {
    this.isDeleteOpen = true;
    this.activeItem = row;
  }
  editClick(row: any) {
    this.editDialog = true;
    this.activeItem = row;
  }
  deleteConfirm() {
    if (!this.activeItem || !this.activeItem.id) return;

    ProvinceTaxRatesService.adminProvinceTaxDelete(this.activeItem.id)
      .then((res: any) => {
        this.$q.notify({
          message: "Deleted successfully",
          color: "red",
          position: "top",
          classes: "text-body1",
        });
        this.isDeleteOpen = false;
        this.activeItem = <ProvinceTaxRate>{};
        this.getExistingTaxRates();
      })
      .catch((err: any) => {
        this.$q.notify({
          message: "Failed to delete item",
          color: "red",
          position: "top",
          classes: "text-body1",
        });
      });
  }
  saveData() {
    if (!this.activeItem) return;

    this.errorText = "null";
    if (this.activeItem.id) {
      ProvinceTaxRatesService.adminProvinceTaxUpdate(
        this.activeItem.id,
        this.activeItem
      )
        .then((res: any) => {
          this.editDialog = false;
          this.getExistingTaxRates();
        })
        .catch((err: ApiError) => {
          if (err.body && err.status === 400) {
            this.errorText = err.body;
          } else {
            this.$q.notify({
              message: "Failed to save changes",
              color: "red",
              position: "top",
              classes: "text-body1",
            });
          }
        });
    } else {
      ProvinceTaxRatesService.adminProvinceTaxCreate(this.activeItem)
        .then((res: any) => {
          this.editDialog = false;
          this.getExistingTaxRates();
        })
        .catch((err: ApiError) => {
          if (err.body && err.status === 400) {
            this.errorText = err.body;
          } else {
            this.$q.notify({
              message: "Failed to save changes",
              color: "red",
              position: "top",
              classes: "text-body1",
            });
          }
        });
    }
  }
}
export default toNative(TaxUtils);
</script>
