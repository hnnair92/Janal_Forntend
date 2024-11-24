<template>
  <div class="q-d-flex q-flex-grow-1 column">
    <div class="q-d-flex q-flex-grow-1">
      <p class="text-h6 q-mt-md">Selected Options</p>
      <div class="row">
        <q-card
          class="my-card q-mr-md"
          v-for="(a, i) in attributeList"
          :key="`att-${i}`"
        >
          <q-img :src="a.image.large_image ?? undefined">
            <div class="text-h5 absolute-bottom">
              {{ a.value }}<br />
              ${{ a.price }}
            </div>
          </q-img>
          <q-card-actions align="right">
            <q-btn round icon="delete" color="red" @click="deleteItem(a)" />
            <q-btn round icon="edit" color="secondary" @click="editItem(a)" />
          </q-card-actions>
        </q-card>
        <q-card
          class="q-d-flex column justify-center items-center my-card thumbnail text-body1 q-my-sm"
          @click="addNewAttribute"
        >
          <q-icon name="add"></q-icon>
          <span>Create new attribute</span>
        </q-card>
      </div>
    </div>
    <!-- <q-card class="mt-2" v-for="(a, i) in attributeList" :key="`att-${i}`">
        <q-card-section>
            <q-input label=" Option Group Name" square disable readonly v-model="a.value" outlined type="text"
                dense></q-input>
            <q-input label=" Option Group Name" square disable readonly v-model="a.price" outlined type="text"
                dense></q-input>
            <q-avatar square>
                <img v-if="a.large_image" src="a.large_image" height="128">
            </q-avatar>
        </q-card-section>
    </q-card> -->

    <q-dialog v-model="itemDialog" persistent>
      <q-card class="q-mt-md" style="width: 900px; max-width: 80vw">
        <q-card-section>
          <div class="q-d-flex justify-between">
            <p class="text-h6 q-d-flex">{{ what_action }} Option</p>
          </div>
          <q-separator></q-separator>
        </q-card-section>
        <q-card-section>
          <q-input
            label=" Option Name"
            square
            v-model="activeItem.value"
            outlined
            type="text"
            dense
          ></q-input>
          <q-checkbox
            class="q-mt-md"
            v-model="activeItem.position_required"
            label="Position Required (This will enable the user to select a position Left/Right from a dropdown)"
          />

          <q-input
            class="q-mt-md"
            label="Help Text (Optional)"
            square
            v-model="activeItem.help_text"
            outlined
            type="text"
            dense
            clearable
          ></q-input>
          <div class="row">
            <div class="col q-pr-md">
              <q-input
                class="q-pt-md"
                label="Min Height(Optional)"
                square
                v-model="activeItem.min_height"
                outlined
                type="number"
                dense
                clearable
              ></q-input>
            </div>
            <div class="col q-pl-md">
              <q-input
                class="q-pt-md"
                label="Max Height(Optional)"
                square
                v-model="activeItem.max_height"
                outlined
                type="number"
                dense
                clearable
              ></q-input>
            </div>
          </div>
          <div class="row">
            <div class="col q-pr-md">
              <q-input
                class="q-pt-md"
                label="Min Width(Optional)"
                square
                v-model="activeItem.min_width"
                outlined
                type="number"
                dense
                clearable
              ></q-input>
            </div>
            <div class="col q-pl-md">
              <q-input
                class="q-pt-md"
                label="Max Width(Optional)"
                square
                v-model="activeItem.max_width"
                outlined
                type="number"
                dense
                clearable
              ></q-input>
            </div>
          </div>

          <q-input
            class="q-mt-md"
            label=" Price"
            square
            v-model="activeItem.price"
            outlined
            type="number"
            dense
          ></q-input>
          <CommonImageUploader
            ref="imageUploaderRef"
            :imageId.sync="activeItem.image?.id"
            @file-uploaded="changeFile"
            @file-deleted="deleteImage"
          />
          <p class="text-subtitle2 q-mt-md">Sub Items</p>
          <q-separator class="q-my-sm" />
          <DynamicValueSubItem
            :subItems.sync="activeItem.sub_items"
            @add-sub-item="addSubItem"
            @delete-sub-item="deleteSubItem"
          ></DynamicValueSubItem>
        </q-card-section>
        <ErrorDisplay :errors="formErrors" />
        <q-card-actions align="right" class="q-ma-md">
          <q-btn flat label="Cancel" @click="itemDialog = false" />
          <q-btn
            flat
            color="secondary"
            label="Save"
            @click="createDynamicAttribute"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import {
  DynamicAttributeValueList,
  DynamicAttributeValue,
  DynamicAttributesService,
  UploadedImages,
  DynamicAttributeValueSubItems,
  ApiError,
} from "@/openapi";
import { Component, Prop, Vue, toNative, Watch } from "vue-facing-decorator";
import DynamicValueSubItem from "@/components/admin/productOptions/DynamicValueSubItem.vue";
import ErrorDisplay from "@/components/common/ErrorDisplay.vue";
@Component({
  name: "DynamicAttributeValues",
  components: {
    DynamicValueSubItem,
    ErrorDisplay,
  },
})
export class DynamicAttributeValues extends Vue {
  @Prop({ required: true }) groupId: number;
  what_action = "Create";
  attributeList: Array<DynamicAttributeValueList> =
    Array<DynamicAttributeValueList>();
  activeItem: DynamicAttributeValue = <DynamicAttributeValue>{};
  formErrors: object | string[] | null = null;

