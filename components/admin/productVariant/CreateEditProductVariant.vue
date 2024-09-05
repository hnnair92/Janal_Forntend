<template>
  <div class="q-d-flex flex-grow-1 q-mt-md q-pa-md">
    <div class="text-h6">
      {{ fabric.id ? "Edit" : "Add" }} Fabric and Color Details
    </div>
    <q-separator class="q-mb-sm" />
    <div class="q-d-flex">
      <q-card class="q-pa-lg">
        <q-card-section>
          <label class="text-weight-medium">Fabric Name</label>
          <q-input
            v-model="fabric.fabric_name"
            outlined
            type="text"
            dense
            class="q-py-sm"
            color="secondary"
          ></q-input>

          <label class="text-weight-medium">Product</label>
          <q-select
            outlined
            v-model="fabric.product"
            :options="productsList"
            option-label="name"
            class="q-py-sm"
            color="secondary"
            option-value="id"
            emit-value
            map-options
            dense
          />
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2 text-weight-medium q-pb-sm">Colors</div>
          <div
            class="text-body1 q-mb-md add-border q-pa-md"
            v-for="coloroption in fabric.color_options"
          >
            <div class="row">
              <div class="col-md-2 q-mb-md">
                Color Name:
                <span class="text-italic">{{ coloroption.color_name }}</span
                ><br />
                Color Type:
                <span class="text-italic">{{ coloroption.color_type }}</span
                ><br />
                <!-- Price: <span class="text-italic">${{ coloroption.price }}</span> -->
              </div>
              <div class="col-md-10">
                <div class="row">
                  <div
                    class="col-2 q-pa-sm align-center column justify-center"
                    v-for="image in coloroption.images"
                  >
                    <q-img
                      :src="image.large_image"
                      fit="fill"
                      spinner-color="primary"
                      spinner-size="82px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="q-mt-md">
              <q-btn
                color="red"
                unelevated
                label="Delete Color"
                @click="deleteColorOption(coloroption)"
              />
              <q-btn
                class="q-ml-sm"
                color="secondary"
                unelevated
                label="Edit Color"
                @click="editColorOption(coloroption)"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-2 col-xl-1">
              <div class="q-d-flex align-center justify-center">
                <q-card
                  class="upload-card thumbnail"
                  flat
                  bordered
                  @click="colorDialog = true"
                >
                  <q-icon name="add"></q-icon>
                  <span>Color</span>
                </q-card>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="black"
            to="/pages-admin/products/variant"
          />
          <q-btn
            flat
            label="Save"
            color="secondary"
            @click.prevent="saveData"
          />
        </q-card-actions>
      </q-card>
    </div>

    <q-dialog v-model="fabricDialog" persistent maximized>
      <q-card class="q-pa-lg">
        <q-card-section>
          <div class="text-h6">
            {{ fabric.id ? "Edit" : "Add" }} Fabric and Color Details
          </div>
        </q-card-section>
        <q-card-section>
          <label class="text-weight-medium">Fabric Name</label>
          <q-input
            v-model="fabric.fabric_name"
            outlined
            type="text"
            dense
            class="q-py-sm"
            color="secondary"
          ></q-input>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2 text-weight-medium q-pb-sm">Colors</div>
          <div
            class="text-body1 q-mb-md add-border q-pa-md"
            v-for="coloroption in fabric.color_options"
          >
            <div class="row">
              <div class="col-md-2 q-ml-md">
                Color Name:
                <span class="text-italic">{{ coloroption.color_name }}</span
                ><br />
                Color Type:
                <span class="text-italic">{{ coloroption.color_type }}</span
                ><br />
                <!-- Price: <span class="text-italic">${{ coloroption.price }}</span> -->
              </div>
              <div class="col-md-10">
                <div class="row">
                  <q-img
                    v-for="image in coloroption.images"
                    :src="image.large_image"
                    :ratio="1"
                    class="thumbnail q-mr-md"
                    spinner-color="primary"
                    spinner-size="82px"
                  />
                </div>
              </div>
            </div>
            <div>
              <q-btn
                color="red"
                unelevated
                label="Delete Color"
                @click="deleteColorOption(coloroption)"
              />
              <q-btn
                class="q-ml-sm"
                color="secondary"
                unelevated
                label="Edit Color"
                @click="editColorOption(coloroption)"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-2 col-xl-1">
              <div class="q-d-flex align-center justify-center">
                <q-card
                  class="upload-card thumbnail"
                  flat
                  bordered
                  @click="colorDialog = true"
                >
                  <q-icon name="add"></q-icon>
                  <span>Color</span>
                </q-card>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="black" @click="closeFabricDialog" />
          <q-btn
            flat
            label="Save"
            color="secondary"
            @click.prevent="saveData"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Color option dialog -->
    <q-dialog v-model="colorDialog" persistent>
      <q-card style="width: 900px; max-width: 80vw" class="q-pa-md">
        <q-card-section>
          <div class="text-h6">
            {{ activeColor.id ? "Edit" : "Add" }} Color Details
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <label class="text-weight-medium">Color Name</label>
          <q-input
            v-model="activeColor.color_name"
            outlined
            type="text"
            dense
            class="q-mb-md"
            color="secondary"
          ></q-input>
          <label class="text-weight-medium">Fabric Image</label>
          <CommonImageUploader
            @file-uploaded="fabricImageChange"
            :imageId.sync="activeColor.fabric_image"
            @file-deleted="fabricImageDeleted"
          />
          <label class="text-weight-medium">Pricing Category</label>
          <q-select
            outlined
            v-model="activeColor.color_type"
            :options="getColorOptions()"
            option-label="label"
            class="q-mb-md"
            color="secondary"
            option-value="value"
            emit-value
            map-options
            dense
          />

          <label class="text-weight-medium">Light Filtering</label>
          <q-select
            outlined
            v-model="activeColor.light_filter"
            :options="lightFiltering"
            option-label="label"
            class="q-mb-md"
            color="secondary"
            option-value="value"
            emit-value
            map-options
            dense
          />

          <!-- <label class="text-weight-medium">Price</label>
          <q-input
            v-model="activeColor.price"
            outlined
            type="text"
            dense
            class="q-mb-md"
            color="secondary"
          ></q-input> -->
        </q-card-section>
        <q-card-section>
          <label class="text-weight-medium">Fabric Images</label>
          <ImageListUpload
            :imageList.sync="activeColor.images"
            @file-updates="changeFile"
            @file-deleted="refreshCurrentFabric"
            class="q-mb-md"
          >
          </ImageListUpload>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="black" v-close-popup />
          <q-btn
            flat
            label="Save"
            color="secondary"
            @click.prevent="saveColor"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, toNative, Watch } from "vue-facing-decorator";
