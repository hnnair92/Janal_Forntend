<template>
  <q-page
    class="q-d-flex column"
    :class="{ 'q-pa-sm': $q.platform.is.desktop }"
  >
    <q-breadcrumbs active-color="secondary q-ml-lg text-subtitle2">
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el label="Shades, Blinds & Shutters" />
      <q-breadcrumbs-el
        :label="$route.params.slug.replace('_', ' ')"
        :to="`/categories/${$route.params.slug}`"
      />
    </q-breadcrumbs>
    <div class="q-flex-grow-1">
      <q-carousel swipeable animated v-model="slide" infinite height="100%">
        <q-carousel-slide
          v-for="(promotion, index) in promotionList"
          :key="`prom-${index}`"
          :name="index"
          class="q-pa-none"
        >
          <div class="column justify-center no-wrap">
            <q-img
              class="q-flex-grow-1"
              :height="$q.platform.is.desktop ? '100px' : '200px'"
              :src="
                $q.platform.is.desktop
                  ? promotion.banner_image_long?.large_image
                  : promotion.banner_image_mobile?.large_image
              "
              ratio="1"
              :fit="$q.platform.is.desktop ? 'cover' : 'fill'"
            />
            <CountDownTimer
              :dateTime.sync="promotion.end_date"
            ></CountDownTimer>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <!-- <div v-for="promotion, index in promotionList" :key="`prom-${index}`">
                <div v-if="promotion.banner_image_long" class="q-mt-sm">
                    <q-img class="q-flex-grow-1" height="125px" :src="promotion.banner_image_long?.large_image"
                        :fit="$q.platform.is.mobile ? 'contain' : 'cover'">
                    </q-img>
                </div>

            </div> -->
    </div>
    <ProductList
      :categoryName.sync="$route.params.slug"
      class="q-mt-sm"
    ></ProductList>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="secondary" @click="GoToTop">
        <q-tooltip class="text-body2">Scroll to Top</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Setup, toNative } from "vue-facing-decorator";
import ProductList from "@/components/common/products/ProductList.vue";
import { PublicService } from "@/openapi";
import type { PublicPromotion } from "@/openapi";
import CountDownTimer from "@/components/common/CountDownTimer.vue";

@Component({
  name: "PublicProductsHome",
  template: "default",
  components: { ProductList, CountDownTimer },
})
export class PublicProductsHome extends Vue {
  slide = 0;
  promotionList: Array<PublicPromotion> = Array<PublicPromotion>();

  // @ts-ignore
  @Setup((props, ctx) =>
    useHead({
      title: "Janal | Products",
    })
  )
  // @ts-ignore
  pageHead!: useHead;

  created() {
    this.loadData();
  }

  loadData() {
    PublicService.publicCampaignsList(1, 100).then((result: any) => {
      if (result.results) {
        this.promotionList = result.results;
      }
    });
  }
  GoToTop() {
    window.scrollTo(0, 0);
  }
}
export default toNative(PublicProductsHome);
</script>
