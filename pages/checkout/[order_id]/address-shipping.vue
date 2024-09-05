<template>
  <q-page class="q-pa-sm">
    <Head>
      <Title>Address and Shipping</Title>
    </Head>
    <Script
      type="text/javascript"
      src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"
      :async="true"
    >
    </Script>
    <Script
      type="text/javascript"
      src="https://api.convergepay.com/hosted-payments/PayWithConverge.js"
      :async="true"
      v-if="$config.public.useProduction == 'true'"
    >
    </Script>
    <Script
      type="text/javascript"
      src="https://api.demo.convergepay.com/hosted-payments/PayWithConverge.js"
      :async="true"
      v-else
    >
    </Script>

    <div class="q-d-flex q-flex-grow-1 row wrap justify-center">
      <div class="col-xl-10 col-md-12 q-pa-md q-d-flex q-flex-grow-1 column">
        <div class="q-d-flex q-flex-grow-1">
          <div class="text-h4">Address and Shipping</div>
          <q-separator class="q-my-md" />
        </div>
        <div class="q-d-flex q-flex-grow-1 row">
          <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 q-pa-md">
            <q-stepper
              v-model="step"
              ref="stepper"
              vertical
              header-nav
              active-color="secondary"
              done-color="green"
              animated
              flat
              bordered
            >
              <q-step
                :name="1"
                title="Shipping Address"
                icon="home"
                :done="step > 1"
              >
                <AddressCard
                  v-if="order.shipping_address"
                  :address.sync="order.shipping_address"
                  :provinceList.sync="provinces"
                  @validation-status="updateShippingStatus"
                />
                <q-stepper-navigation class="text-right q-mx-lg">
                  <q-btn
                    v-if="step > 1"
                    flat
                    color="primary"
                    @click="$refs.stepper.previous()"
                    label="Back"
                    class="text-black"
                    square
                    unelevated
                    size="md"
                  />
                  <q-btn
                    @click="clickNextActions()"
                    class="text-black"
                    square
                    unelevated
                    size="md"
                    v-if="!paymentFailed"
                    color="primary"
                    :label="step === 4 ? 'Proceed to Pay' : 'Continue'"
                  />
                </q-stepper-navigation>
              </q-step>
              <q-step
                :name="2"
                title="Billing Address"
                icon="receipt_long"
                :done="step > 2"
              >
                <div
                  class="row q-pa-sm"
                  v-if="order.billing_address && !order.billing_address.id"
                >
                  <div class="col">
                    <q-checkbox
                      v-model="billingSame"
                      label="Use same address as shipping"
                    />
                  </div>
                </div>
                <AddressCard
                  v-if="order.billing_address"
                  :address.sync="order.billing_address"
                  :provinceList.sync="provinces"
                  @validation-status="updateBillingStatus"
                />
                <q-stepper-navigation class="text-right q-mx-lg">
                  <q-btn
                    v-if="step > 1"
                    flat
                    color="primary"
                    @click="$refs.stepper.previous()"
                    label="Back"
                    class="text-black"
                    square
                    unelevated
                    size="md"
                  />
                  <q-btn
                    @click="clickNextActions()"
                    class="text-black"
                    square
                    unelevated
                    size="md"
                    v-if="!paymentFailed"
                    color="primary"
                    :label="step === 4 ? 'Proceed to Pay' : 'Continue'"
                  />
                </q-stepper-navigation>
              </q-step>

              <q-step
                :name="3"
                title="Shipping"
                icon="local_shipping"
                :done="step > 3"
              >
                <div class="q-pa-md">
                  <q-list>
                    <q-item tag="label" v-ripple v-if="order.shipping_address">
                      <q-item-section avatar>
                        <q-radio
                          v-model="order.shipping_address.shipping"
                          val="standard"
                          @click="order.shipping_charge = 0"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Standard Shipping</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item tag="label" v-ripple v-if="order.shipping_address">
                      <q-item-section avatar>
                        <q-radio
                          v-model="order.shipping_address.shipping"
                          val="express"
                          @click="order.shipping_charge = 10"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>Express Shipping</q-item-label>
                        <q-item-label caption>(+ $10)</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <q-stepper-navigation class="text-right q-mx-lg">
                  <q-btn
                    v-if="step > 1"
                    flat
                    color="primary"
                    @click="$refs.stepper.previous()"
                    label="Back"
                    class="text-black"
                    square
                    unelevated
                    size="md"
                  />
                  <q-btn
                    @click="clickNextActions()"
                    class="text-black"
                    square
                    unelevated
                    size="md"
                    v-if="!paymentFailed"
                    color="primary"
                    :label="step === 4 ? 'Proceed to Pay' : 'Continue'"
                  />
                </q-stepper-navigation>
              </q-step>

              <q-step :name="4" title="Payment" icon="credit_card">
                <p>
                  <strong
                    >Please click on proceed to pay now button to begin your
                    payment.</strong
                  >
                </p>
                <p>
                  For your peace of mind, we use industry-leading security
                  measures to protect your payment information. Your data is
                  encrypted and securely processed.
                </p>

                <q-stepper-navigation class="text-right q-mx-lg">
                  <q-btn
                    @click="clickNextActions()"
                    class="text-black"
                    square
                    unelevated
                    size="md"
                    v-if="!paymentFailed"
                    color="primary"
                    :label="step === 4 ? 'Proceed to Pay' : 'Continue'"
                  />
                </q-stepper-navigation>
              </q-step>

              <!-- <template v-slot:navigation>
                <q-stepper-navigation class="text-right q-mx-lg">
                  <q-btn
                    v-if="step > 1"
                    flat
                    color="primary"
                    @click="$refs.stepper.previous()"
                    label="Back"
                    class="text-black"
                    square
                    unelevated
                    size="md"
                  />
                  <q-btn
                    @click="clickNextActions()"
                    class="text-black"
                    square
                    unelevated
                    size="md"
                    v-if="!paymentFailed"
                    color="primary"
                    :label="step === 4 ? 'Proceed to Pay' : 'Continue'"
                  />
                </q-stepper-navigation>
              </template> -->
            </q-stepper>
          </div>
          <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
            <div class="q-d-flex column">
              <div>
                <div class="q-flex-grow-1 text-h5 q-mb-sm text-secondary">
                  Order Summary
                </div>
                <q-separator class="q-mb-sm" />
                <div class="row q-pa-sm text-body1">
                  <div class="col-8">Total Quantity</div>
                  <div class="col-2">{{ quantity }}</div>
                </div>
                <div class="row q-pa-sm text-body1">
                  <div class="col-8">Total Price</div>
                  <div class="col-2">${{ prices }}</div>
                </div>
                <div class="row q-pa-sm text-body1" v-if="addOnsTotal">
                  <div class="col-8">Total Add-on</div>
                  <div class="col-2">${{ addOnsTotal.toFixed(2) }}</div>
                </div>
                <div class="row q-pa-sm text-red text-body1" v-if="discount">
                  <div class="col-8">Discount</div>
                  <div class="col-4">-${{ discount.toFixed(2) }}</div>
                </div>
                <div class="row q-pa-sm text-body1">
                  <div class="col-8">Tax</div>
                  <div class="col-2">${{ tax }}</div>
                </div>
                <div class="row q-pa-sm text-body1">
                  <div class="col-8">Shipping</div>
                  <div class="col-2" v-if="order.shipping_charge == 0">
                    Free
                  </div>
                  <div class="col-2" v-else>${{ order.shipping_charge }}</div>
                </div>
                <q-separator />
                <div class="row text-h6 primary-text q-pa-md">
                  <div class="col-8">Final Amount</div>
                  <div class="col-2">${{ total.toFixed(2) }}</div>
                </div>
              </div>
              <div>
                <q-card
                  flat
                  bordered
                  v-if="
                    cartItems &&
                    cartItems.cartItems &&
                    cartItems.cartItems.length
                  "
                >
                  <q-card-section>
                    <div class="text-h6">Cart Items</div>
                    <q-separator class="q-mb-sm" />

                    <SingleCartItem
                      v-for="(item, index) in cartItems.cartItems"
                      :cartItem.sync="item"
                      :cartItemId.sync="index"
                      :buttonEnabled="false"
                    >
                    </SingleCartItem>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading :isLoading.sync="loading" message="Do not press back or refresh" />

    <q-dialog v-model="paymentFailed" persistent>
      <q-card style="width: 500px; max-width: 80vw" class="q-pa-md">
        <q-card-section>
          <div class="text-h6 text-red">Payment Failed</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-body1 text-center q-pa-md">
            Sorry, your payment could not be processed.
          </div>
          <div class="text-body1 text-center q-pa-md">
            Please check your payment details and try again.
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel Transaction"
            color="black"
            @click="goHome()"
          />
          <q-btn
            flat
            label="Retry Payment"
            color="secondary"
            @click.prevent="openLightbox()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Watch, Setup, toNative } from "vue-facing-decorator";