import {
  ColorOption,
  ColorOptionsService,
  FabricOptions,
  FabricOptionsService,
  UploadedImages,
  ProductsService,
  ApiError,
  Product,
} from "@/openapi";
import ImageListUpload from "@/components/common/ImageListandUpload.vue";
@Component({
  components: { ImageListUpload },
  emits: ["fabric-updated", "fabric-created"],
})
export class FabricsColors extends Vue {
  @Prop({ default: "" }) productVariantId: number;
  fabric: FabricOptions = <FabricOptions>{};
  colorDialog = false;
  activeColor: ColorOption = <ColorOption>{};
  hex = "#FF00FF";
  fabricDialog = false;
  uploadedImages: Array<UploadedImages> = Array<UploadedImages>();
  productsList: Array<Product> = [];

  mounted() {
    this.getAllProducts();
    this.loadData();
  }
  getAllProducts() {
    ProductsService.productsList("", 1, 100).then((res: any) => {
      this.productsList = res.results;
    });
  }

  getColorOptions() {
    const colorTypeOptions = Object.values(ColorOption.color_type).map(
      (value) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
      })
    );

    return colorTypeOptions;
  }

  get lightFiltering() {
    const colorTypeOptions = Object.values(ColorOption.light_filter).map(
      (value) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
      })
    );

    return colorTypeOptions;
  }
  loadData() {
    if (this.productVariantId) {
      this.$q.loading.show();
      FabricOptionsService.fabricOptionsRead(this.productVariantId)
        .then((res: FabricOptions) => {
          this.fabric = res;
        })
        .finally(() => {
          this.$q.loading.hide();
        });
    }
  }

  closeFabricDialog() {
    this.loadData();
    this.fabricDialog = false;
  }

  changeFile(file: UploadedImages) {
    if (!this.activeColor.images) {
      this.activeColor.images = [];
    }
    if (file && file.id) {
      this.activeColor.images.push(file);
    }
    // if (this.activeColor.id) {
    //   this.saveColor();
    // } else {
    this.uploadedImages.push(file);
    // }
  }
  fabricImageChange(image: UploadedImages) {
    this.activeColor.fabric_image = image.id;
  }
  fabricImageDeleted() {
    this.activeColor.fabric_image = null;
  }

  @Watch("colorDialog")
  onColorDialogChange() {
    if (!this.colorDialog) {
      this.activeColor = <ColorOption>{};
    }
  }
  saveColor() {
    if (this.activeColor.id) {
      ColorOptionsService.colorOptionsUpdate(
        this.activeColor.id,
        this.activeColor
      ).then((res: ColorOption) => {
        this.activeColor = res;
        this.colorDialog = false;
        this.loadData();
      });
    } else {
      ColorOptionsService.colorOptionsCreate(this.activeColor).then(
        (result: ColorOption) => {
          if (!this.fabric.color_options) {
            this.fabric.color_options = [];
          }
          this.fabric.color_options.push(result);
          this.saveData();
          this.colorDialog = false;
        }
      );
    }
  }

  refreshCurrentFabric() {
    if (this.fabric.id) {
      FabricOptionsService.fabricOptionsRead(this.fabric.id).then(
        (res: FabricOptions) => {
          this.fabric = res;
          this.colorDialog = false;
        }
      );
    }
  }

  saveData() {
    if (this.fabric.id) {
      FabricOptionsService.fabricOptionsUpdate(this.fabric.id, this.fabric)
        .then((result: FabricOptions) => {
          this.fabricDialog = false;
          // this.$emit("fabric-updated", result)
          this.$q.notify({
            message: "Product Variant Updated",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
          this.$router.push(`/pages-admin/products/variant/`);
        })
        .catch((err: ApiError) => {
          this.$q.notify({
            message: "Unable to update variant",
            color: "red",
            position: "top",
            classes: "text-body1",
          });
          // TODO catch error and display errors on screen
        });
    } else {
      FabricOptionsService.fabricOptionsCreate(this.fabric)
        .then((result: FabricOptions) => {
          this.fabricDialog = false;
          this.$q.notify({
            message: "Product Variant Created",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
          this.$router.push(`/pages-admin/products/variant/`);
        })
        .catch((err: ApiError) => {
          this.$q.notify({
            message: "Unable to create product variant",
            color: "red",
            position: "top",
            classes: "text-body1",
          });
          // TODO catch error and display errors on screen
        });
    }
  }
  editFabric() {
    this.fabricDialog = true;
  }
  deleteFabric() {
    if (this.fabric.id)
      FabricOptionsService.fabricOptionsDelete(this.fabric.id).then(() => {
        this.loadData();
      });
  }
  editColorOption(coloroption: ColorOption) {
    this.activeColor = coloroption;
    this.uploadedImages = this.activeColor.images;
    this.colorDialog = true;
  }

  deleteColorOption(coloroption: ColorOption) {
    if (coloroption.id) {
      ColorOptionsService.colorOptionsDelete(coloroption.id).then(() =>
        this.loadData()
      );
    }
  }
}
export default toNative(FabricsColors);
</script>
<style scoped>
.thumbnail {
  height: 200px;
}

.upload-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.my-picker {
  width: 150px;
}

.add-border {
  border: 1px solid #edce68;
}
</style>
