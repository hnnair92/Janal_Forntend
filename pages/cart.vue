<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 row wrap justify-center">
      <div class="col-xl-10 col-md-12 q-pa-md q-d-flex q-flex-grow-1 column">
        <div class="q-d-flex q-flex-grow-1">
          <div class="text-h4">Your Cart</div>
          <q-separator class="q-my-md" />
        </div>
        <div
          v-if="cartItems && cartItems.cartItems && cartItems.cartItems.length"
          class="q-d-flex q-flex-grow-1 row"
        >
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="text-subtitle1 q-pa-md">
              Not ready to checkout?
              <span class="cursor text-bold" @click="productsPage()"
                ><u>Continue Shopping</u></span
              >
            </div>
            <div class="q-flex-grow-1 q-pa-md">
              <SingleCartItem
                v-for="(item, index) in cartItems.cartItems"
                :cartItem.sync="item"
                :cartItemId.sync="index"
                @remove-item="removeCartItem"
                @updated-item="updateCart"
              >
              </SingleCartItem>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 q-pa-md text-body1">
            <div class="q-flex-grow-1 text-h5 q-mb-sm">Order Summary</div>
            <q-separator />
            <div class="row q-pa-md">
              <div class="col-8">Total Items</div>
              <div class="col-2">{{ quantity }}</div>
            </div>
            <div class="row q-pa-md">
              <div class="col-8">Items Total</div>
              <div class="col-4">${{ prices.toFixed(2) }}</div>
            </div>
            <div class="row q-pa-md" v-if="addOnsTotal">
              <div class="col-8">Total Add-on</div>
              <div class="col-2">${{ addOnsTotal.toFixed(2) }}</div>
            </div>
            <div class="row q-pa-md">
              <div class="col-8">Sub Total</div>
              <div class="col-4">${{ subTotal.toFixed(2) }}</div>
            </div>
            <div class="row q-pa-md text-red text-bold" v-if="discount">
              <div class="col-8">Discount</div>
              <div class="col-4">-${{ discount.toFixed(2) }}</div>
            </div>

            <div class="row q-pa-md">
              <div class="col-8">Tax</div>
              <div class="col-4">Calculated at checkout</div>
            </div>
            <div class="row q-pa-md">
              <div class="col-8">Shipping</div>
              <div class="col-4">Free</div>
            </div>
            <q-separator />
            <div class="row text-h6 primary-text q-pa-md">
              <div class="col-8">Total</div>
              <div class="col-4">${{ total.toFixed(2) }}</div>
            </div>
            <q-btn
              class="full-width text-black"
              square
              unelevated
              color="primary"
              icon="add_shopping_cart"
              label="Continue to Checkout"
              size="md"
              padding="md"
              @click.prevent="goToCheckout()"
            />
          </div>
        </div>
        <div v-else class="q-d-flex q-flex-grow-1 text-center">
          <div>
            <q-img
              src="/empty-cart.svg"
              style="max-width: 500px"
              alt="No Cart Illustration"
            />
          </div>
          <div class="text-h6 q-mt-md">Your cart is currently empty</div>
          <div class="text-body1">
            Before proceed to checkout, you must add some products to your
            shopping cart.
          </div>
          <q-btn
            class="text-black q-mt-xl"
            square
            unelevated
            color="primary"
            icon="add"
            size="md"
            padding="md"
            label="Add Products"
            @click.prevent="productsPage()"
          />
        </div>
      </div>
    </div>
    <div
      v-if="cartItems && cartItems.cartItems && cartItems.cartItems.length"
      class="q-d-flex q-flex-grow-1 column wrap justify-center q-px-md"
    >
      <div class="col-sm-12 col-xl-10 col-md-12 col-xm-12">
        <div class="text-h6 q-my-sm">Order Information</div>
        <q-separator />
        <q-list>
          <q-expansion-item
            class="text-subtitle1 text-weight-medium"
            expand-separator
            label="Return Policy"
          >
            <q-card flat>
              <q-card-section class="text-body1">
                <div class="q-pa-sm">
                  <div class="q-pa-sm q-ml-lg">
                    <p class="q-pa-sm">
                      <span class="para-start">Contact Customer Support: </span>
                      To initiate a return, please contact our customer support
                      team by [email/phone]. Provide your order number, a brief
                      description of the reason for the return, and any relevant
                      photos if the item is damaged or defective.
                    </p>

                    <p class="q-pa-sm">
                      <span class="para-start">Return Authorization: </span> Our
                      customer support team will provide you with a Return
                      Authorization (RA) number and instructions on how to
                      return the item.
                    </p>
                    <p class="q-pa-sm">
                      <span class="para-start">Pack and Ship: </span> Our
                      customer support team will provide you with a Return
                      Authorization (RA) number and instructions on how to
                      return the item.
                    </p>
                    <p class="q-pa-sm">
                      <span class="para-start">Inspection and Refund: </span>
                      Once we receive the returned item and inspect it, we will
                      process your refund. Refunds will be issued to the
                      original payment method used for the purchase. Please
                      allow 15 business days from the time we receive the
                      returned item for the refund to reflect in your account.
                    </p>
                    <p>
                      More detail about returns can be found in our
                      <NuxtLink
                        to="/warranty-returns"
                        class="text-secondary text-bold"
                        >Warranty and Returns</NuxtLink
                      >
                      page.
                    </p>
                  </div>
                  <div class="text-subtitle1 q-my-sm text-bold">Note:</div>
                  <div class="q-pa-sm q-ml-lg">
                    <p class="q-pa-sm">
                      Custom-made or personalized items are not eligible for
                      returns unless they are damaged or defective.
                    </p>

                    <p class="q-pa-sm">
                      We do not accept returns on items that have been altered
                      or modified by the customer.
                    </p>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item
            class="text-subtitle1 text-weight-medium q-mt-md"
            expand-separator
            label="Order Policy"
          >
            <q-card flat>
              <q-card-section class="text-body1">
                <div class="q-pa-sm">
                  <div class="text-body1 text-bold q-mt-md">Color:</div>
                  <q-separator />
                  <div class="q-mt-sm">
                    While we strive for accurate online color representation,
                    actual colors may vary due to monitor differences. Our
                    custom products are non-returnable, so please consider
                    potential color variations from our samples. For precise
                    color matches, request a sample before ordering, noting
                    minimal manufacturer variations. To maintain consistency,
                    order all blinds in one color at once, as dye lots may
                    differ slightly.
                  </div>
                  <div class="q-mt-sm">
                    "Rear illumination" occurs when light passes through
                    translucent fabrics from behind, creating an effect that can
                    subtly change colors and accentuate fabric textures. Please
                    be aware that our swatches do not showcase this rear
                    illumination phenomenon. If you'd like to see how rear
                    illumination can influence the color or texture of a
                    particular material, we suggest visiting your nearest
                    retailer or requesting a sample from us.
                  </div>
                  <p class="q-pt-md">
                    More detail about order policies can be found in our
                    <NuxtLink
                      to="/order-policies"
                      class="text-secondary text-bold"
                      >Order Policies</NuxtLink
                    >
                    page.
                  </p>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            class="text-subtitle1 text-weight-medium q-mt-md"
            expand-separator
            label="Shipping Options"
          >
            <q-card flat>
              <q-card-section class="text-body1">
                <div class="q-pa-sm">
                  <div class="q-mt-sm text-body1">Free shipping</div>
                  <div class="q-mt-lg text-body1">
                    You can set your mind at ease regarding shipping costs; we
                    will take care of them for you. Our goal is to provide
                    hassle-free logistics, and we'll make sure your blinds and
                    shades are delivered right to your front door.
                  </div>
                  <div class="q-mt-sm">
                    <p>
                      <span class="para-start">Changes: </span> We allow changes
                      to your order within a 24-hour window after your online
                      order is finalized. This is because production typically
                      begins shortly after your order is placed. The changes
                      must be emailed to us within 24-hour period.
                    </p>
                  </div>
                  <div class="q-mt-sm">
                    <p>
                      <span class="para-start">Cancellations: </span> If you
                      decide to cancel your order within the initial 24-hour
                      period, we will provide a refund of your payment.
                    </p>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
    <div v-if="wishlistItems.length > 0">
      <q-separator class="q-my-md" />
      <div class="text-center q-ma-sm q-flex-grow-1 text-h5 text-secondary">
        Add Products From Your Wishlist
      </div>
      <div class="row wrap justify-center">
        <div
          v-for="product_fabrics in limitedWishlistProducts"
          :key="`fabric-${product_fabrics.id}`"
          class="q-pa-sm row wrap"
        >
          <ProductsCard
            :wishlistCard="true"
            :product.sync="product_fabrics"
          ></ProductsCard>
        </div>
      </div>
      <div class="row justify-center">
        <q-btn
          class="text-black"
          square
          unelevated
          color="primary"
          to="/categories/All_Products/wishlist/"
          >Explore Wishlist</q-btn
        >
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Setup, toNative } from "vue-facing-decorator";
import {
  initializeCart,
  removeFromCart,
  cartItemTotal,
  updateCartItem,
  cartAddOnsTotal,
  cartDiscountTotal,
  state as cartItems,
  totalCartQuantity,
} from "@/store/cart";
import SingleCartItem from "@/components/public/SingleCartItem.vue";
import { CartItem, PublicService } from "@/openapi";
import {
  state,
  initializeWishList,
  removeFromWishlist,
} from "@/store/wishlist";
import ProductsCard from "@/components/common/products/ProductsCard.vue";