import {
  initializeCart,
  cartItemTotal,
  clearCart,
  cartItemTax,
  state as cartItems,
  totalCartQuantity,
  cartAddOnsTotal,
  cartDiscountTotal,
} from "@/store/cart";
import SingleCartItem from "@/components/public/SingleCartItem.vue";
import AddressCard from "@/components/customer/checkout/AddressCard.vue";
import Loading from "@/components/public/Loading.vue";
import {
  Address,
  ApiError,
  CustomerService,
  Order,
  OrderPaymentTrackingSession,
  Province,
  ProvincesService,
  PublicService,
} from "@/openapi";
@Component({
  name: "AddressShippingPage",
  template: "default",
  components: { SingleCartItem, Loading, AddressCard },
})
export class AddressShippingPage extends Vue {
  step = 1;
  testName = "";
  // address: Address = <Address>{
  //     shipping: "standard"
  // }
  shipping = "1";
  loading = true;
  billingSame = false;
  provinces: Array<Province> = Array<Province>();
  sessionToken: OrderPaymentTrackingSession = <OrderPaymentTrackingSession>{};
  orderId: any = "";
  order: Order = <Order>{};
  activeUserId: any = undefined;
  paymentFailed = false;
  shippingValidated = false;
  billingValidated = false;

  // @ts-ignore
  @Setup((props, ctx) =>
    useHead({
      title: "Janal | Shipping and Payment",
    })
  )
  // @ts-ignore
  pageHead!: useHead;

