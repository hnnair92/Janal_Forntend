<template>
  <div>
    <q-card flat bordered class="q-pa-md">
      <q-card-section class="q-pb-none">
        <div class="q-flex-grow-1 row">
          <div class="col">
            <div class="q-flex-grow-1 row items-center">
              <div class="text-subtitle1 text-bold">
                Order #{{ orderInfo.customer_order_id }}
              </div>
              <div class="text-subtitle1 text-bold q-px-sm">
                | {{ $dayjs(orderInfo.created_on).format("LLL") }}
              </div>
            </div>
            <div class="text-subtitle1 text-bold">
              Total: ${{ orderInfo.order_total }}
            </div>
          </div>
          <div class="col text-right">
            <q-btn
              v-if="orderInfo.status == 'shipped'"
              color="green"
              icon="check_circle"
              label="Shipped"
              size="md"
              unelevated
            />
            <q-btn
              v-if="orderInfo.status == 'confirmed' && enableControl"
              color="secondary"
              icon="local_shipping"
              label="Ship Order"
              @click="shipOrder()"
              unelevated
              size="md"
            />
            <div class="q-mt-sm" v-if="orderInfo.shipped_date">
              Shipping Date: {{ $dayjs(orderInfo.shipped_date).format("LLL") }}
            </div>
          </div>
        </div>
        <q-separator />
      </q-card-section>
      <q-card-section class="q-pb-none">
        <div class="q-flex-grow-1 column" v-for="cartItem in orderInfo.items">
          <div class="q-d-flex">
            <div class="text-subtitle1">
              <span class="text-italic">Fabric: </span>
              <span class="text-weight-medium">{{ cartItem.fabric_name }}</span>
            </div>
            <div class="row">
              <div>
                <OrderImageSlider
                  :imagesList="cartItem.color.images"
                ></OrderImageSlider>
              </div>
              <div class="col-6 q-pa-md">
                <div class="text-subtitle1">
                  <span class="text-italic">Color: </span>
                  <span class="text-weight-medium">{{
                    cartItem.color_name
                  }}</span>
                </div>
                <div class="text-subtitle1 q-d-flex">
                  <span class="text-italic">Options </span>
                  <div class="row">
                    <div
                      v-for="(opt, index) in cartItem.attribute_values_selected"
                      :key="`opt-${index}`"
                      class="q-ml-xl"
                    >
                      {{ opt.attribute_name }}:
                      <span class="text-weight-medium">
                        {{ opt.value_name }}</span
                      >
                      <span v-if="opt.sub_item" class="text-italic">
                        ({{ opt.sub_item }})</span
                      >
                    </div>
                  </div>
                </div>

                <div class="text-subtitle1">
                  <span class="text-italic">Height: </span>
                  <span class="text-weight-medium"
                    >{{ cartItem.height_inch }} Inch</span
                  >
                  <span v-if="cartItem.height_fraction != '0'">{{
                    cartItem.height_fraction
                  }}</span>
                </div>
                <div class="text-subtitle1">
                  <span class="text-italic">Width: </span>
                  <span class="text-weight-medium"
                    >{{ cartItem.width_inch }} Inch
                  </span>
                  <span v-if="cartItem.width_fraction != '0'">{{
                    cartItem.height_fraction
                  }}</span>
                </div>

                <div class="text-subtitle1">
                  <span class="text-italic">Quantity: </span>
                  <span class="text-weight-medium"
                    >{{ cartItem.quantity }}
                  </span>
                </div>
                <div class="text-subtitle1">
                  <span class="text-italic">Price: </span>
                  <span class="text-weight-medium">${{ cartItem.price }} </span>
                </div>
                <div class="text-subtitle1" v-if="cartItem.add_on_prices">
                  <span class="text-italic">Add On(s): </span>
                  <span class="text-weight-medium"
                    >${{ cartItem.add_on_prices }}
                  </span>
                </div>
              </div>
              <div class="col q-pa-sm">
                <div class="q-flex-grow-1">
                  <p class="text-subtitle1 q-ma-sm">
                    <q-icon name="local_shipping" color="secondary" size="md" />
                    Shipping Address
                  </p>
                  <q-separator />
                  <div
                    v-if="orderInfo.shipping_address"
                    class="text-subtitle2 q-pa-sm"
                  >
                    <p class="q-ma-sm">
                      {{ orderInfo.shipping_address.first_name }}
                      {{ orderInfo.shipping_address.last_name }}
                    </p>
                    <p
                      class="q-ma-sm"
                      v-if="orderInfo.shipping_address.apartment"
                    >
                      {{ orderInfo.shipping_address.address }}
                    </p>
                    <p class="q-ma-sm">
                      {{ orderInfo.shipping_address.address }}
                    </p>
                    <p class="q-ma-sm">
                      {{ orderInfo.shipping_address.city }},
                      {{ orderInfo.shipping_address.province_name }}
                    </p>
                    <p class="q-ma-sm">
                      {{ orderInfo.shipping_address.postal_code }}
                    </p>
                  </div>
                  <div class="q-pa-sm">
                    Email:
                    <span class="text-subtitle2">{{
                      orderInfo.shipping_address?.email
                    }}</span>
                  </div>
                  <div class="q-pa-sm">
                    Phone:
                    <span class="text-subtitle2">{{
                      orderInfo.shipping_address?.phone_number
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-separator />
      </q-card-section>
      <q-card-section class="q-pb-none">
        <q-btn
          color="blue"
          icon="alternate_email"
          label="View Billing Information"
          unelevated
          class="q-mx-sm"
          @click="addressDialog = true"
        />
        <q-btn
          color="secondary"
          icon="receipt_long"
          label="Download Invoice"
          unelevated
          class="q-mx-sm"
          @click="openDownloadLink"
        />
        <q-btn
          v-if="orderInfo.tracking_id"
          color="blue"
          icon="local_shipping"
          label="View Tracking Information"
          unelevated
          class="q-mb-auto"
          outline
          @click="trackingDialog = true"
        />
      </q-card-section>
    </q-card>
    <q-dialog v-model="addressDialog" persistent>
      <q-card style="width: 400px" class="q-pa-md">
        <q-card-section class="q-pb-none">
          <div class="text-h6">Billing Address</div>
          <q-separator />
        </q-card-section>

        <q-card-section
          class="text-subtitle1 q-pa-sm"
          v-if="orderInfo.billing_address"
        >
          <p class="q-ma-sm">
            {{ orderInfo.billing_address.first_name }}
            {{ orderInfo.billing_address.last_name }}
          </p>
          <p class="q-ma-sm" v-if="orderInfo.billing_address.apartment">
            {{ orderInfo.billing_address.address }}
          </p>
          <p class="q-ma-sm">{{ orderInfo.billing_address.address }}</p>
          <p class="q-ma-sm">
            {{ orderInfo.billing_address.city }},
            {{ orderInfo.billing_address.province_name }}
          </p>
          <p class="q-ma-sm">{{ orderInfo.billing_address.postal_code }}</p>

          <div class="q-pa-sm">
            Email:
            <span class="text-subtitle2">{{
              orderInfo.billing_address?.email
            }}</span>
          </div>
          <div class="q-pa-sm">
            Phone:
            <span class="text-subtitle2">{{
              orderInfo.billing_address?.phone_number
            }}</span>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="trackingDialog" persistent>
      <q-card style="width: 400px" class="q-pa-md">
        <q-card-section class="row items-center q-pb-md">
          <div class="text-h6">Tracking Information</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />

        <q-card-section
          class="text-subtitle1 q-pa-sm"
          v-if="orderInfo.tracking_id"
        >
          <p class="q-ma-sm">
            Tracking ID:
            <span class="text-subtitle1 text-weight-medium">
              {{ orderInfo.tracking_id }}</span
            >
          </p>
          <p class="q-ma-sm" v-if="orderInfo.tracking_partner_name">
            Shipping Partner:
            <span class="text-subtitle1 text-weight-medium">
              {{ orderInfo.tracking_partner_name }}</span
            >
          </p>

          <div class="q-ma-sm q-pt-md" v-if="orderInfo.tracking_partner_link">
            <q-btn
              :to="`${orderInfo.tracking_partner_link}`"
              label="Track Package"
              color="secondary"
              class="full-width"
              outline
              unelevated
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { AdminOrder, AdminService } from "@/openapi";
import { Component, Vue, Prop, toNative } from "vue-facing-decorator";
import OrderImageSlider from "@/components/admin/orders/sections/OrderImageSlider.vue";
@Component({
  name: "OrderCard",
  emits: ["ship-order"],
  components: { OrderImageSlider },
})
export class OrderCard extends Vue {
  @Prop({ required: true })
  orderInfo!: AdminOrder;

  @Prop({ default: true }) enableControl: boolean;
  addressDialog = false;
  trackingDialog = false;

  shipOrder() {
    this.$emit("ship-order", this.orderInfo);
  }
  async openDownloadLink() {
    if (this.orderInfo.id) {
      window.open(
        `${this.$config.public.baseURL}/customer/orders/${this.orderInfo.uuid}/invoice`,
        "_blank"
      );
    }
  }
}
export default toNative(OrderCard);
</script>
