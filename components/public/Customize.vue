<template>
  <div class="q-d-flex q-flex-grow-1 q-pa-lg">
    <div class="text-h5 header">Customize with Confidence</div>
    <div class="row q-mt-lg justify-center">
      <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
        <NuxtLink to="/customize/do-it-yourself">
          <q-card flat class="card-height text-black">
            <q-card-section class="q-ma-none q-pa-none">
              <q-icon name="handyman" size="lg"></q-icon>
            </q-card-section>
            <q-card-section> Do it Yourself Guidelines </q-card-section>
          </q-card>
        </NuxtLink>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
        <NuxtLink to="/customize/buying-guidelines">
          <q-card flat class="card-height q-pa-md">
            <q-card-section class="q-ma-none q-pa-none">
              <q-icon name="local_mall" size="lg"></q-icon>
            </q-card-section>
            <q-card-section> Buying Guidelines </q-card-section>
          </q-card>
        </NuxtLink>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
        <NuxtLink to="/customize/measuring-tips">
          <q-card flat class="card-height q-pa-md">
            <q-card-section class="q-ma-none q-pa-none">
              <q-icon name="square_foot" size="lg"></q-icon>
            </q-card-section>
            <q-card-section> Measuring Tips </q-card-section>
          </q-card>
        </NuxtLink>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12 col-xs-12">
        <NuxtLink to="/customize/installation-guides">
          <q-card flat class="card-height q-pa-md">
            <q-card-section class="q-ma-none q-pa-none">
              <q-icon name="book" size="lg"></q-icon>
            </q-card-section>
            <q-card-section> Installation Guides </q-card-section>
          </q-card>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";

@Component({
  name: "Customize",
})
export class Customize extends Vue {}
export default toNative(Customize);
</script>

<style>
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

.card-height {
  height: 250px;
  background-color: #ffe282;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 300;
  color: black;
  margin: 2%;
}

a:-webkit-any-link {
  color: none !important;
  cursor: pointer;
  text-decoration: none !important;
}
</style>
