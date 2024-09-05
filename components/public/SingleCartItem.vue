<template>
  <div class="q-d-flex q-flex-grow-1 row q-pa-sm apply-border q-mb-sm">
    <div class="col-md-3 col-lg-3 col-sm-12 q-pa-sm">
      <q-img
        v-if="cartItem.color && cartItem.color.images.length"
        :src="cartItem.color.images[0].large_image"
        height="150px"
        fit="contain"
      >
      </q-img>
    </div>
    <div class="col-md-7 col-lg-7 col-sm-12 q-pa-sm">
      <div class="text-h6 text-underline-select" @click="goToProductDetails()">
        {{ fabric.fabric_name }}
      </div>
      <div class="text-body2 text-italic">
        {{ fabric.base_product_name }}
      </div>
      <div class="text-subtitle1 q-mt-sm">
        Height:
        <span class="text-italic"
          >{{ cartItem.height_inch }} In.
          {{ cartItem.height_fraction ? cartItem.height_fraction : "" }}</span
        >&nbsp;&nbsp; Width:
        <span class="text-italic"
          >{{ cartItem.width_inch }} In.
          {{ cartItem.width_fraction ? cartItem.width_fraction : "" }}</span
        >
      </div>

      <div class="text-subtitle1 q-pt-sm" v-if="cartItem.color">
        Color: <span class="text-body1">{{ cartItem.color.color_name }}</span>
      </div>
      <div class="q-d-flex q-flex-grow-1 row self-center q-pt-sm">
        <div class="text-subtitle1 self-center" v-if="cartItem.quantity">
          Quantity:
        </div>
        <div class="q-ml-md" v-if="buttonEnabled">
          <q-input
            class="text-body1"
            square
            outlined
            v-model.number="cartItem.quantity"
            type="number"
            dense
            @change="cartUpdated"
            style="width: 30%"
            :rules="[
              (val: any) => !!val || 'Field is required',
              (val: any) =>
                (!isNaN(val) && val > 0) || 'Please enter a positive integer',
            ]"
          />
        </div>
        <div class="text-subtitle1 self-center q-pl-sm text-bold" v-else>
          {{ cartItem.quantity }}
        </div>
      </div>

      <div
        class="text-subtitle1 text-weight-medium primary-text q-pt-sm"
        v-if="cartItem.price"
      >
        <span>
          Price: ${{ parseFloat(cartItem.price) * cartItem.quantity }}</span
        >
        <span v-if="cartItem.add_on_prices" class="q-ml-md">
          Add-On(s): ${{ cartItem.add_on_prices * cartItem.quantity }}</span
        >
      </div>
      <div
        class="text-subtitle2 text-weight-medium primary-text q-pt-sm"
        v-if="cartItem.add_on_prices"
      ></div>
    </div>
    <div
      class="col-md-2 col-lg-2 col-sm-12 self-end justify-end q-py-sm"
      v-if="buttonEnabled"
    >
      <q-btn
        color="red"
        icon="delete"
        label="Remove"
        flat
        @click="removeCartItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { CartItem, PublicProductFabrics, PublicService } from "@/openapi";
import { Component, Emit, Prop, Vue, toNative } from "vue-facing-decorator";
@Component({
  name: "SingleCartItem",
  template: "default",
  components: {},
  emits: ["remove-item", "updated-item"],
})
export class SingleCartItem extends Vue {
  // @ts-ignore
  @Prop({ required: true, default: {} }) cartItem: CartItem;
  @Prop({ default: true }) buttonEnabled: any;
  @Prop({ required: true }) cartItemId: any;
  fabric: PublicProductFabrics = <PublicProductFabrics>{};

  mounted() {
    if (this.cartItem.fabric_id) {
      const fabricId: number =
        typeof this.cartItem.fabric_id == "string"
          ? parseInt(this.cartItem.fabric_id)
          : this.cartItem.fabric_id;
      PublicService.publicFabricGetProductName(fabricId)
        .then((res: PublicProductFabrics) => {
          this.fabric = res;
        })
        .catch(() => {});
    }
  }
  removeCartItem() {
    this.$emit("remove-item", this.cartItemId);
  }

  cartUpdated() {
    this.$emit("updated-item", this.cartItemId, this.cartItem);
  }
  goToProductDetails() {
    let productURL = "";
    if (this.cartItem.fabric_id) {
      productURL += `fabricId=${this.cartItem.fabric_id}`;
    }
    if (this.cartItem.color && this.cartItem.color.id) {
      productURL += `&colorId=${this.cartItem.color.id}`;
    }

    if (this.cartItem.height_inch) {
      productURL += `&height=${this.cartItem.height_inch}`;
    }
    if (this.cartItem.width_inch) {
      productURL += `&width=${this.cartItem.width_inch}`;
    }
    if (this.cartItem.quantity) {
      productURL += `&quantity=${this.cartItem.quantity}`;
    }
    if (this.cartItem.attributes_selected) {
      Object.entries(this.cartItem.attributes_selected).forEach(
        ([key, value]) => {
          // @ts-ignore
          productURL += `&productOption${key}=${value["selected"]["id"]}`;
        }
      );
    }
    if (this.cartItem.sub_items) {
      for (const subItem of this.cartItem.sub_items) {
        productURL += `&subItem${subItem.dynamic_attribute_value}=${subItem.sub_item}`;
      }
    }

    this.$router.push(`${this.cartItem.refer_url}?${productURL}`);
  }
}
export default toNative(SingleCartItem);
</script>

<style scoped>
.apply-border {
  border: 1px solid rgb(209, 209, 209);
}
</style>
