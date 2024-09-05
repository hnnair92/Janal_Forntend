<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 column">
      <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
        Trusted reviews from our customers
      </div>
      <q-separator class="q-mt-md q-mx-lg" />
      <div class="q-flex-grow-1 row q-pa-sm">
        <div
          class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 q-pa-sm"
          v-for="item in testimonies"
        >
          <q-card flat class="q-pa-sm">
            <q-card-section>
              <p class="q-mt-md text-body1 text-black text-center">
                <span class="quotation-mark q-pr-md">“</span
                >{{ item.testimony }}
              </p>
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
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Testimony, state as feedback } from "@/store/testimony";

import { Component, Vue, Watch, toNative } from "vue-facing-decorator";
@Component({
  name: "PublicTestimony",
  template: "default",
})
export class PublicTestimony extends Vue {
  testimonies: Array<Testimony> = Array<Testimony>();

  mounted() {
    this.testimonies = feedback.testimonyItems;
  }
}

export default toNative(PublicTestimony);
</script>

<style>
.quotation-mark {
  font-weight: bold;
  font-size: 3rem;
  margin: 0px;
  color: rgb(0, 0, 0);
  font-family: "Times New Roman", Georgia, Serif;
}
</style>
