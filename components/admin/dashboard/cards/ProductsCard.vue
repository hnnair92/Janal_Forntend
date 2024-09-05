<template>
  <q-card flat bordered class="my-card q-pa-sm q-ma-sm">
    <q-card-section>
      <q-icon name="package" />
      <div style="cursor: pointer" @click="products">
        <div class="text-h4 text-bold row justify-center">
          <div class="column items-center text-secondary">Products</div>
        </div>
        <div class="text-subtitle2 q-mt-sm column items-center">
          <span class="text-h6">Total</span>
          <div>
            <span class="text-h3">{{ totalProducts }}</span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <div class="row justify-between full-width">
        <div
          class="column items-center"
          style="cursor: pointer"
          @click="products"
        >
          <q-btn flat class="text-subtitle2">Explore</q-btn>
          <div>
            <span><q-icon name="query_stats" size="sm" /></span>
          </div>
        </div>
        <div
          class="column items-center"
          style="cursor: pointer"
          @click="addNew"
        >
          <q-btn flat>Add New</q-btn>
          <div>
            <span><q-icon name="add_circle" size="sm" /></span>
          </div>
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { ProductsService } from "@/openapi";

@Component({
  name: "ProductsCard",
})
export class ProductsCard extends Vue {
  serverData = undefined;
  totalProducts: number = 0;

  products() {
    this.$router.push(`/pages-admin/products/`);
  }

  addNew() {
    this.$router.push(`/pages-admin/products/create/`);
  }

  mounted() {
    ProductsService.productsList(undefined, undefined, undefined).then(
      (res) => {
        (this as any).serverData = res;
        this.totalProducts = res.count;
        // eslint-disable-next-line prettier/prettier
      }
    );
  }
}
export default toNative(ProductsCard);
</script>
