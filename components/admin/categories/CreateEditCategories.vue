<template>
  <q-page class="q-pa-md">
    <q-card class="mt-2 q-pa-md">
      <q-form @submit="saveCategory" ref="form">
        <q-card-section class="q-d-flex row q-flex-grow-1">
          <div class="text-h6 col">{{ label }} Category</div>
          <div class="col text-right">
            <q-toggle
              v-model="category.is_enabled"
              color="green"
              :label="category.is_enabled ? 'Enabled' : 'Disabled'"
            />
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <q-input
            label="Name"
            v-model="category.name"
            outlined
            type="text"
            dense
            class="q-ma-md"
          ></q-input>

          <CommonImageUploader
            @file-uploaded="changeFile"
            :imageId.sync="imageId"
            @file-deleted="deleteImage"
          />

          <!-- <q-file v-model="category.image" accept="image/*" label="Select an image"></q-file> -->
        </q-card-section>

        <q-card-actions class="q-px-md">
          <div v-if="category.id">
            <q-btn
              icon="delete"
              color="red"
              size="md"
              label="Delete"
              @click="deleteItem(category)"
              unelevated
            />
          </div>
          <q-space></q-space>
          <q-btn color="grey" @click="routeHome" size="md" unelevated
            >Cancel</q-btn
          >
          <q-btn type="submit" color="primary" size="md" unelevated>Save</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { CategoriesService, Category, UploadedImages } from "@/openapi";
import { Component, Vue, Prop, toNative } from "vue-facing-decorator";
@Component
export class CreateEditCategories extends Vue {
  @Prop({ default: false }) createdMode: boolean;
  @Prop() categoryId: any;
  label = "Create";
  category: Category = <Category>{ is_enabled: true };
  editActive = false;

  get imageId() {
    if (this.category && this.category.images?.length) {
      return this.category.images[0];
    }
    return undefined;
  }

  changeFile(file: UploadedImages) {
    if (!this.category.images) {
      this.category.images = [];
    }
    if (file.id) {
      this.category.images.push(file.id);
      this.saveCategory();
    }
  }
  mounted() {
    this.editActive = this.createdMode;
    if (!this.createdMode) {
      this.label = "Edit";
    }

    if (this.categoryId) {
      this.loadData();
    }
  }
  saveCategory() {
    if (this.category.id) {
      CategoriesService.categoriesUpdate(this.category.id, this.category).then(
        (result: Category) => {
          this.category = result;
          this.$q.notify({
            message: "Category Updated",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
          this.$router.push(
            `/pages-admin/products/categories/${result.id}/edit`
          );
        }
      );
    } else if (
      !this.category.id &&
      this.category.name &&
      this.category.images
    ) {
      CategoriesService.categoriesCreate(this.category).then(
        (res: Category) => {
          this.$q.notify({
            message: "Category Created",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
          this.$router.push(`/pages-admin/products/categories/`);
        }
      );
    }
  }
  loadData() {
    CategoriesService.categoriesRead(this.categoryId).then(
      (res: Category) => (this.category = res)
    );
  }

  deleteItem(item: Category) {
    if (item.id) {
      CategoriesService.categoriesDelete(item.id).then(() => {
        this.routeHome();
      });
    }
  }
  deleteImage(id: number) {
    if (this.category.images?.length) {
      let index = this.category.images.indexOf(id);

      // If the value is found, remove it
      if (index !== -1) {
        this.category.images.splice(index, 1);
      }
      this.saveCategory();
    }
  }
  routeHome() {
    (this as any).$router.push("/pages-admin/products/categories/");
  }
}
export default toNative(CreateEditCategories);
</script>

<style scoped></style>
