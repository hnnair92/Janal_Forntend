<template>
  <div
    class="q-d-flex q-flex-grow-1 q-pa-sm"
    :class="{ 'q-pa-sm': $q.platform.is.desktop }"
    v-if="promotions && promotions.length"
  >
    <q-carousel
      swipeable
      animated
      v-model="slide"
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      :height="$q.platform.is.desktop ? '500px' : '250px'"
    >
      <q-carousel-slide
        v-for="(image, index) in promotions"
        :name="index"
        class="q-pa-none"
      >
        <div
          class="row fit justify-start no-wrap"
          v-if="$q.platform.is.desktop && image.banner_image?.large_image"
        >
          <q-img
            class="col-12 full-height"
            :src="image.banner_image?.large_image"
            ratio="16/9"
            fit="fill"
            @click="loadProduct(image.uuid)"
          />
        </div>
        <div
          class="row fit justify-start no-wrap"
          v-else-if="
            $q.platform.is.mobile && image.banner_image_mobile?.large_image
          "
        >
          <q-img
            class="col-12 full-height"
            :src="image.banner_image_mobile?.large_image"
            ratio="1"
            fit="fill"
            @click="loadProduct(image.uuid)"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script lang="ts">
import { PublicPromotion, PublicService } from "@/openapi";
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";

@Component({
  name: "PublicPromotions",
})
export class PublicPromotions extends Vue {
  slide = 0;
  autoplay = true;
  promotionList: Array<PublicPromotion> = Array<PublicPromotion>();
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
  get promotions() {
    if (!this.promotionList) return [];

    if (this.$q.platform.is.mobile) {
      return this.promotionList.filter(
        (promotion: PublicPromotion) => promotion.banner_image_mobile
      );
    } else if (this.$q.platform.is.desktop) {
      return this.promotionList.filter(
        (promotion: PublicPromotion) => promotion.banner_image
      );
    }
  }
  loadProduct(promotion_uuid: any) {
    this.$router.push(`/categories/All_Products?campaign=${promotion_uuid}`);
  }
}
export default toNative(PublicPromotions);
</script>

<style scoped>
.header {
  position: relative;
  padding-left: 3.5%;
  font-weight: 500;
}

.header::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3%;
  height: 3px;
  background-color: black;
}

.my-card {
  height: 300px;
}

.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  /* background-color: rgba(0, 0, 0, .3); */
}
</style>
