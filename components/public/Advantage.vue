<template>
  <div class="q-d-flex q-flex-grow-1 q-pa-lg">
    <div class="text-h5 header">Janal Advantage</div>
    <div class="row q-mt-lg">
      <div class="col-sm-12 col-xl-3 col-lg-3 col-md-3 q-pa-lg">
        <div class="q-mt-lg q-pl-md">
          <img src="/blinds-open.png" />
        </div>
        <div class="q-mt-lg text-h6">Custom blinds & shades</div>
        <div class="q-mt-lg text-body1">
          Custom blinds and shades are window treatments meticulously crafted to
          precisely match the unique dimensions and design preferences of a
          specific window or area, whether they are intended for an inside or
          outside mount. Our aim is to ensure that the measurements are
          perfectly tailored to enhance the overall style and aesthetic of your
          home decor.
        </div>
      </div>
      <div class="col-sm-12 col-xl-3 col-lg-3 col-md-3 q-pa-lg">
        <div class="q-mt-lg q-pl-md">
          <img src="/tick.png" />
        </div>
        <div class="q-mt-lg text-h6">Perfect fit guarantee</div>
        <div class="q-mt-lg text-body1">
          We guarantee a perfect fit by ensuring the accuracy of your
          measurements, and our dedicated production team will meticulously
          tailor the window coverings based on the measurements you've supplied.
          <span class="text-weight-bold">Perfect fit guaranteed.</span> For
          detailed guidance on how to measure accurately, please click here to
          access our measurement guide.
        </div>
      </div>
      <div class="col q-pa-lg">
        <div class="q-mt-lg q-pl-md">
          <img src="/shipping.png" />
        </div>
        <div class="q-mt-lg text-h6">Free shipping</div>
        <div class="q-mt-lg text-body1">
          You can set your mind at ease regarding shipping costs; we will take
          care of them for you. Our goal is to provide hassle-free logistics,
          and we'll make sure your blinds and shades are delivered right to your
          front door.
        </div>
      </div>
      <div class="col-sm-12 col-xl-3 col-lg-3 col-md-3 q-pa-lg">
        <div class="q-mt-lg q-pl-md">
          <img src="/locations.png" />
        </div>
        <div class="q-mt-lg text-h6">Installation in 13 location</div>
        <div class="q-mt-lg text-body1 q-d-flex row">
          <div class="col-lg-6 col-sm-12">
            <div class="text-weight-bold q-pa-sm">
              Fergus, Elora(Head Office)
            </div>
            <div class="q-pa-sm">Waterloo</div>
            <div class="q-pa-sm">Cambridge</div>
            <div class="q-pa-sm">Guelph</div>
            <div class="q-pa-sm">Barrie</div>
            <div class="q-pa-sm">Listowel</div>
          </div>
          <div class="col-lg-6 col-sm-12 q-pl-sm">
            <div class="q-pa-sm">Drayton</div>
            <div class="q-pa-sm">Kitchener</div>
            <div class="q-pa-sm">Mount Forest</div>
            <div class="q-pa-sm">Arthur</div>
            <div class="q-pa-sm">Ottawa</div>
            <div class="q-pa-sm">Brampton</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";

@Component({
  name: "Advantage",
})
export class Advantage extends Vue {}
export default toNative(Advantage);
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
</style>