  mounted() {
    const { data } = useAuth();
    if (data && data.value?.id) {
      this.activeUserId = data.value?.id;
    }
    initializeCart();
    if (this.$route.params.order_id) {
      this.orderId = this.$route.params.order_id;
      this.checkTokenValidity();
    } else {
      (this as any).$router.go("/cart");
    }
  }
  get addOnsTotal() {
    return cartAddOnsTotal();
  }
  get discount() {
    return cartDiscountTotal();
  }
  get cartItems() {
    return cartItems;
  }

  get quantity() {
    return totalCartQuantity();
  }

  get prices() {
    return cartItemTotal();
  }

  get total() {
    let total = this.prices + this.tax;
    if (this.order && this.order.shipping_charge) {
      total += this.order.shipping_charge;
    }
    total += this.addOnsTotal;
    total -= this.discount;
    return total;
  }
  get tax() {
    return cartItemTax();
  }

  updateShippingStatus(isValid: boolean) {
    this.shippingValidated = isValid;
  }

  updateBillingStatus(isValid: boolean) {
    this.billingValidated = isValid;
  }

  loadInitialItems() {
    this.getProvinces();
  }

  @Watch("billingSame")
  billingAddressSelectChange() {
    if (this.billingSame && this.order.shipping_address) {
      let shipping: Address = this.order.shipping_address;
      let { id, ...rest } = shipping;
      this.order.billing_address = {
        ...rest,
        address_type: Address.address_type.BILLING,
        is_default: true,
        user: this.activeUserId,
      };
    } else {
      this.order.billing_address = <Address>{
        address_type: Address.address_type.BILLING,
        is_default: true,
        user: this.activeUserId,
      };
    }
  }
  checkTokenValidity() {
    if (this.$route.params.order_id)
      PublicService.publicOrderGetOrderList(this.orderId)
        .then((response: Order) => {
          this.order = response;
          if (!this.order.shipping_address) {
            this.order.shipping_address = <Address>{
              is_default: true,
              address_type: Address.address_type.SHIPPING,
              user: this.activeUserId,
            };
          }
          this.loadInitialItems();
        })
        .catch((error: ApiError) => {
          if (error.status == 403) {
            this.$q.notify({
              message:
                "Your order session expired. Please start a new checkout",
              color: "red",
              position: "top",
              classes: "text-body1",
            });
          }
          this.$router.push("/checkout");
        })
        .finally(() => {
          this.loading = false;
        });
  }
  clickNextActions() {
    if (this.step == 1 && !this.order.shipping_address?.id) {
      if (!this.shippingValidated) return;

      if (this.order.shipping_address) {
        this.order.shipping_address.shipping = Address.shipping.STANDARD;
      }
    }

    if (this.step == 2 && !this.order.billing_address?.id) {
      if (!this.billingValidated) return;
    }

    if (this.step < 4) {
      this.updateOrder();
      (this as any).$refs.stepper.next();
    } else if (this.step === 4) {
      this.loading = true;
      this.getSessionToken();
    }
  }

