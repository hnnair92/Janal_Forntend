<template>
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

  <div class="full-width column wrap items-start content-start q-pa-lg">
    <div class="full-width row justify-between q-pb-md">
      <p class="text-h4">Payment Utilities</p>
    </div>

    <q-separator class="full-width row" color="orange" inset />

    <div class="q-mt-md q-d-flex">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Test Payment Gateway</div>
        </q-card-section>
        <q-card-section class="text-subtitle1 q-px-md">
          <label class="text-weight-light">First Name</label>
          <q-input
            v-model="first_name"
            outlined
            type="text"
            dense
            class="q-py-sm"
            color="secondary"
          ></q-input>
          <label class="text-weight-light">Last Name</label>
          <q-input
            v-model="last_name"
            outlined
            type="text"
            dense
            class="q-py-sm"
            color="secondary"
          ></q-input>
        </q-card-section>
        <q-card-section>
          Use the button below to test the connection to payment Gateway. The
          transaction amount will be a 0.01 CAD.
        </q-card-section>
        <q-card-section v-if="errorMessage" class="text-red q-mt-sm">
          <q-icon name="warning" /> Payment gateway failed with following error:
          <div v-html="errorMessage"></div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            unelevated
            color="secondary"
            label="Test Now"
            outline
            class="full-width"
            @click="testPayment"
            :loading="loading"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import {
  AdminPaymentGatewayService,
  AdminService,
  ApiError,
  OrderPaymentTrackingSession,
} from "@/openapi/";
@Component({
  name: "PaymentUtils",
  components: {},
})
export class PaymentUtils extends Vue {
  addressDialog = false;
  first_name = "";
  last_name = "";
  sessionToken: OrderPaymentTrackingSession = <OrderPaymentTrackingSession>{};
  errorMessage = "";
  loading = false;

  testPayment() {
    if (!this.first_name || !this.last_name) {
      this.$q.notify({
        message: "Both fields are required!",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
      return;
    }
    this.errorMessage = "";
    this.loading = true;
    AdminPaymentGatewayService.adminPaymentTestPaymentList(
      this.first_name,
      this.last_name
    )
      .then((res: OrderPaymentTrackingSession) => {
        this.sessionToken = res;
        this.openLightbox();
      })
      .catch((err: ApiError) => {
        if (err.body && Object.hasOwn(err.body, "response")) {
          this.errorMessage = err.body.response;
        } else if (err.body && Object.hasOwn(err.body, "error")) {
          this.errorMessage = err.body.error;
        }
      })
      .finally(() => {
        this.loading = false;
      });
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
    if (type == "approval") {
      this.$q.notify({
        message: "Payment approved! Check your email for details.",
        color: "green",
        position: "top",
        classes: "text-body1",
      });
    } else if (type == "declined") {
      this.$q.notify({
        message: "Payment got declined!",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
    }
  }
}
export default toNative(PaymentUtils);
</script>