  itemDialog = false;
  mounted() {
    this.getAllDynamicAttributesValues();
  }
  @Watch("itemDialog ")
  dialogChanged() {
    if (!this.itemDialog) {
      this.activeItem = <DynamicAttributeValue>{};
    }
  }
  changeFile(file: UploadedImages) {
    if (!this.activeItem.image && file.id) {
      this.activeItem.image = file;
    }
  }
  resetActiveItems() {
    this.activeItem = <DynamicAttributeValue>{};
    this.what_action = "Create";
    this.itemDialog = false;
  }
  deleteImage() {
    // @ts-ignore
    this.activeItem.image = null;
  }
  createDynamicAttribute() {
    if (this.activeItem.id) {
      DynamicAttributesService.dynamicAttributesDynamicAttributeValuesUpdate(
        this.groupId.toString(),
        this.activeItem.id,
        this.activeItem
      )
        .then((res: DynamicAttributeValue) => {
          this.getAllDynamicAttributesValues();
          this.$q.notify({
            message: "Attribute value has been updated",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
          this.resetActiveItems();
        })
        .catch((err: ApiError) => {
          if (err.body && err.status === 400) {
            this.formErrors = err.body;
          } else {
            this.formErrors = ["An unexpected error occurred."];
          }
        });
    } else {
      this.activeItem.attribute = this.groupId;
      DynamicAttributesService.dynamicAttributesDynamicAttributeValuesCreate(
        this.groupId.toString(),
        this.activeItem
      )
        .then((res: DynamicAttributeValue) => {
          this.getAllDynamicAttributesValues();
          this.$q.notify({
            message: "New item created",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
          this.resetActiveItems();
        })
        .catch((err: ApiError) => {
          if (err.body && err.status === 400) {
            this.formErrors = err.body;
          } else {
            this.formErrors = ["An unexpected error occurred."];
          }
        });
    }
  }
  getAllDynamicAttributesValues() {
    DynamicAttributesService.dynamicAttributesDynamicAttributeValuesList(
      this.groupId.toString(),
      1,
      100
    ).then((res: any) => {
      this.attributeList = res.results;
    });
  }

  editItem(item: any) {
    this.what_action = "Edit";
    this.activeItem = item;
    this.itemDialog = true;
  }
  deleteItem(item: DynamicAttributeValue) {
    if (item.id) {
      DynamicAttributesService.dynamicAttributesDynamicAttributeValuesDelete(
        this.groupId.toString(),
        item.id
      ).then(() => {
        this.getAllDynamicAttributesValues();
        this.resetActiveItems();
      });
    }
  }
  addNewAttribute() {
    this.activeItem = <DynamicAttributeValue>{ price: "0.00" };
    this.itemDialog = true;
    this.what_action = "Create";
  }
  addSubItem() {
    if (!this.activeItem.sub_items?.length) {
      this.activeItem.sub_items = [];
    }
    this.activeItem.sub_items.push(<DynamicAttributeValueSubItems>{});
  }

  deleteSubItem(subItem: DynamicAttributeValueSubItems) {
    if (this.activeItem && this.activeItem.sub_items) {
      const index = this.activeItem.sub_items.indexOf(subItem);
      if (index > -1) {
        this.activeItem.sub_items.splice(index, 1);
      }
    }
  }
}

export default toNative(DynamicAttributeValues);
</script>

<style lang="sass" scoped>
.my-card
  width: 250px
  min-height: 250px
</style>
