<template>
  <div class="q-pa-sm">
    <q-card
      v-if="wishlistCard ? isInWishlist(product.id) : true"
      flat
      class="min-height"
    >
      <q-card-section
        v-if="product.id"
        class="q-pa-none"
        @click.prevent="productClick(product.id)"
      >
        <q-img
          :src="product.base_image?.large_image ?? undefined"
          fit="fill"
          ratio="1"
        >
          <div
            class="absolute-top text-subtitle1 discount"
            v-if="product.discount"
          >
            <span>Sale {{ product.discount }}% </span>
          </div>
          <div class="absolute-bottom-right">Perfect Fit Guarantee</div>
        </q-img>
      </q-card-section>
      <q-card-section class="q-pa-1 q-pb-none">
        <div class="q-d-flex column">
          <div class="col text-h6 q-mt-sm">
            {{ product.fabric_name }}
          </div>
          <div class="col text-caption">
            {{ product.base_product_name }}
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="q-px-sm">
        <div class="col-lg-6 col-md-6 col-xs-12 q-pa-sm" v-if="product.id">
          <q-btn
            class="full-width text-black"
            square
            unelevated
            color="primary"
            icon="visibility"
            size="md"
            padding="sm"
            label="View"
            @click.prevent="productClick(product.id)"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-xs-12 q-pa-sm">
          <q-btn
            v-if="wishlistCard"
            class="full-width"
            square
            outline
            color="black"
            icon="delete"
            padding="sm"
            label="Remove"
            @click="removeProduct(product.id)"
          />
          <q-btn
            v-else
            class="full-width"
            square
            outline
            color="black"
            :icon="isInWishlist(product.id) ? 'bookmark_added' : 'bookmark_add'"
            padding="sm"
            :label="isInWishlist(product.id) ? 'Saved' : 'Save'"
            :disable="isInWishlist(product.id)"
            @click.prevent="addToWishlist(product.id)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, toNative } from "vue-facing-decorator";
import { PublicProductFabrics } from "@/openapi";
import {
  addToWishlist,
  state,
  initializeWishList,
  removeFromWishlist,
} from "@/store/wishlist";
@Component({
  name: "ProductsCard",
})
export class ProductsCard extends Vue {
  // @Prop({ default: true }) showDetails;
  @Prop({ required: true }) product: PublicProductFabrics;
  @Prop() category: string;
  @Prop({ default: false }) wishlistCard: boolean;
  wishlistItems: any = [];

  productClick(productId: number) {
    let slug = this.$route.params.slug;
    if (!slug && this.product.category_name) {
      slug = this.product.category_name.replace(" ", "_");
    } else {
      slug = "All_Products";
    }
    this.$router.push(
      `/categories/${
        this.category ? this.category : slug
      }/details?fabricId=${this.product.id}&colorId=${this.product.default_color}&quantity=1&height=36&width=24`
    );
  }

  addToWishlist(productId: any) {
    addToWishlist(productId);
    this.$q.notify({
      message: `Added to Wishlist`,
      color: "green",
      position: "top-right",
      classes: "text-body1",
      timeout: 500,
      progress: true,
    });
  }

  removeProduct(productId: any) {
    removeFromWishlist(productId);
    this.$q.notify({
      message: `Removed from Wishlist`,
      color: "green",
      position: "top-right",
      classes: "text-body1",
      progress: true,
      timeout: 500,
    });
  }

  isInWishlist(productId: any) {
    if (!state.wishlistItems) {
      return true;
    }
    // @ts-ignore
    return state.wishlistItems.includes(productId);
  }

  mounted() {
    initializeWishList();
    this.wishlistItems = state.wishlistItems;
  }
}
export default toNative(ProductsCard);
</script>

<style scoped>
.min-height {
  /* max-height: 570px;
  width: 300px; */
  /* margin-right: 10px; */
  box-shadow: 5px 5px 5px 1px rgb(243, 243, 243) !important;
}

.sale {
  position: relative;
  display: inline-block;
  background: orange;
  color: white;
  height: 2.5rem;
  width: 2.5rem;
  text-align: center;
  font-weight: 500;
  vertical-align: middle;
  line-height: 2.5rem;
  transform: rotate(-20deg);

  &:before,
  &:after {
    content: "";
    position: absolute;
    background: inherit;
    height: inherit;
    width: inherit;
    top: 0;
    left: 0;
    z-index: -1;
    transform: rotate(30deg);
  }

  &:after {
    transform: rotate(60deg);
  }
}

@keyframes beat {
  from {
    transform: rotate(-20deg) scale(1);
  }

  to {
    transform: rotate(-20deg) scale(1.1);
  }
}

.discount {
  padding: 3px !important;
  text-align: center;
  color: white;
  background: rgba(253, 165, 0, 0.75);
  font-weight: 500;
}
</style>
