<template>
  <div class="q-d-flex q-flex-grow-1 q-pa-sm">
    <div class="text-h5 header">Our Top Selling Products</div>
    <div class="q-pa-sm q-d-flex q-flex-grow-1 column">
      <div
        class="row q-flex-grow-1 wrap"
        v-if="productList && productList.length"
      >
        <div
          class="q-pa-xs col-xl-2 col-lg-2 col-md-3 col-sm-6 col-xs-6"
          v-for="product_fabrics in productList"
        >
          <ProductsCard
            :category="`All_Products`"
            :product.sync="product_fabrics"
            :showDetails="false"
          >
          </ProductsCard>
        </div>
      </div>
      <div class="row q-flex-grow-1" v-else>
        <div
          class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-xs-12 q-pa-sm"
          v-for="i in 8"
        >
          <q-card flat>
            <q-skeleton height="300px" square />
            <q-card-section>
              <q-skeleton type="text" class="text-subtitle1" />
              <q-skeleton type="text" width="50%" class="text-subtitle1" />
              <q-skeleton type="text" class="text-caption" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";
import { PublicProductFabrics, PublicService } from "@/openapi";
import ProductsCard from "@/components/common/products/ProductsCard.vue";
@Component({
  name: "PublicTopSeller",
  components: { ProductsCard },
})
export class PublicTopSeller extends Vue {
  loading = false;
  productList: Array<PublicProductFabrics> = Array<PublicProductFabrics>();
  mounted() {
    this.getTopTen();
  }
  getTopTen() {
    this.loading = true;
    PublicService.publicTopSellerList(1, 10)
      .then((res: any) => {
        this.productList = res.results;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
export default toNative(PublicTopSeller);
</script>

<style scoped>
.header {
  position: relative;
  padding-left: 3.5%;
  font-weight: 500;
}

.header::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3%;
  height: 3px;
  background-color: black;
}

.my-card {
  height: 300px;
}
</style>
