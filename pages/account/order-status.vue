<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 row wrap justify-center">
      <div
        class="col-xl-10 col-md-10 col-sm-10 col-xs-12 q-pa-md q-d-flex q-flex-grow-1 column"
      >
        <div class="q-d-flex q-flex-grow-1 justify-center row">
          <div class="q-flex-grow-1 col-12" v-if="order.customer_order_id">
            <q-card class="q-pa-sm q-flex-grow-1" flat>
              <q-card-section>
                <div class="q-d-flex row">
                  <div class="col text-h5 text-secondary q-pa-sm">
                    Order Details
                  </div>
                  <div class="col text-h5 text-right">
                    <q-btn
                      color="secondary"
                      outline
                      unelevated
                      icon="download"
                      label="View Invoice"
                      @click="downloadInvoice"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <div class="q-d-flex row">
              <div
                class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm"
              >
                <q-card
                  class="q-pa-md q-mt-sm q-flex-grow-1 shipping-card-height"
                  flat
                >
                  <q-card-section>
                    <div class="text-h6 q-pa-sm">Shipping Address</div>
                    <q-separator />
                    <div class="text-body1 q-pa-md">
                      <div>
                        {{ order.shipping_address?.first_name }}
                        {{ order.shipping_address?.last_name }}
                      </div>
                      <div>
                        {{ order.shipping_address?.apartment + ", " }}
                        {{ order.shipping_address?.address }}
                      </div>
                      <div>
                        {{ order.shipping_address?.city + ", " }}
                        {{ order.shipping_address?.province_name }}
                      </div>
                      <div>{{ order.shipping_address?.postal_code }}</div>
                      <div>{{ order.shipping_address?.phone_number }}</div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div
                class="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 q-pa-sm"
              >
                <q-card
                  class="q-pa-md q-mt-sm q-flex-grow-1 shipping-card-height"
                  flat
                >
                  <q-card-section>
                    <div class="text-h6 q-pa-sm">Progress</div>
                    <q-separator />
                  </q-card-section>

                  <q-card-section>
                    <div v-if="order.status == 'confirmed'" class="text-body1">
                      We received your order and make in it ready to ship. We
                      will email you once your item is shipped.
                    </div>
                    <div v-if="order.status == 'shipped'" class="text-body1">
                      Please find your tracking information below
                      <div class="q-pa-sm" v-if="order.tracking_id">
                        Tracking number: {{ order.tracking_id }}
                      </div>
                      <div class="q-pa-sm" v-if="order.tracking_partner_name">
                        Shipped via: {{ order.tracking_partner_name }}
                      </div>
                      <div class="q-pa-sm" v-if="order.tracking_partner_link">
                        <q-btn
                          :to="`${order.tracking_partner_link}`"
                          label="Track Package"
                          outline
                          color="secondary"
                          target="_blank"
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <q-card class="q-pa-md q-mt-sm" flat>
              <q-card-section>
                <div class="text-h6 q-pa-sm">Items in your order</div>
                <q-separator />
              </q-card-section>
              <q-card-section>
                <SingleCartItem
                  v-for="(item, index) in order.items"
                  :cartItem.sync="item"
                  :buttonEnabled="false"
                  :cartItemId.sync="index"
                >
                </SingleCartItem>
              </q-card-section>
            </q-card>
          </div>
          <!-- Order check inputs -->
          <div
            class="col-md-8 col-lg-8 col-xl-8 col-sm-12 col-xs-12 q-d-flex q-flex-grow-1"
            v-else
          >
            <q-card class="q-pa-md" flat>
              <q-card-section>
                <div class="text-h5 text-center text-secondary">
                  Order Status
                </div>
              </q-card-section>
              <q-separator class="q-mb-md" />
              <q-card-section>
                <div
                  v-if="errorMessage"
                  class="text-red text-center text-body1"
                >
                  {{ errorMessage }}
                </div>
                <label class="text-weight-medium q-px-md">Order ID</label>
                <q-input
                  v-model="orderCheck.order_id"
                  type="text"
                  outlined
                  class="q-px-md q-mb-md"
                  :rules="[(val) => !!val || 'This field is required']"
                  ref="idRef"
                  lazy-rules
                />
                <label class="text-weight-medium q-px-md">Billing Email</label>
                <q-input
                  v-model="orderCheck.email"
                  type="text"
                  outlined
                  class="q-px-md q-mb-md"
                  lazy-rules
                  :rules="[(val) => !!val || 'This field is required']"
                  ref="emailRef"
                />
                <div class="text-right q-px-md q-mb-md">
                  <q-btn
                    class="text-right text-black full-width"
                    square
                    unelevated
                    color="primary"
                    :loading="loading"
                    icon="login"
                    @click.prevent="submitRequest"
                    size="md"
                    padding="md"
                    label="Check Status"
                  />
                </div>
                <q-separator></q-separator>
                <div class="q-pa-md q-mb-md">
                  <div class="text-center text-body1 q-my-md">
                    Do you have a Janal account with us? Login to see more
                    details about your order
                  </div>
                  <div>
                    <q-btn
                      class="text-right text-white full-width"
                      size="md"
                      padding="md"
                      unelevated
                      color="secondary"
                      to="/account/login"
                      >Login</q-btn
                    >
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ApiError, Order, PublicOrderCheck, PublicService } from "@/openapi";
import { Component, Vue, Setup, toNative } from "vue-facing-decorator";
import SingleCartItem from "@/components/public/SingleCartItem.vue";
// const meta = definePageMeta({
//     middleware: ['auth']
// })
@Component({
  name: "OrderStatusPage",
  template: "default",
  components: { SingleCartItem },
  // mixins: [meta]
})
export class OrderStatusPage extends Vue {
  errorMessage = "";

  orderCheck: PublicOrderCheck = <PublicOrderCheck>{};
  loading = false;
  order: Order = <Order>{};

  // @ts-ignore
  @Setup((props, ctx) =>
    useHead({
      title: "Janal | Order Status",
    })
  )
  // @ts-ignore
  pageHead!: useHead;

  mounted() {}
  submitRequest() {
    this.errorMessage = "";
    (this as any).$refs.idRef.validate();
    (this as any).$refs.emailRef.validate();
    if (
      (this as any).$refs.idRef.hasError ||
      (this as any).$refs.emailRef.hasError
    ) {
      return false;
    }
    this.loading = true;
    PublicService.publicCheckOrderCreate(this.orderCheck)
      .then((order: Order) => {
        this.order = order;
      })
      .catch((error: ApiError) => {
        if (error.status == 400) {
          this.errorMessage = error.body;
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
  downloadInvoice() {
    if (this.order.uuid) {
      window.open(
        `${this.$config.public.baseURL}/customer/orders/${this.order.uuid}/invoice`,
        "_blank"
      );
    }
  }
}
export default toNative(OrderStatusPage);
</script>

<style scoped>
h6 {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #c0c0c0;
  line-height: 0.1em;
  margin: 10px 0 20px;
}

h6 span {
  background: #fff;
  padding: 0 10px;
}

.shipping-card-height {
  height: 250px;
}
</style>
