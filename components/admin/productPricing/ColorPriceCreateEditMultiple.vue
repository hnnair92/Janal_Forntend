<template>
  <div class="full-width column wrap items-start content-start q-pa-lg">
    <div class="full-width flex-grow-1 row justify-between q-pb-md">
      <div class="col column">
        <p class="text-h5">Manage Fabric Price</p>
        <p class="text-caption">
          You can create or update using the following screen. Please provide
          the values corresponding to each Height and Width combination
        </p>
      </div>

      <div class="q-mt-md flex-grow-1 col text-right">
        <q-btn
          label="+ Add Height"
          @click="showAddRowDialog"
          color="secondary"
          unelevated
        />
        <q-btn
          label="+ Add Width"
          class="q-ml-md"
          @click="showAddColumnDialog"
          color="secondary"
          unelevated
        />
      </div>
    </div>

    <q-separator class="full-width row q-mt-md" color="orange" inset />
    <AutoCompleteSelect
      class="q-pa-sm full-width"
      label="Select Fabric"
      v-model="selectedOptions"
    />
    <div class="full-width q-ma-md">
      <q-table
        :rows="matrixRows"
        :columns="matrixColumns"
        row-key="height"
        flat
        :wrap-cells="false"
        class="q-pa-md"
        v-model:pagination="pagination"
      >
        <template v-slot:header="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            <div class="q-table-header">
              <span
                :class="{ 'text-bold': col.name === 'height' || true }"
                class="q-mr-sm"
                >{{ col.label }}</span
              >
              <q-btn
                v-if="col.name !== 'height'"
                size="sm"
                outline
                label="Delete"
                color="negative"
                @click="removeColumn(col.name)"
              />
            </div>
          </q-th>
        </template>
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <div class="q-table-cell">
              <q-input
                v-if="props.col.name !== 'height'"
                v-model="props.row[props.col.name]"
                v-on:change="
                  updatePrice($event, props.row.height, props.col.name)
                "
                type="number"
                dense
                outlined
              />
              <span v-else class="text-bold q-mr-sm">{{
                props.row.height
              }}</span>
              <q-btn
                v-if="props.col.name === 'height'"
                size="sm"
                outline
                label="Delete"
                color="negative"
                @click="removeRow(props.row.height)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
      <div class="full-width text-right">
        <q-btn
          class="q-ma-sm"
          label="Cancel"
          color="grey"
          unelevated
          to="/pages-admin/products/pricing/"
        />
        <q-btn
          class="q-ma-sm"
          label="Save"
          color="green"
          unelevated
          @click="saveDetails"
        />
      </div>
    </div>

    <!-- Dialog for Adding New Row -->
    <q-dialog v-model="showRowDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add New Height</div>
        </q-card-section>
        <q-card-section>
          <label class="text-weight-medium q-pb-md">Height</label>
          <q-input
            v-model="newHeight"
            type="number"
            dense
            outlined
            class="q-py-sm"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Add"
            color="primary"
            @click="addRow"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog for Adding New Column -->
    <q-dialog v-model="showColumnDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add New Width</div>
        </q-card-section>
        <q-card-section>
          <label class="text-weight-medium q-pb-md">Width</label>
          <q-input
            class="q-py-sm"
            v-model="newWidth"
            type="number"
            dense
            outlined
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Add"
            color="primary"
            @click="addColumn"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import {
  AdminMultiPriceUpdate,
  AdminProductFabricsColors,
  AdminProductFabricsColorsService,
  AdminProductPricing,
  AdminProductPricingService,
} from "@/openapi";
import { Component, Vue, Watch, Prop, toNative } from "vue-facing-decorator";
import AutoCompleteSelect from "@/components/common/AutoCompleteSelect.vue";
@Component({
  name: "ColorPriceCreateEditMultiple",
  components: { AutoCompleteSelect },
})
export class ColorPriceCreateEditMultiple extends Vue {
  label = "Edit";
  items = [
    {
      height: 36,
      width: 24,
      price: "0.00",
    },
    {
      height: 42,
      width: 24,
      price: "0.00",
    },
    {
      height: 48,
      width: 24,
      price: "0.00",
    },
    {
      height: 54,
      width: 24,
      price: "0.00",
    },
    {
      height: 60,
      width: 24,
      price: "0.00",
    },
    {
      height: 66,
      width: 24,
      price: "0.00",
    },
    {
      height: 72,
      width: 24,
      price: "0.00",
    },
    {
      height: 78,
      width: 24,
      price: "0.00",
    },
    {
      height: 84,
      width: 24,
      price: "0.00",
    },
    {
      height: 90,
      width: 24,
      price: "0.00",
    },
    {
      height: 96,
      width: 24,
      price: "0.00",
    },
    {
      height: 102,
      width: 24,
      price: "0.00",
    },
    {
      height: 108,
      width: 24,
      price: "0.00",
    },
    {
      height: 114,
      width: 24,
      price: "0.00",
    },
    {
      height: 120,
      width: 24,
      price: "0.00",
    },
    {
      height: 126,
      width: 24,
      price: "0.00",
    },
    {
      height: 132,
      width: 24,
      price: "0.00",
    },
    {
      height: 36,
      width: 30,
      price: "0.00",
    },
    {
      height: 42,
      width: 30,
      price: "0.00",
    },
    {
      height: 48,
      width: 30,
      price: "0.00",
    },
    {
      height: 54,
      width: 30,
      price: "0.00",
    },
    {
      height: 60,
      width: 30,
      price: "0.00",
    },
    {
      height: 66,
      width: 30,
      price: "0.00",
    },
    {
      height: 72,
      width: 30,
      price: "0.00",
    },
    {
      height: 78,
      width: 30,
      price: "0.00",
    },
    {
      height: 84,
      width: 30,
      price: "0.00",
    },
    {
      height: 90,
      width: 30,
      price: "0.00",
    },
    {
      height: 96,
      width: 30,
      price: "0.00",
    },
    {
      height: 102,
      width: 30,
      price: "0.00",
    },
    {
      height: 108,
      width: 30,
      price: "0.00",
    },
    {
      height: 114,
      width: 30,
      price: "0.00",
    },
    {
      height: 120,
      width: 30,
      price: "0.00",
    },
    {
      height: 126,
      width: 30,
      price: "0.00",
    },
    {
      height: 132,
      width: 30,
      price: "0.00",
    },
    {
      height: 36,
      width: 36,
      price: "0.00",
    },
    {
      height: 42,
      width: 36,
      price: "0.00",
    },
    {
      height: 48,
      width: 36,
      price: "0.00",
    },
    {
      height: 54,
      width: 36,
      price: "0.00",
    },
    {
      height: 60,
      width: 36,
      price: "0.00",
    },
    {
      height: 66,
      width: 36,
      price: "0.00",
    },
    {
      height: 72,
      width: 36,
      price: "0.00",
    },
    {
      height: 78,
      width: 36,
      price: "0.00",
    },
    {
      height: 84,
      width: 36,
      price: "0.00",
    },
    {
      height: 90,
      width: 36,
      price: "0.00",
    },
    {
      height: 96,
      width: 36,
      price: "0.00",
    },
    {
      height: 102,
      width: 36,
      price: "0.00",
    },
    {
      height: 108,
      width: 36,
      price: "0.00",
    },
    {
      height: 114,
      width: 36,
      price: "0.00",
    },
    {
      height: 120,
      width: 36,
      price: "0.00",
    },
    {
      height: 126,
      width: 36,
      price: "0.00",
    },
    {
      height: 132,
      width: 36,
      price: "0.00",
    },
    {
      height: 36,
      width: 42,
      price: "0.00",
    },
    {
      height: 42,
      width: 42,
      price: "0.00",
    },
    {
      height: 48,
      width: 42,
      price: "0.00",
    },
    {
      height: 54,
      width: 42,
      price: "0.00",
    },
    {
      height: 60,
      width: 42,
      price: "0.00",
    },
    {
      height: 66,
      width: 42,
      price: "0.00",
    },
    {
      height: 72,
      width: 42,
      price: "0.00",
    },
    {
      height: 78,
      width: 42,
      price: "0.00",
    },
    {
      height: 84,
      width: 42,
      price: "0.00",
    },
    {
      height: 90,
      width: 42,
      price: "0.00",
    },
    {
      height: 96,
      width: 42,
      price: "0.00",
    },
    {
      height: 102,
      width: 42,
      price: "0.00",
    },
    {
      height: 108,
      width: 42,
      price: "0.00",
    },
    {
      height: 114,
      width: 42,
      price: "0.00",
    },
    {
      height: 120,
      width: 42,
      price: "0.00",
    },
    {
      height: 126,
      width: 42,
      price: "0.00",
    },
    {
      height: 132,
      width: 42,
      price: "0.00",
    },
    {
      height: 36,
      width: 48,
      price: "0.00",
    },
    {
      height: 42,
      width: 48,
      price: "0.00",
    },
    {
      height: 48,
      width: 48,
      price: "0.00",
    },
    {
      height: 54,
      width: 48,
      price: "0.00",
    },
    {
      height: 60,
      width: 48,
      price: "0.00",
    },
    {
      height: 66,
      width: 48,
      price: "0.00",
    },
    {
      height: 72,
      width: 48,
      price: "0.00",
    },
    {
      height: 78,
      width: 48,
      price: "0.00",
    },
    {
      height: 84,
      width: 48,
      price: "0.00",
    },
    {
      height: 90,
      width: 48,
      price: "0.00",
    },
    {
      height: 96,
      width: 48,
      price: "0.00",
    },
    {
      height: 102,
      width: 48,
      price: "0.00",
    },
    {
      height: 108,
      width: 48,
      price: "0.00",
    },
    {
      height: 114,
      width: 48,
      price: "0.00",
    },
    {
      height: 120,
      width: 48,
      price: "0.00",
    },
    {
      height: 126,
      width: 48,
      price: "0.00",
    },
    {
      height: 132,
      width: 48,
      price: "0.00",
    },
    {
      height: 36,
      width: 54,
      price: "0.00",
    },
    {
      height: 42,
      width: 54,
      price: "0.00",
    },
    {
      height: 48,
      width: 54,
      price: "0.00",
    },
    {
      height: 54,
      width: 54,
      price: "0.00",
    },
    {
      height: 60,
      width: 54,
      price: "0.00",
    },
    {
      height: 66,
      width: 54,
      price: "0.00",
    },
    {
      height: 72,
      width: 54,
      price: "0.00",
    },
    {
      height: 78,
      width: 54,
      price: "0.00",
    },
    {
      height: 84,
      width: 54,
      price: "0.00",
    },
    {
      height: 90,
      width: 54,
      price: "0.00",
    },
    {
      height: 96,
      width: 54,
      price: "0.00",
    },
    {
      height: 102,
      width: 54,
      price: "0.00",
    },
    {
      height: 108,
      width: 54,
      price: "0.00",
    },
    {
      height: 114,
      width: 54,
      price: "0.00",
    },
    {
      height: 120,
      width: 54,
      price: "0.00",
    },
    {
      height: 126,
      width: 54,
      price: "0.00",
    },
    {
      height: 132,
      width: 54,
      price: "0.00",
    },
    {
      height: 36,
      width: 60,
      price: "0.00",
    },
    {
      height: 42,
      width: 60,
      price: "0.00",
    },
    {
      height: 48,
      width: 60,
      price: "0.00",
    },
    {
      height: 54,
      width: 60,
      price: "0.00",
    },
    {
      height: 60,
      width: 60,
      price: "0.00",
    },
    {
      height: 66,
      width: 60,
      price: "0.00",
    },
    {
      height: 72,
      width: 60,
      price: "0.00",
    },
    {
      height: 78,
      width: 60,
      price: "0.00",
    },
    {
      height: 84,
      width: 60,
      price: "0.00",
    },
    {
      height: 90,
      width: 60,
      price: "0.00",
    },
    {
      height: 96,
      width: 60,
      price: "0.00",
    },
    {
      height: 102,
      width: 60,
      price: "0.00",
    },
    {
      height: 108,
      width: 60,
      price: "0.00",
    },
    {
      height: 114,
      width: 60,
      price: "0.00",
    },
    {
      height: 120,
      width: 60,
      price: "0.00",
    },
    {
      height: 126,
      width: 60,
      price: "0.00",
    },
    {
      height: 132,
      width: 60,
      price: "0.00",
    },
    {
      height: 36,
      width: 66,
      price: "0.00",
    },
    {
      height: 42,
      width: 66,
      price: "0.00",
    },
    {
      height: 48,
      width: 66,
      price: "0.00",
    },
    {
      height: 54,
      width: 66,
      price: "0.00",
    },
    {
      height: 60,
      width: 66,
      price: "0.00",
    },
    {
      height: 66,
      width: 66,
      price: "0.00",
    },
    {
      height: 72,
      width: 66,
      price: "0.00",
    },
    {
      height: 78,
      width: 66,
      price: "0.00",
    },
    {
      height: 84,
      width: 66,
      price: "0.00",
    },
    {
      height: 90,
      width: 66,
      price: "0.00",
    },
    {
      height: 96,
      width: 66,
      price: "0.00",
    },
    {
      height: 102,
      width: 66,
      price: "0.00",
    },
    {
      height: 108,
      width: 66,
      price: "0.00",
    },
    {
      height: 114,
      width: 66,
      price: "0.00",
    },
    {
      height: 120,
      width: 66,
      price: "0.00",
    },
    {
      height: 126,
      width: 66,
      price: "0.00",
    },
    {
      height: 132,
      width: 66,
      price: "0.00",
    },
    {
      height: 36,
      width: 72,
      price: "0.00",
    },
    {
      height: 42,
      width: 72,
      price: "0.00",
    },
    {
      height: 48,
      width: 72,
      price: "0.00",
    },
    {
      height: 54,
      width: 72,
      price: "0.00",
    },
    {
      height: 60,
      width: 72,
      price: "0.00",
    },
    {
      height: 66,
      width: 72,
      price: "0.00",
    },
    {
      height: 72,
      width: 72,
      price: "0.00",
    },
    {
      height: 78,
      width: 72,
      price: "0.00",
    },
    {
      height: 84,
      width: 72,
      price: "0.00",
    },
    {
      height: 90,
      width: 72,
      price: "0.00",
    },
    {
      height: 96,
      width: 72,
      price: "0.00",
    },
    {
      height: 102,
      width: 72,
      price: "0.00",
    },
    {
      height: 108,
      width: 72,
      price: "0.00",
    },
    {
      height: 114,
      width: 72,
      price: "0.00",
    },
    {
      height: 120,
      width: 72,
      price: "0.00",
    },
    {
      height: 126,
      width: 72,
      price: "0.00",
    },
    {
      height: 132,
      width: 72,
      price: "0.00",
    },
    {
      height: 36,
      width: 84,
      price: "0.00",
    },
    {
      height: 42,
      width: 84,
      price: "0.00",
    },
    {
      height: 48,
      width: 84,
      price: "0.00",
    },
    {
      height: 54,
      width: 84,
      price: "0.00",
    },
    {
      height: 60,
      width: 84,
      price: "0.00",
    },
    {
      height: 66,
      width: 84,
      price: "0.00",
    },
    {
      height: 72,
      width: 84,
      price: "0.00",
    },
    {
      height: 78,
      width: 84,
      price: "0.00",
    },
    {
      height: 84,
      width: 84,
      price: "0.00",
    },
    {
      height: 90,
      width: 84,
      price: "0.00",
    },
    {
      height: 96,
      width: 84,
      price: "0.00",
    },
    {
      height: 102,
      width: 84,
      price: "0.00",
    },
    {
      height: 108,
      width: 84,
      price: "0.00",
    },
    {
      height: 114,
      width: 84,
      price: "0.00",
    },
    {
      height: 120,
      width: 84,
      price: "0.00",
    },
    {
      height: 126,
      width: 84,
      price: "0.00",
    },
    {
      height: 132,
      width: 84,
      price: "0.00",
    },
    {
      height: 36,
      width: 96,
      price: "0.00",
    },
    {
      height: 42,
      width: 96,
      price: "0.00",
    },
    {
      height: 48,
      width: 96,
      price: "0.00",
    },
    {
      height: 54,
      width: 96,
      price: "0.00",
    },
    {
      height: 60,
      width: 96,
      price: "0.00",
    },
    {
      height: 66,
      width: 96,
      price: "0.00",
    },
    {
      height: 72,
      width: 96,
      price: "0.00",
    },
    {
      height: 78,
      width: 96,
      price: "0.00",
    },
    {
      height: 84,
      width: 96,
      price: "0.00",
    },
    {
      height: 90,
      width: 96,
      price: "0.00",
    },
    {
      height: 96,
      width: 96,
      price: "0.00",
    },
    {
      height: 102,
      width: 96,
      price: "0.00",
    },
    {
      height: 108,
      width: 96,
      price: "0.00",
    },
    {
      height: 114,
      width: 96,
      price: "0.00",
    },
    {
      height: 120,
      width: 96,
      price: "0.00",
    },
    {
      height: 126,
      width: 96,
      price: "0.00",
    },
    {
      height: 132,
      width: 96,
      price: "0.00",
    },
    {
      height: 36,
      width: 112,
      price: "0.00",
    },
    {
      height: 42,
      width: 112,
      price: "0.00",
    },
    {
      height: 48,
      width: 112,
      price: "0.00",
    },
    {
      height: 54,
      width: 112,
      price: "0.00",
    },
    {
      height: 60,
      width: 112,
      price: "0.00",
    },
    {
      height: 66,
      width: 112,
      price: "0.00",
    },
    {
      height: 72,
      width: 112,
      price: "0.00",
    },
    {
      height: 78,
      width: 112,
      price: "0.00",
    },
    {
      height: 84,
      width: 112,
      price: "0.00",
    },
    {
      height: 90,
      width: 112,
      price: "0.00",
    },
    {
      height: 96,
      width: 112,
      price: "0.00",
    },
    {
      height: 102,
      width: 112,
      price: "0.00",
    },
    {
      height: 108,
      width: 112,
      price: "0.00",
    },
    {
      height: 114,
      width: 112,
      price: "0.00",
    },
    {
      height: 120,
      width: 112,
      price: "0.00",
    },
    {
      height: 126,
      width: 112,
      price: "0.00",
    },
    {
      height: 132,
      width: 112,
      price: "0.00",
    },
  ];

