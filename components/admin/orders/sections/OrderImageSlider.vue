<template>
  <div class="q-flex-grow-1 items-center column">
    <div class="q-pa-md admin-width">
      <q-carousel
        animated
        v-model="slide"
        arrows
        navigation
        infinite
        height="200px"
      >
        <q-carousel-slide
          v-for="(image, i) in imagesList"
          :img-src="image.large_image"
          :name="i"
        />
      </q-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { UploadedImages } from "@/openapi";
import { Component, Vue, Prop, toNative } from "vue-facing-decorator";

@Component({
  name: "OrderImageSlider",
})
export class OrderImageSlider extends Vue {
  @Prop({ required: true })
  imagesList!: Array<UploadedImages>;

  slide = 0;
}
export default toNative(OrderImageSlider);
</script>
<style scoped>
.admin-width {
  width: 200px !important;
}
</style>