  phoneNumberValidator(value: any) {
    if (!value && this.order.shipping_address) {
      value = this.order.shipping_address.phone_number;
    }

    // North American phone number regex pattern
    const phoneNumberPattern = /^(?:\(\d{3}\)\s?|^\d{3}-)\d{3}-\d{4}$/;

    if (!value) {
      return true; // Allow empty values (handled by the 'Field is required' rule)
    } else if (phoneNumberPattern.test(value)) {
      return true; // Valid North American phone number format
    } else {
      return "Invalid phone number"; // Invalid phone number format
    }
  }
  updateOrder() {
    if (this.orderId) {
      this.loading = true;
      PublicService.publicOrderGetOrderUpdate(this.orderId, this.order)
        .then((result: Order) => {
          this.order = result;
          if (!this.order.billing_address) {
            this.order.billing_address = <Address>{
              address_type: Address.address_type.BILLING,
              is_default: true,
            };
          }
        })
        .catch((error: ApiError) => {
          if (error.status == 400) {
          } else {
            this.$router.push("/checkout");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
  getProvinces() {
    ProvincesService.provincesList().then((result) => {
      this.provinces = result.results;
    });
  }

  emailValidator(value: any) {
    if (!value) {
      value = this.order.shipping_address?.email;
    }
    // Regular expression for basic email validation
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!value) {
      return true; // Allow empty values (handled by the 'Field is required' rule)
    } else if (emailPattern.test(value)) {
      return true; // Valid email address
    } else {
      return "Invalid email address"; // Invalid email address format
    }
  }

  postalCodeValidator(value: any) {
    // Canadian postal code regex pattern
    const postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;

    if (!value) {
      return true; // Allow empty values (handled by the 'Field is required' rule)
    } else if (postalCodePattern.test(value)) {
      return true; // Valid Canadian postal code
    } else {
      return "Invalid postal code"; // Invalid postal code
    }
  }

  getSessionToken() {
    if (this.orderId) {
      CustomerService.customerPaymentGetSessionTokenCreate(this.orderId)
        .then((response: OrderPaymentTrackingSession) => {
          if (response.payment_session_key) {
            this.sessionToken = response;
            this.openLightbox();
          }

          this.loading = false;
        })
        .catch((err: ApiError) => {
          let msg = "Unable to process payment";
          if (err.body && Object.hasOwn(err.body, "error")) {
            const msg = err.body.error
              ? err.body.error
              : "Unable to process payment";
          }
          this.$q.notify({
            message: msg,
            color: "red",
            position: "top",
            classes: "text-body1",
          });
          this.loading = false;
        });
    }
  }

  openLightbox() {
    const paymentFields = {
      ssl_txn_auth_token: this.sessionToken.payment_session_key, // Access input field using a ref
    };

    const callback = {
      onError: (error: any) => {
        this.showResult("error", error);
      },
      onCancelled: () => {
        this.showResult("cancelled", "");
      },
      onDeclined: (response: any) => {
        this.showResult("declined", JSON.stringify(response, null, "\t"));
      },
      onApproval: (response: any) => {
        this.showResult("approval", JSON.stringify(response, null, "\t"));
      },
    };

    // Assuming PayWithConverge is available globally, you can call it here
    // @ts-ignore
    PayWithConverge.open(paymentFields, callback);
  }

  showResult(type: any, message: any) {
    if (type == "approval" && this.order.uuid && this.sessionToken.id) {
      this.sessionToken.payment_transaction_id =
        JSON.parse(message)["ssl_txn_id"];
      this.sessionToken.payment_gateway_response = message;
      this.loading = true;
      CustomerService.customerPaymentSuccessCreate(
        this.order.uuid,
        this.sessionToken.id.toString(),
        this.sessionToken
      )
        .then((result: Order) => {
          this.order = result;
          clearCart();
          this.loading = false;
          this.$router.push(
            `/checkout/success?orderId=${this.order.customer_order_id}`
          );
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    } else if (type == "declined" && this.order.uuid && this.sessionToken.id) {
      this.loading = false;
      CustomerService.customerPaymentFailedCreate(
        this.order.uuid,
        this.sessionToken.id.toString(),
        this.sessionToken
      )
        .then(() => {
          this.paymentFailed = true;
        })
        .catch(() => {})
        .finally(() => {
          this.loading = false;
        });
    }
  }

  goHome() {
    this.$router.push("/");
  }
}
export default toNative(AddressShippingPage);
</script>

<style lang="scss" scoped></style>