  productColor: AdminProductFabricsColors = <AdminProductFabricsColors>{};
  editActive = false;
  matrix: any = {};
  newHeight: any = null;
  newWidth: any = null;
  showRowDialog = false;
  showColumnDialog = false;
  selectedOptions = [];
  pagination = {
    rowsPerPage: "100",
    page: 1,
    rowsNumber: 0,
  };

  mounted() {}
  loadData() {}
  get uniqueHeights() {
    return [...new Set(this.items.map((item) => item.height))];
  }
  get uniqueWidths() {
    return [...new Set(this.items.map((item) => item.width))];
  }
  // getPrice(height: number, width: number) {
  //   const value = this.getItem(height, width);
  //   return value ? value.price : "";
  // }
  get matrixRows() {
    return this.uniqueHeights.map((height) => {
      const row: any = { height };
      this.uniqueWidths.forEach((width) => {
        row[width] = this.getPrice(height, width);
      });
      return row;
    });
  }
  get matrixColumns() {
    return [
      {
        name: "height",
        label: "Height",
        align: "left",
        field: "height",
      },
      ...this.uniqueWidths.map((width) => ({
        name: width.toString(),
        label: width.toString(),
        align: "left",
        field: width.toString(),
      })),
    ];
  }

  initializeMatrix() {
    this.uniqueHeights.forEach((height) => {
      if (!this.matrix[height]) {
        this.matrix[height] = {};
      }
      this.uniqueWidths.forEach((width) => {
        this.matrix[height][width] = this.getPrice(height, width);
      });
    });
  }

