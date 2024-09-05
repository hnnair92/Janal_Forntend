<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 row wrap justify-center">
      <div class="col-xl-10 col-md-12 q-pa-md q-d-flex q-flex-grow-1 column">
        <div class="q-d-flex q-flex-grow-1 justify-center row">
          <div
            class="col-md-6 col-sm-12 col-lg-6 col-xl-6 q-d-flex q-flex-grow-1"
          >
            <q-card class="q-pa-md" flat>
              <q-card-section
                class="q-mb-md text-center q-d-flex row justify-center"
              >
                <div class="text-h4">Order Placed Successfully</div>
                <q-icon name="info" color="green" size="lg" class="q-ml-sm" />
              </q-card-section>
              <q-card-section class="q-pa-lg text-center">
                <div class="text-subtitle1 q-mb-lg">
                  Your order has been confirmed.
                </div>
                <div class="text-h4 q-mb-lg text-secondary">
                  Order Number: {{ orderId }}
                </div>
                <div class="text-subtitle1 q-mb-lg">
                  Thank you for shopping with us!
                </div>
                <div class="text-subtitle1 q-mb-lg">
                  We look forward to serving you again. Explore our latest
                  collections and special offers.
                </div>
              </q-card-section>
              <q-card-section class="q-pa-lg text-center">
                <q-btn
                  class="text-black"
                  square
                  unelevated
                  color="primary"
                  icon="add_shopping_cart"
                  size="md"
                  padding="md"
                  label="Shop Now"
                  @click.prevent="goHome()"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Setup, toNative } from "vue-facing-decorator";
@Component({
  name: "PaymentSuccess",
  template: "default",
  components: {},
})
export class PaymentSuccess extends Vue {
  orderId: any = "";

  // @ts-ignore
  @Setup((props, ctx) =>
    useHead({
      title: "Order Success",
    })
  )
  // @ts-ignore
  pageHead!: useHead;

  mounted() {
    if (this.$route.query.orderId) {
      this.orderId = this.$route.query.orderId;
    }
  }

  goHome() {
    this.$router.push("/");
  }
}
export default toNative(PaymentSuccess);
</script>

<style lang="scss" scoped></style>
