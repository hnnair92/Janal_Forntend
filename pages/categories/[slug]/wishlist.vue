<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 row wrap justify-center">
      <div class="col-xl-10 col-md-12 q-pa-md q-d-flex q-flex-grow-1 column">
        <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
          Wishlist
        </div>
        <div class="text-center q-flex-grow-1 text-h6 text-secondary">
          Your Personal Collection of Desired Blinds
        </div>
        <q-separator class="q-my-md" />
        <div
          v-if="products.length < 1"
          class="q-d-flex q-flex-grow-1 q-mt-lg text-center"
        >
          <q-icon name="add_shopping_cart" size="xl" />
          <div class="text-h6 q-mt-md">Your wishlist is currently empty</div>
          <div class="text-body1 q-mt-md">
            Explore wide range of products and add them to your wishlist.
          </div>
          <q-btn
            class="text-black q-mt-lg"
            square
            unelevated
            color="primary"
            icon="add"
            size="md"
            padding="md"
            label="Explore Products"
            @click.prevent="productsPage()"
          />
        </div>
        <div v-else>
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
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Setup, toNative, Watch } from "vue-facing-decorator";
import { state, initializeWishList } from "@/store/wishlist";
import { PublicService } from "@/openapi";
import ProductsCard from "@/components/common/products/ProductsCard.vue";
@Component({
  name: "Wishlist",
  template: "default",
  components: { ProductsCard },
})
export class Wishlist extends Vue {
  products: any = [];
  categoryId: any = "";
  // @ts-ignore
  @Setup((props, ctx) =>
    useHead({
      title: "Janal | Wishlist",
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
    (this as any).$router.push("/categories/All_Products/");
  }

  get wishlistItems() {
    return state.wishlistItems ? state.wishlistItems : [];
  }

  mounted() {
    initializeWishList();
    this.fetchWishlistedProducts();
  }
}
export default toNative(Wishlist);
</script>

<style scoped>
.cursor {
  cursor: pointer;
}

.min-height {
  max-height: 570px;
  width: 300px;
  box-shadow: 5px 5px 5px 1px rgb(243, 243, 243) !important;
}

#cards-center {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 90%;
}

@media (max-width: 768px) {
  #cards-center {
    width: 100%;
    justify-content: center;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  #cards-center {
    width: 100%;
  }
}
</style>
