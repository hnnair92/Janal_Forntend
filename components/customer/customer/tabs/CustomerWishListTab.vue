<template>
  <div class="q-d-flex q-flex-grow-1">
    <!-- Skeleton loader-->
    <div class="q-pa-md q-d-flex q-flex-grow-1 row" v-if="loading">
      <div class="col-12 q-pa-sm">
        <q-card flat>
          <div>
            <div class="row items-start no-wrap q-mt-sm">
              <q-skeleton size="56px" square animation="fade" />

              <div class="col q-pl-sm">
                <q-skeleton type="text" square width="30%" animation="fade" />
                <q-skeleton type="text" square height="12px" animation="fade" />
                <q-skeleton
                  type="text"
                  square
                  height="12px"
                  width="75%"
                  animation="fade"
                />
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div v-else-if="products && products.length">
      <div class="q-flex-grow-1 row wrap">
        <div
          class="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-6"
          v-for="product_fabrics in products"
          :key="`fabric-${product_fabrics.id}`"
        >
          <ProductsCard
            :wishlistCard="true"
            :product.sync="product_fabrics"
          ></ProductsCard>
        </div>
      </div>
    </div>
    <div v-else>No products in wishlist</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative, Watch, Setup } from "vue-facing-decorator";
import { PublicService } from "@/openapi/";
import { state, initializeWishList } from "@/store/wishlist";
import ProductsCard from "@/components/common/products/ProductsCard.vue";

@Component({
  name: "CustomerWishListTab",
  components: { ProductsCard },
})
export class CustomerWishListTab extends Vue {
  products: any = [];
  categoryId: any = "";
  // @ts-ignore
  @Setup((props, ctx) =>
    useHead({
      title: "Janal Customer | Wishlist",
    })
  )
  // @ts-ignore
  pageHead!: useHead;

  @Watch("wishlistItems")
  fetchWishlistedProducts() {
    if (this.wishlistItems && this.wishlistItems.length) {
      PublicService.publicWishlistList(
        undefined,
        undefined,
        this.wishlistItems
      ).then((res: any) => {
        if (res && res.results) {
          this.products = res.results;
        }
      });
    }
  }

  productsPage() {
    (this as any).$router.push("/products");
  }

  get wishlistItems() {
    return state.wishlistItems ? state.wishlistItems : [];
  }

  mounted() {
    initializeWishList();
    this.fetchWishlistedProducts();
  }
}
export default toNative(CustomerWishListTab);
</script>
