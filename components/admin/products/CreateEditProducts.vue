<template>
  <q-page class="q-pa-md">
    <q-card class="mt-2">
      <q-card-section>
        <q-card-section class="text-h6"> {{ label }} Product </q-card-section>
        <q-separator></q-separator>
      </q-card-section>
      <q-card-section class="q-pt-none q-ma-md">
        <label class="text-weight-medium q-pb-md">Product Name</label>
        <q-input
          v-model="product.name"
          outlined
          type="text"
          dense
          class="q-mb-md"
        ></q-input>
        <label class="text-weight-medium q-pb-md">Short Description</label>
        <q-input
          v-model="product.short_description"
          outlined
          type="textarea"
          dense
          class="q-mb-md"
        ></q-input>
        <label class="text-weight-medium q-pb-md">Long Description</label>
        <q-input
          v-model="product.long_description"
          outlined
          type="textarea"
          dense
          class="q-mb-md"
        ></q-input>
        <label class="text-weight-medium q-pb-md">Product Category</label>
        <q-select
          outlined
          v-model="product.category"
          :options="categoriesList"
          option-label="name"
          option-value="id"
          emit-value
          map-options
          dense
          class="q-mb-md"
        />
        <label class="text-weight-medium q-pb-md">Product Options</label>
        <q-select
          outlined
          v-model="product.dynamic_attribute_values"
          :options="attributesList"
          option-label="value"
          option-value="id"
          emit-value
          map-options
          multiple
          dense
          class="q-mb-md"
        />
        <label class="text-weight-medium q-pb-md">Base Price</label>
        <q-input
          class="q-mb-md"
          label="Base Price"
          square
          v-model="product.base_price"
          outlined
          type="number"
          dense
        ></q-input>
        <!-- <div class="q-d-flex flex-grow-1">
                    <p class="text-subtitle2">Images</p>
                    <ImageListUpload :imageList="uploadedImages" @file-updates="changeFile"
                        @file-deleted="getProductImages"></ImageListUpload>
                    <p class="text-subtitle2 q-ma-md">Images</p>
                    <div class="row">
                        <q-card class="my-card q-mr-md" v-for="(a, i) in uploadedImages" :key="`att-${i}`" flat bordered
                            align="bottom">
                            < :src="a.large_image ?? undefined" height="250px" fit="contain">
                            </>q-img
                            <q-card-actions align="right">
                                <q-btn round icon="delete" color="red" @click="deleteImage(a)" />
                                <q-btn round icon="edit" color="primary" @click="editImage(a)" />
                            </q-card-actions>
                        </q-card>
                    </div>
                </div> -->
        <!-- <CommonImageUploader ref="imageUploaderRef" @file-uploaded="changeFile" /> -->
      </q-card-section>

      <q-card-actions class="q-px-md">
        <div v-if="product.id">
          <q-btn
            icon="delete"
            color="red"
            size="md"
            label="Delete"
            @click="deleteItem(product)"
            unelevated
          />
        </div>
        <q-space></q-space>
        <q-btn color="grey" @click="routeHome" unelevated>Cancel</q-btn>
        <q-btn type="button" @click="saveProduct" color="primary" unelevated
          >Save</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import ImageListUpload from "@/components/common/ImageListandUpload.vue";
import {
  CategoriesService,
  Category,
  Product,
  ProductsService,
  DynamicAttributeValueList,
  DynamicAttributesService,
  DynamicvaluesService,
  UploadedImages,
} from "@/openapi";
import { Component, Vue, Prop, toNative } from "vue-facing-decorator";
@Component({
  components: { ImageListUpload },
})
export class CreateEditCategories extends Vue {
  @Prop({ default: false }) createdMode: boolean;
  @Prop() productId: any;
  childComponent: any = null;
  label = "Create";
  product: Product = <Product>{};
  editActive = false;
  categoriesList: Array<Category> = [];
  attributesList: Array<DynamicAttributeValueList> =
    Array<DynamicAttributeValueList>();
  uploadedImages: Array<UploadedImages> = Array<UploadedImages>();
  mounted() {
    this.editActive = this.createdMode;
    if (!this.createdMode) {
      this.label = "Edit";
    }

    if (this.productId) {
      this.loadData();
    }
    const childComponent = this.$refs.imageUploaderRef;
    this.getAllCategories();
    this.getAllDynamicAttributesValues();
  }
  saveProduct() {
    if (this.product.id) {
      ProductsService.productsUpdate(this.product.id, this.product).then(
        (res: Product) => {
          this.product = res;
          this.$q.notify({
            message: "Product Details Updated",
            color: "green",
            position: "bottom",
            classes: "text-body1",
          });
          // this.loadData();
          this.$router.push(`/pages-admin/products/`);
        }
      );
    } else {
      ProductsService.productsCreate(this.product).then((result: Product) => {
        this.$q.notify({
          message: "Product Created",
          color: "green",
          position: "bottom",
          classes: "text-body1",
        });
        this.$router.push(`/pages-admin/products/`);
      });
    }
  }
  changeFile(file: UploadedImages) {
    if (!this.product.product_images) {
      this.product.product_images = [];
    }
    if (file && file.id) {
      this.product.product_images.push(file.id);
    }
    if (this.product.id) {
      this.saveProduct();
    } else {
      this.uploadedImages.push(file);
    }
  }

  loadData() {
    ProductsService.productsRead(this.productId).then((res: Product) => {
      this.product = res;
      this.getProductImages();
    });
  }
  deleteItem(item: Product) {
    if (item.id) {
      ProductsService.productsDelete(item.id).then(() => {
        this.$q.notify({
          message: "Product Deleted",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
        this.routeHome();
      });
    }
  }
  routeHome() {
    (this as any).$router.push("/pages-admin/products/");
  }
  getAllCategories() {
    CategoriesService.categoriesList(1, 100).then((res: any) => {
      this.categoriesList = res.results;
    });
  }
  getAllDynamicAttributesValues() {
    DynamicvaluesService.dynamicvaluesList(1, 100).then((res: any) => {
      this.attributesList = res.results;
    });
  }
  getProductImages() {
    if (this.product.id) {
      ProductsService.productsImagesList(
        this.product.id.toString(),
        1,
        100
      ).then((res: any) => {
        this.uploadedImages = res.results;
      });
    }
  }
}
export default toNative(CreateEditCategories);
</script>

<style lang="sass" scoped>
.my-card
  width: 250px
</style>
