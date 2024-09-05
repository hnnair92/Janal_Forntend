<template>
  <div class="q-d-flex flex-grow-1 q-mt-md">
    <div class="text-subtitle2 text-weight-medium q-pb-sm">
      Fabric and Color
    </div>
    <q-separator class="q-mb-sm" />
    <div class="q-d-flex">
      <q-list class="rounded-borders">
        <q-expansion-item
          v-for="f in fabricsList"
          expand-separator
          class="q-ml-xl text-subtitle2"
          :label="f.fabric_name"
        >
          <q-card flat>
            <q-card-section v-if="f.color_options.length">
              <div
                class="row text-body1 add-border q-pa-md q-mb-sm"
                v-for="coloroption in f.color_options"
              >
                <div class="col-md-2">
                  Color Name:
                  <span class="text-italic">{{ coloroption.color_name }}</span
                  ><br />
                  Color Type:
                  <span class="text-italic">{{ coloroption.color_type }}</span
                  ><br />
                  Price:
                  <span class="text-italic text-primary_dark text-h6"
                    >${{ coloroption.price }}</span
                  >
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
            </q-card-section>
            <q-card-actions align="left">
              <q-btn
                color="red"
                unelevated
                label="Delete Fabric"
                @click="deleteFabric(f)"
              />
              <q-btn
                color="secondary"
                unelevated
                label="Edit Fabric"
                @click="editFabric(f)"
              />
            </q-card-actions>
          </q-card>
        </q-expansion-item>
        <div class="text-center q-mt-md">
          <q-btn
            color="secondary"
            icon="add"
            label="Create new Fabric and Colors"
            @click="fabricDialog = true"
          />
        </div>
      </q-list>
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
              <div class="col-md-2">
                Color Name:
                <span class="text-italic">{{ coloroption.color_name }}</span
                ><br />
                Color Type:
                <span class="text-italic">{{ coloroption.color_type }}</span
                ><br />
                Price: <span class="text-italic">${{ coloroption.price }}</span>
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
        </q-card-actions> </q-card
    ></q-dialog>

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
          <label class="text-weight-medium">Color Code</label>
          <q-input
            filled
            v-model="activeColor.color"
            class="my-input q-mb-md"
            dense
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color
                    v-model="activeColor.color"
                    color="secondary"
                    dense
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
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
          <label class="text-weight-medium">Price</label>
          <q-input
            v-model="activeColor.price"
            outlined
            type="text"
            dense
            class="q-mb-md"
            color="secondary"
          ></q-input>
        </q-card-section>
        <q-card-section>
          <ImageListUpload
            :imageList.sync="uploadedImages"
            @file-updates="changeFile"
            @file-deleted="refreshCurrentFabric"
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
import { Component, Vue, Prop } from "vue-facing-decorator";
import {
  ColorOption,
  ColorOptionsService,
  FabricOptions,
  FabricOptionsService,
  UploadedImages,
} from "@/openapi";
import ImageListUpload from "@/components/common/ImageListandUpload.vue";
@Component({
  components: { ImageListUpload },
  emits: ["fabric-updated", "fabric-created"],
})
export class FabricsColors extends Vue {
  @Prop({ default: "" }) productVariantId: string;
  fabricsList: Array<FabricOptions> = Array<FabricOptions>();
  fabric: FabricOptions = <FabricOptions>{};
  colorDialog = false;
  activeColor: ColorOption = <ColorOption>{};
  hex = "#FF00FF";
  fabricDialog = false;
  uploadedImages: Array<UploadedImages> = Array<UploadedImages>();
  mounted() {
    this.loadData();
  }
  createSliderModels() {
    if (this.fabricsList) {
      this.fabricsList.forEach((f: FabricOptions) => {
        let first_item = f.color_options?.[0];
        if (first_item) {
          // @ts-ignore
          this.slide[f.id?.toString()] = first_item.id?.toString();
        }
      });
    }
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
  loadData() {
    if (this.productVariantId) {
      FabricOptionsService.fabricOptionsList(
        undefined,
        undefined,
        this.productVariantId
      ).then((dataList: any) => {
        this.fabricsList = dataList.results;
        if (this.fabric.id) {
          let feb = this.fabricsList.find(
            (fab: FabricOptions) => fab.id == this.fabric.id
          );
          if (feb) {
            this.fabric = feb;
          }
        }
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
    if (this.activeColor.id) {
      this.saveColor();
    } else {
      this.uploadedImages.push(file);
    }
  }

  saveColor() {
    if (this.activeColor.id) {
      ColorOptionsService.colorOptionsUpdate(
        this.activeColor.id,
        this.activeColor
      ).then((res: ColorOption) => {
        this.activeColor = <ColorOption>{};
        this.colorDialog = false;
        this.loadData();
        this.$q.notify({
          message: "Fabric color updated",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
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
          this.$q.notify({
            message: "New fabric color created",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
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
      FabricOptionsService.fabricOptionsUpdate(
        this.fabric.id,
        this.fabric
      ).then((result: FabricOptions) => {
        this.fabricDialog = false;
        this.$q.notify({
          message: "Fabric Details Updated",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
        this.$emit("fabric-updated", result);
      });
    } else {
      FabricOptionsService.fabricOptionsCreate(this.fabric).then(
        (result: FabricOptions) => {
          this.fabricDialog = false;
          this.$q.notify({
            message: "New Fabric Added",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
          this.$emit("fabric-created", result);
        }
      );
    }
  }
  editFabric(fab: FabricOptions) {
    this.fabric = fab;
    this.fabricDialog = true;
  }
  deleteFabric(fab: FabricOptions) {
    if (fab.id)
      FabricOptionsService.fabricOptionsDelete(fab.id).then(() => {
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