  getPrice(height: any, width: any) {
    let item = this.items.find(
      (item) => item.height === height && item.width === width
    );
    return item ? item.price : "";
  }
  updatePrice(newValue: any, height: any, width: any) {
    newValue = parseFloat(newValue).toFixed(2); // Ensure the new value is in the correct format
    let item = this.items.find(
      (item) => item.height == height && item.width == width
    );
    if (item) {
      item.price = newValue;
    }
  }

  getItem(height: number, width: number) {
    let item = this.items.find(
      (item: AdminProductPricing) =>
        item.height === height && item.width === width
    );
    return item;
  }
  addRow() {
    const height = parseFloat(this.newHeight);
    if (!isNaN(height) && !this.uniqueHeights.includes(height)) {
      this.uniqueWidths.forEach((width) => {
        const newRow = {
          height: height,
          width: width,
          price: "0.00",
        };
        this.items.push(newRow);
      });
    } else {
      // Handle invalid or duplicate height
      this.$q.notify({
        message: "Invalid or duplicate height value",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
    }
  }

  addColumn() {
    const width = parseFloat(this.newWidth);
    if (!isNaN(width) && !this.uniqueWidths.includes(width)) {
      this.uniqueHeights.forEach((height) => {
        const newColumn = {
          height: height,
          width: width,
          price: "0.00",
        };
        this.items.push(newColumn);
      });
    } else {
      // Handle invalid or duplicate width
      this.$q.notify({
        message: "Invalid or duplicate width value",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
    }
  }
  showAddRowDialog() {
    this.newHeight = null;
    this.showRowDialog = true;
  }
  showAddColumnDialog() {
    this.newWidth = null;
    this.showColumnDialog = true;
  }

  removeRow(height: any) {
    if (height) {
      this.items = this.items.filter((item) => item.height !== height);
    }
  }
  removeColumn(width: any) {
    if (width) {
      this.items = this.items.filter(
        (item) => item.width !== parseFloat(width)
      );
    }
  }
  saveDetails() {
    if (!this.selectedOptions.length) {
      this.$q.notify({
        message: "Please select the fabric colors before saving",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
    }
    if (this.selectedOptions && this.selectedOptions.length) {
      const fabricIds = this.selectedOptions.map((obj: any) => obj.value);
      const data: AdminMultiPriceUpdate = <AdminMultiPriceUpdate>{
        fabric_ids: fabricIds,
        price_matrix: this.items,
      };
      AdminProductFabricsColorsService.adminProductMultiPriceCreate(data).then(
        () => {
          this.$q.notify({
            message: "Prices updated",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
        }
      );
    }
  }
}
export default toNative(ColorPriceCreateEditMultiple);
</script>

<style lang="scss" scoped></style>
