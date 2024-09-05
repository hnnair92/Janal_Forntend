<template>
  <q-page class="q-pa-sm">
    <div class="q-pa-md q-d-flex q-flex-grow-1 column">
      <!-- <div class="q-flex-grow-1">
                    <q-carousel animated v-model="slide" navigation infinite :autoplay="autoplay" arrows swipeable
                        transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
                        height="300px" @mouseleave="autoplay = true">
                        <q-carousel-slide :name="1" class="column no-wrap">
                            <div class="row fit justify-center align-center items-center q-gutter-xs q-col-gutter no-wrap">
                                <q-img class="rounded-borders full-height" fit="fill" src="promo1.png" ratio="1" />
                            </div>
                        </q-carousel-slide>
                    </q-carousel>
                </div> -->

      <div class="q-flex-grow-1">
        <!-- <q-banner rounded inline-actions :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
                    class="q-d-flex q-flex-grow-1 text-center">

                    <template v-slot:avatar>
                        <img src="https://storage.cognitawave.com/shades4u/large_format/Monterey%20RB%20Shale.jpg"
                            style="height: 100px">
                    </template>
<div class="text-h6">50% Sale on our Zebra Shades! Don't miss it</div>
<template v-slot:action>
                        <q-btn class="full-width text-black q-pa-md" square unelevated color="primary"
                            icon="add_shopping_cart">Shop Now</q-btn>
                    </template>
</q-banner> -->

        <Promotions />
      </div>
      <div class="q-flex-grow-1">
        <ViewCategories></ViewCategories>
      </div>
      <div class="q-flex-grow-1">
        <TopSellingProducts></TopSellingProducts>
      </div>
      <div class="q-flex-grow-1 q-mt-xl">
        <Testimony></Testimony>
      </div>
      <div class="q-flex-grow-1 q-mt-xl">
        <Advantage></Advantage>
      </div>
      <div class="q-flex-grow-1 q-mt-xl">
        <Customize></Customize>
      </div>
      <CommonFooter></CommonFooter>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";
import ViewCategories from "@/components/public/ViewCategories.vue";
import Promotions from "@/components/public/Promotions.vue";
import Testimony from "@/components/public/Testimony.vue";
import Advantage from "@/components/public/Advantage.vue";
import Customize from "@/components/public/Customize.vue";
import { initializeCart } from "@/store/cart";
import CommonFooter from "@/components/public/CommonFooter.vue";
import TopSellingProducts from "@/components/public/TopSellingProducts.vue";
@Component({
  name: "PublicIndex",
  template: "default",
  components: {
    ViewCategories,
    Testimony,
    Advantage,
    CommonFooter,
    TopSellingProducts,
    Customize,
    Promotions,
  },
})
export class PublicIndex extends Vue {
  slide = 1;
  autoplay = true;
  mounted() {
    initializeCart();
  }
}
export default toNative(PublicIndex);
</script>

<style scoped>
/* .q-img__image {
    object-fit: contain !important;
} */
</style>
