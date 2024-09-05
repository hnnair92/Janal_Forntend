<template>
  <div class="q-d-flex-grow-1 row wrap">
    <div class="col-6 q-pa-sm" v-for="subItem in subItems" :key="subItem.id">
      <q-card flat bordered square>
        <q-card-section>
          <q-input
            class="q-pa-sm"
            label="Name"
            square
            v-model="subItem.name"
            outlined
            type="text"
            dense
            clearable
          ></q-input>
          <q-input
            class="q-pa-sm"
            label="Price"
            square
            v-model="subItem.price"
            outlined
            type="number"
            dense
            clearable
          ></q-input>
          <div class="row">
            <q-input
              class="q-pa-sm col"
              label="Min Height(Optional)"
              square
              v-model="subItem.min_height"
              outlined
              type="number"
              dense
              clearable
            ></q-input>

            <q-input
              class="q-pa-sm col"
              label="Max Height(Optional)"
              square
              v-model="subItem.max_height"
              outlined
              type="number"
              dense
              clearable
            ></q-input>
          </div>
          <div class="row">
            <q-input
              class="q-pa-sm col"
              label="Min Width(Optional)"
              square
              v-model="subItem.min_width"
              outlined
              type="number"
              dense
              clearable
            ></q-input>

            <q-input
              class="q-pa-sm col"
              label="Max Width(Optional)"
              square
              v-model="subItem.max_width"
              outlined
              type="number"
              dense
              clearable
            ></q-input>
          </div>
          <q-input
            class="q-pa-sm"
            label="Info Text"
            hint="(Optional) This will be displayed on an info Icon"
            square
            v-model="subItem.info_text"
            outlined
            type="text"
            dense
            clearable
          ></q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn
            color="red"
            size="md"
            class="q-pa-sm col-2 q-ml-md"
            icon="delete"
            outline
            @click="deleteItem(subItem)"
          />
        </q-card-actions>
      </q-card>
    </div>
    <div class="col-6 q-pa-sm">
      <div
        class="q-flex-grow-1 column justify-center align-center action-card q-px-xl q-card--bordered"
      >
        <q-btn
          color="secondary"
          icon="add"
          label="Add"
          unelevated
          outline
          @click="addSubItem"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, toNative } from "vue-facing-decorator";
import { DynamicAttributeValueSubItems } from "@/openapi";
@Component({
  name: "DynamicValueSubItem",
  emits: ["add-sub-item", "delete-sub-item"],
})
export class DynamicValueSubItem extends Vue {
  @Prop() subItems: Array<DynamicAttributeValueSubItems> | undefined;
  addSubItem() {
    this.$emit("add-sub-item");
  }
  deleteItem(subItem: DynamicAttributeValueSubItems) {
    this.$emit("delete-sub-item", subItem);
  }
}
export default toNative(DynamicValueSubItem);
</script>
<style scoped>
.action-card {
  height: 255px;
}
</style>
