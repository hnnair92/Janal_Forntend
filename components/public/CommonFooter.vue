<template>
  <div class="q-d-flex q-flex-grow-1 row wrap justify-center footer-background">
    <div class="col-xl-10 col-md-12 q-pa-md q-d-flex q-flex-grow-1 row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="text-h4 q-mt-lg q-mb-md q-pa-sm">
          Sign up for our newsletter
        </div>
        <div class="text-body1 q-mb-md q-ma-sm">
          Be the first to know about our special offers, new product launches,
          and events
        </div>
        <div class="q-mb-md q-ma-sm">
          <q-input
            v-model="emailAddress"
            type="text"
            outlined
            class="q-mb-md q-pr-lg"
          />
          <q-btn
            color="secondary"
            square
            unelevated
            size="md"
            icon="check"
            label="Subscribe"
            @click="subscribeToNewsLetter()"
          />
        </div>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 q-pa-lg">
        <div class="text-h6 q-pa-sm q-mb-sm">Shop</div>
        <NuxtLink to="/categories/All_Products">
          <div class="text-body2 q-pa-sm">Shades</div>
        </NuxtLink>
        <NuxtLink to="/categories/All_Products">
          <div class="text-body2 q-pa-sm">Blinds</div>
        </NuxtLink>
        <NuxtLink to="/categories/All_Products">
          <div class="text-body2 q-pa-sm">Shutters</div>
        </NuxtLink>
        <NuxtLink to="/categories/All_Products">
          <div class="text-body2 q-pa-sm">Motorized Blinds</div>
        </NuxtLink>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 q-pa-lg">
        <div class="text-h6 q-pa-sm q-mb-sm">Help</div>
        <NuxtLink to="/help-center">
          <div class="text-body2 q-pa-sm">Help Center</div>
        </NuxtLink>
        <NuxtLink to="/account/order-status">
          <div class="text-body2 q-pa-sm">Order Status</div>
        </NuxtLink>
        <NuxtLink to="/order-policies">
          <div class="text-body2 q-pa-sm">Order policies</div>
        </NuxtLink>
        <NuxtLink to="/warranty-returns">
          <div class="text-body2 q-pa-sm">Warranty and Returns</div>
        </NuxtLink>
        <NuxtLink to="/contact-us">
          <div class="text-body2 q-pa-sm">Contact Us</div>
        </NuxtLink>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 q-pa-lg">
        <div class="text-h6 q-pa-sm q-mb-sm">About</div>
        <NuxtLink to="/about-us">
          <div class="text-body2 q-pa-sm">About Us</div>
        </NuxtLink>
        <NuxtLink to="/child-safety">
          <div class="text-body2 q-pa-sm">Child Safety</div>
        </NuxtLink>
        <NuxtLink to="/maintenance-care">
          <div class="text-body2 q-pa-sm">Maintenance and Care</div>
        </NuxtLink>
        <div class="text-body2 q-pa-sm">Technology & Innovation</div>
        <div class="text-body2 q-pa-sm">Privacy Policy</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";

@Component({
  name: "CommonFooter",
})
export class CommonFooter extends Vue {
  emailAddress = "";
  subscribeToNewsLetter() {
    //TODO
  }
}
export default toNative(CommonFooter);
</script>
<style scoped>
.footer-background {
  background-color: #f8f6f2 !important;
  color: black;
}

a:-webkit-any-link {
  color: black !important;
  cursor: pointer;
  text-decoration: none !important;
}
</style>
