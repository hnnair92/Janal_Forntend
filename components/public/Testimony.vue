<template>
  <div class="q-d-flex q-flex-grow-1 column background-black q-pa-lg">
    <div class="q-d-flex q-flex-grow-1 justify-between">
      <div class="text-h5 header">What our customers say about us</div>
      <div class="text-right">
        <q-btn
          color="secondary"
          to="/testimonials"
          label="View all reviews"
          flat
          unelevated
          size="md"
        />
      </div>
    </div>

    <div class="q-d-flex row q-mt-lg">
      <div
        class="col-lg-3 col-md-4 col-sm-6 q-pa-sm"
        v-for="item in itemsToDisplay"
      >
        <q-card flat class="q-pa-sm">
          <q-card-section class="q-mt-md text-body1 text-black text-center">
            <span class="quotation-mark q-pr-md">“</span>{{ item.testimony }}
          </q-card-section>
          <q-card-section class="q-flex-grow-1 row">
            <div class="col">
              <p class="text-body1 text-bold">{{ item.name }}</p>
            </div>
            <div class="col text-right">
              <q-rating
                size="18px"
                :max="5"
                color="primary"
                v-model="item.rating"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated infinite
                :autoplay="true" control-color="white" navigation padding arrows height="300px"
                class="bg-primary text-white shadow-1 rounded-borders">
                <q-carousel-slide class="column no-wrap flex-center q-pa-xl" v-for="(item, index) in testimonies"
                    :name="index">

                    <div class="q-mt-md text-center text-body1 text-black">
                        {{ item.testimony }}
                    </div>
                    <div class="text-h6 q-mt-md">{{ item.name }}</div>
                    <q-rating size="18px" :max="5" color="black" v-model="item.rating" />
                </q-carousel-slide>
            </q-carousel> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";
import { state as feedback, Testimony } from "@/store/testimony";

@Component({
  name: "PublicTestimony",
})
export class PublicTestimony extends Vue {
  itemsToDisplay: Array<Testimony> = Array<Testimony>();
  mounted() {
    if (feedback.testimonyItems && feedback.testimonyItems.length < 4) {
      this.itemsToDisplay = feedback.testimonyItems;
    } else {
      this.itemsToDisplay = feedback.testimonyItems
        .sort(() => Math.random() - Math.random())
        .slice(0, 4);
    }
  }
  slide = 1;
}
export default toNative(PublicTestimony);
</script>

<style scoped>
.test-export class {
  width: 500px;
}

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

.quotation-mark {
  font-weight: bold;
  font-size: 3rem;
  margin: 0px;
  color: rgb(0, 0, 0);
  font-family: "Times New Roman", Georgia, Serif;
}

.my-card {
  width: 100%;
}

.overflow-container {
  overflow-x: auto;
  white-space: nowrap;
}

.overflow-div {
  height: 200px;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
