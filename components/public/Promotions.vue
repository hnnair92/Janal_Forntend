<template>
  <div
    class="q-d-flex q-flex-grow-1 q-pa-sm"
    :class="{ 'q-pa-lg': $q.platform.is.desktop }"
    v-if="promotionList && promotionList.length"
  >
    <q-carousel
      swipeable
      animated
      v-model="slide"
      infinite
      :height="$q.platform.is.desktop ? '500px' : '250px'"
    >
      <q-carousel-slide
        v-for="(image, index) in promotionList"
        :name="index"
        class="q-pa-none"
      >
        <div class="row fit justify-start no-wrap">
          <q-img
            class="col-12 full-height"
            :src="
              $q.platform.is.desktop
                ? image.banner_image?.large_image
                : image.banner_image_mobile?.large_image
            "
            ratio="1"
            fit="cover"
          />
        </div>
        <div class="absolute-bottom custom-caption">
          <!-- <div class="text-h2">{{ image.name }}</div> -->
          <q-btn
            class="q-mt-md text-bold primary"
            label="Shop Now"
            unelevated
            outline
            size="lg"
            @click="loadProduct(image.uuid)"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>

    <!-- <q-carousel arrows animated v-model="slide" height="500px">
            
            <q-carousel-slide name="first" v-for="promotion in promotionList">
                <div class="row fit justify-start no-wrap">
                    <q-img class=" col-12 full-height" :img-src="promotion.banner_image?.large_image" fit="contain"
                        ratio="1" />
                    <div class="absolute-bottom custom-caption">
                        <div class="text-h2">{{ promotion.name }}</div>
                        <q-btn class="q-mt-md text-bold" color="primary" label="Shop Now" outline size="lg" />
                    </div>
                </div>

            </q-carousel-slide>
        </q-carousel> -->

    <!-- <div v-for="promotion in promotionList">

            <q-img v-if="promotion.banner_image && promotion.banner_image.large_image" width="100%" height="25vh"
                fit="contain" :src="promotion.banner_image?.large_image" />
        </div> -->
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
  loadProduct(promotion_uuid: string) {
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