@Component({
  name: "PublicCart",
  template: "default",
  components: { SingleCartItem, ProductsCard },
})
export class PublicCart extends Vue {
  products: any = [];

  // @ts-ignore
  @Setup((props, ctx) =>
    // @ts-ignore
    useHead({
      title: "Janal | Cart",
    })
  )
  // @ts-ignore
  pageHead!: useHead;

  mounted() {
    initializeCart();
    initializeWishList();
    this.fetchWishlistedProducts();
  }

  get wishlistItems() {
    return state.wishlistItems ? state.wishlistItems : [];
  }

  get cartItems() {
    return cartItems;
  }
  get addOnsTotal() {
    return cartAddOnsTotal();
  }
  get discount() {
    return cartDiscountTotal();
  }

  productsPage() {
    (this as any).$router.push("/categories/All_Products/");
  }

  get quantity() {
    return totalCartQuantity();
  }

  get prices() {
    return cartItemTotal();
  }
  get subTotal() {
    return this.prices + this.addOnsTotal;
  }

  get total() {
    return this.subTotal - this.discount;
  }

  goToCheckout() {
    (this as any).$router.push("/checkout");
  }

  removeCartItem(index: number) {
    removeFromCart(index);
  }

  updateCart(index: number, item: CartItem) {
    if (index > -1 && item) {
      updateCartItem(index, item);
    }
  }

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

  get limitedWishlistProducts() {
    return this.products.slice(0, 4);
  }

  viewProduct(productId: number) {
    this.$router.push(`/categories/All_Products/details?fabricId=${productId}`);
  }

  removeProduct(productId: number) {
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
}
export default toNative(PublicCart);
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
</style>
