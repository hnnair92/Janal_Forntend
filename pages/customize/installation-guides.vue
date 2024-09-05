<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 column">
      <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
        Installation Guidelines
      </div>
      <q-separator class="q-mt-md q-mx-lg" />
      <div class="q-flex-grow-1 column q-pa-md text-body1">
        <div>
          <p>
            Our blinds are designed for easy installation, whether you're a
            seasoned DIY enthusiast or a beginner. You'll only need a few basic
            tools to get the job done:
            <span class="para-start">
              a screwdriver, drill, drill bits, tape measure,and a pencil.</span
            >
          </p>
          <br />
          <p>
            If you're ready to install your blinds yourself, please select the
            appropriate tutorial below based on the window coverings you
            purchased.
          </p>
          <br />
          <p>
            However, if you'd rather have a professional handle the installation
            for you, click here for more information on installation services
            available locations, including details and pricing. We're here to
            make the process as convenient as possible for you.
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";
@Component({
  name: "DoitYourSelfPage",
  template: "default",
})
export class InstallationGuidePage extends Vue {}
export default toNative(InstallationGuidePage);
</script>
<style scoped>
.para-start {
  font-style: italic;
  font-weight: 500;
}
</style>
