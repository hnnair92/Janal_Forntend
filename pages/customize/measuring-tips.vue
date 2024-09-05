<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 column">
      <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
        Measuring Tips
      </div>
      <q-separator class="q-mt-md q-mx-lg" />
      <div class="q-flex-grow-1 column q-pa-md text-body1">
        <p>
          Measuring accurately is crucial when it comes to installing blinds or
          shades. Here are some guidelines to help you measure your windows
          correctly:
        </p>
        <p class="text-h6">Tools You'll Need:</p>
        <ul>
          <li class="circle-checkmark">Steel measuring tape (recommended)</li>
          <li class="circle-checkmark">
            Pencil and paper to record measurements
          </li>
        </ul>
        <p class="text-h6">Step-by-Step Measuring Guidelines:</p>
        <ul>
          <li class="circle-checkmark">
            <span class="para-start"> Inside or Outside Mount: </span>Determine
            whether you want an inside mount (inside the window frame) or an
            outside mount (outside the window frame). This decision will impact
            how you take your measurements.
          </li>
          <li class="circle-checkmark">
            <span class="para-start"> Width Measurement: </span>
            <ul class="q-pl-md">
              <li class="q-ma-md">
                <span class="para-start"> For an inside mount: </span>Measure
                the width inside the window frame from the top, middle, and
                bottom. Record the narrowest measurement of the three. This
                ensures that the blinds or shades will fit within the frame.
              </li>
              <li class="q-ma-md">
                <span class="para-start"> For an outside mount: </span>Measure
                the width of the area you want to cover. Add extra width for
                coverage and aesthetics. Typically, add 2-4 inches on each side,
                but it can vary based on your preference.
              </li>
            </ul>
          </li>
          <li class="circle-checkmark">
            <span class="para-start"> Height Measurement: </span>
            For both inside and outside mounts, measure the height from the top
            of the window frame to the desired length. This is typically where
            the blinds or shades will end.
          </li>
          <li class="circle-checkmark">
            <span class="para-start">
              Depth Measurement (Inside Mount Only):
            </span>
            Measure the depth of the window frame. This is important if you're
            installing blinds or shades that have a headrail or brackets that
            need to fit within the frame.
          </li>
          <li class="circle-checkmark">
            <span class="para-start"> Consider Obstructions: </span>
            Account for any obstructions inside or outside the window frame,
            such as window cranks, handles, or locks. Measure around these
            obstructions or note their position for customizations.
          </li>
          <li class="circle-checkmark">
            <span class="para-start">Repeat Measurements: </span>
            It's a good practice to measure each window separately, even if they
            appear to be the same size. Windows can have slight variations in
            measurements.
          </li>
          <li class="circle-checkmark">
            <span class="para-start"> Record and Label: </span>
            Write down all measurements clearly, and label them with the window
            location (e.g., bedroom, living room) to avoid confusion during
            installation.
          </li>
          <li class="circle-checkmark">
            <span class="para-start"> Check for Level: </span>
            Ensure that the window frame is level by using a level tool. If it's
            not level, make a note of it as it may affect the fit of your blinds
            or shades.
          </li>
          <li class="circle-checkmark">
            <span class="para-start"> Consult Manufacturer Guidelines: </span>
            Refer to the manufacturer's instructions or guidelines for specific
            measuring requirements, as different blinds and shades may have
            unique requirements.
          </li>
        </ul>
        <p class="para-start">
          Accurate measurements are essential to ensure your blinds or shades
          fit properly and function as intended. Taking the time to measure
          carefully can save you the hassle of returns or adjustments later on.
        </p>
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
export class MeasuringTipsPage extends Vue {}
export default toNative(MeasuringTipsPage);
</script>
