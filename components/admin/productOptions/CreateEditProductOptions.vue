<template>
  <q-page class="q-pa-md">
    <q-card class="mt-2">
      <q-card-section>
        <div class="q-d-flex justify-between">
          <p class="text-h6 q-d-flex">{{ label }} Options</p>
        </div>
        <q-separator></q-separator>
      </q-card-section>
      <q-card-section>
        <q-input
          label=" Option Group Name"
          square
          v-model="group.name"
          outlined
          type="text"
          dense
        ></q-input>
        <q-input
          class="q-mt-md"
          label="Help Text (Optional)"
          square
          v-model="group.help_text"
          outlined
          type="text"
          clearable
          dense
        ></q-input>
        <!-- <q-file v-model="category.image" accept="image/*" label="Select an image"></q-file> -->
      </q-card-section>
      <q-card-actions class="q-px-md">
        <div v-if="group.id">
          <q-btn
            icon="delete"
            color="red"
            size="md"
            label="Delete"
            @click="deleteItem(group)"
          />
          <!-- <q-btn color="secondary" icon="edit" class="q-ml-md" size="md" @click="editActive = true">Edit</q-btn> -->
        </div>

        <q-space></q-space>
        <q-btn color="grey" to="/pages-admin/products/options/">Cancel</q-btn>
        <q-btn type="button" color="primary" @click="createDynamicGroup"
          >Save</q-btn
        >
      </q-card-actions>
    </q-card>
    <div class="mt-1" v-if="group.id">
      <DynamicAttributeValues :groupId.sync="group.id"></DynamicAttributeValues>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  ApiError,
  DynamicAttribute,
  DynamicAttributeValue,
  DynamicAttributesService,
} from "@/openapi";
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import DynamicAttributeValues from "@/components/admin/productOptions/DynamicAttributeValues.vue";
@Component({
  components: { DynamicAttributeValues },
})
export class CreateEditProductOptions extends Vue {
  @Prop({ default: false }) createdMode: boolean;
  @Prop() optionsId: any;
  label = "Create";
  editActive = false;
  group: DynamicAttribute = <DynamicAttribute>{};
  attributesList: Array<DynamicAttributeValue> = Array<DynamicAttributeValue>();
  mounted() {
    if (!this.createdMode) {
      this.label = "Edit";
    }
    if (this.optionsId) {
      this.loadData();
    }
  }
  createDynamicGroup() {
    if (this.group.id) {
      DynamicAttributesService.dynamicAttributesUpdate(
        this.group.id,
        this.group
      ).then((result: DynamicAttribute) => {
        this.group = result;
        this.$q.notify({
          message: "Product Option Updated",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
      });
    } else {
      DynamicAttributesService.dynamicAttributesCreate(this.group)
        .then((result: DynamicAttribute) => {
          this.group = result;
          this.$q.notify({
            message: "Product Option Created",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
        })
        .catch((err: ApiError) => {
          if (err.status == 400) {
            const invalidMessage = err.body.error;
            this.$q.notify({
              message: `${invalidMessage}`,
              color: "red",
              position: "top",
              classes: "text-body1",
            });
          } else {
            this.$q.notify({
              message: "Unable to create option",
              color: "red",
              position: "top",
              classes: "text-body1",
            });
          }
        });
    }
  }
  loadData() {
    DynamicAttributesService.dynamicAttributesRead(this.optionsId).then(
      (result: DynamicAttribute) => {
        this.group = result;
      }
    );
  }
  deleteItem(item: DynamicAttribute) {
    if (item.id) {
      DynamicAttributesService.dynamicAttributesDelete(item.id).then(() => {
        this.$router.push("/pages-admin/products/options/");
      });
    }
  }
}
export default toNative(CreateEditProductOptions);
</script>

<style scoped></style>
