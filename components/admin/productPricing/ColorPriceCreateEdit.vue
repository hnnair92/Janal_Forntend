<template>
  <div class="full-width column wrap items-start content-start q-pa-lg">
    <div class="full-width row justify-between q-pb-md">
      <p class="text-h5">
        {{ label }} Pricing
        <span v-if="productColor && productColor.color_name"
          >- {{ productColor.color_name }}</span
        >
      </p>
      <div class="q-mt-md">
        <q-btn
          label="Add Height"
          @click="showAddRowDialog"
          color="secondary"
          unelevated
        />
        <q-btn
          label="Add Width"
          class="q-ml-md"
          @click="showAddColumnDialog"
          color="secondary"
          unelevated
        />
      </div>
    </div>

    <q-separator class="full-width row" color="orange" inset />
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
  AdminProductFabricsColors,
  AdminProductFabricsColorsService,
  AdminProductFabricsService,
  AdminProductPricing,
  AdminProductPricingService,
  SimpleFabricOptions,
} from "@/openapi";
import { Component, Vue, Watch, Prop, toNative } from "vue-facing-decorator";

@Component({
  name: "ColorPriceCreateEdit",
})
export class ColorPriceCreateEdit extends Vue {
  @Prop({ default: false }) createdMode: boolean;
  @Prop() fabricId: any;
  label = "Create";
  productPricing: Array<AdminProductPricing> = Array<AdminProductPricing>();
  productFabric: SimpleFabricOptions = <SimpleFabricOptions>{};
  editActive = false;
  matrix: any = {};
  newHeight: any = null;
  newWidth: any = null;
  showRowDialog = false;
  showColumnDialog = false;

  pagination = {
    rowsPerPage: "100",
    page: 1,
    rowsNumber: 0,
  };

  mounted() {
    this.editActive = this.createdMode;
    if (!this.createdMode) {
      this.label = "Edit";
    }

    if (this.fabricId) {
      this.loadData();
    }
  }
  loadData() {
    AdminProductFabricsService.adminProductFabricsRead(this.fabricId).then(
      (fabric: SimpleFabricOptions) => {
        this.productFabric = fabric;
      }
    );
    AdminProductPricingService.adminProductPricingList(
      undefined,
      1000,
      this.fabricId
    ).then(({ results }: any) => {
      if (results) {
        this.productPricing = results;
        this.initializeMatrix();
      }
      // this.productPricing = res;
    });
  }
  get uniqueHeights() {
    return [...new Set(this.productPricing.map((item) => item.height))];
  }
  get uniqueWidths() {
    return [...new Set(this.productPricing.map((item) => item.width))];
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
    let item = this.productPricing.find(
      (item) => item.height === height && item.width === width
    );
    return item ? item.price : "";
  }
  updatePrice(newValue: any, height: any, width: any) {
    newValue = parseFloat(newValue).toFixed(2); // Ensure the new value is in the correct format
    let item = this.productPricing.find(
      (item) => item.height == height && item.width == width
    );
    if (item) {
      item.price = newValue;
      this.updatePricingOnServer(item);
    } else {
      // If the item is not found, create a new one (this depends on your logic)
      // this.productPricing.push({
      //   id: Date.now(),
      //   height,
      //   width,
      //   price: newValue,
      // });
    }

    // this.$forceUpdate(); // Force Vue to re-render the component
  }

  updatePricingOnServer(
    data: AdminProductPricing,
    showMessage: boolean = true
  ) {
    if (data.id) {
      AdminProductPricingService.adminProductPricingUpdate(data.id, data)
        .then(() => {
          if (showMessage) {
            this.$q.notify({
              message: `"Price Updated"`,
              color: "green",
              position: "top",
              classes: "text-body1",
            });
          }

          this.loadData();
        })
        .catch(() => {
          this.$q.notify({
            message: "Failed to update the price",
            color: "red",
            position: "top",
            classes: "text-body1",
          });
        });
    } else {
      AdminProductPricingService.adminProductPricingCreate(data).then(() => {
        this.$q.notify({
          message: `"Prices Create"`,
          color: "green",
          position: "top",
          classes: "text-body1",
        });
        this.loadData();
      });
    }
  }

  getItem(height: number, width: number) {
    let item = this.productPricing.find(
      (item: AdminProductPricing) =>
        item.height === height && item.width === width
    );
    return item;
  }
  addRow() {
    const height = parseFloat(this.newHeight);
    if (!isNaN(height) && !this.uniqueHeights.includes(height)) {
      this.uniqueWidths.forEach((width) => {
        const newRow: AdminProductPricing = <AdminProductPricing>{
          height: height,
          width: width,
          price: "0.00",
          color_options: this.colorId,
        };
        this.updatePricingOnServer(newRow);
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
        const newColumn: AdminProductPricing = <AdminProductPricing>{
          height: height,
          width: width,
          price: "0.00",
          color_options: this.colorId,
        };
        this.updatePricingOnServer(newColumn, false);
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
    this.$q
      .dialog({
        title: "Confirm Action",
        message: `This action will remove all the price associated with height - ${height} for the color ${this.productColor.color_name}. Would you like to continue?`,
        ok: {
          push: false,
          color: "negative",
        },
        cancel: {
          push: false,
        },
        persistent: true,
      })
      .onOk(() => {
        if (height) {
          AdminProductPricingService.adminProductPricingRemoveHeight(
            this.colorId,
            height
          ).then(() => {
            this.$q.notify({
              message: `Price for width - ${height} removed from ${this.productColor.color_name}`,
              color: "green",
              position: "top",
              classes: "text-body1",
            });
            this.loadData();
          });
        }
      })
      .onCancel(() => {});
  }
  removeColumn(width: any) {
    this.$q
      .dialog({
        title: "Confirm Action",
        message: `This action will remove all the price associated with width - ${width} for the color ${this.productColor.color_name}. Would you like to continue?`,
        ok: {
          push: false,
          color: "negative",
        },
        cancel: {
          push: false,
        },
        persistent: true,
      })
      .onOk(() => {
        if (width) {
          AdminProductPricingService.adminProductPricingRemoveWidth(
            this.colorId,
            width
          ).then(() => {
            this.$q.notify({
              message: `Price for width - ${width} removed from ${this.productColor.color_name}`,
              color: "green",
              position: "top",
              classes: "text-body1",
            });
            this.loadData();
          });
        }
      })
      .onCancel(() => {});
  }
}
export default toNative(ColorPriceCreateEdit);
</script>

<style lang="scss" scoped></style>
