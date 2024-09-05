<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 column">
      <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
        Do it Yourself Guidelines
      </div>
      <q-separator class="q-mt-md q-mx-lg" />
      <div class="q-flex-grow-1 column q-pa-md text-body1">
        <p>
          Here are some general DIY guidelines for installing blinds or shades.
          Keep in mind that specific instructions may vary based on the brand
          and type of window coverings you have, so always refer to the
          manufacturer's instructions included with your product.
        </p>
        <p>These steps are intended as a basic overview:</p>
        <p class="text-h6">Tools and Materials Needed:</p>
        <ul>
          <li class="circle-checkmark">Screwdriver</li>
          <li class="circle-checkmark">Drill</li>
          <li class="circle-checkmark">Drill bits</li>
          <li class="circle-checkmark">Tape measure</li>
          <li class="circle-checkmark">Pencil</li>
          <li class="circle-checkmark">Level</li>
          <li class="circle-checkmark">
            Brackets and screws provided with your blinds or shades
          </li>
        </ul>
        <p class="text-h6">Preparation:</p>
        <ul>
          <li class="circle-checkmark">
            Unbox and inspect your blinds or shades to ensure all necessary
            components are present.
          </li>
          <li class="circle-checkmark">
            Measure your window accurately to determine the mounting location
            for your brackets. Measure both the width and height of the window
            to ensure a proper fit.
          </li>
        </ul>
        <p class="text-h6">Installation Steps:</p>
        <ul>
          <li class="circle-checkmark">
            <span class="para-start">Mark Bracket Locations:</span> Use a pencil
            to mark the positions where you'll install the brackets. Ensure they
            are level and at the appropriate height and distance from the window
            frame.
          </li>
          <li class="circle-checkmark">
            <span class="para-start">Install Brackets:</span> Use a drill to
            create pilot holes at the marked bracket locations. Attach the
            brackets securely to the wall or window frame using the provided
            screws. Make sure they are level and aligned.
          </li>
          <li class="circle-checkmark">
            <span class="para-start">Mount the Headrail:</span> For inside mount
            blinds or shades, slide the headrail into the brackets until it
            clicks into place. For outside mount, attach the headrail to the
            front of the brackets.
          </li>
          <li class="circle-checkmark">
            <span class="para-start">Attach Valance (if applicable):</span> If
            your blinds or shades come with a valance, attach it according to
            the manufacturer's instructions.
          </li>
          <li class="circle-checkmark">
            <span class="para-start">Test Operation:</span> Operate the blinds
            or shades to ensure they function correctly. Test the cord, motor or
            wand mechanism, as well as any tilt or lift mechanisms.
          </li>
          <li class="circle-checkmark">
            <span class="para-start">Make Adjustments:</span> If the blinds are
            uneven or not hanging level, you may need to adjust the brackets or
            headrail. Follow the manufacturer's instructions for adjustments.
          </li>
          <li class="circle-checkmark">
            <span class="para-start">Motorized:</span> Refer the manual to setup
            the connection.
          </li>
          <li class="circle-checkmark">
            <span class="para-start">Final Checks:</span> Double-check that all
            screws are tight and secure.
          </li>
        </ul>
        <p class="text-h6">Safety Tips:</p>
        <ul>
          <li class="circle-checkmark">
            If you're unsure about any step or encounter difficulties during
            installation, consult the manufacturer's instructions or consider
            seeking professional installation services.
          </li>
        </ul>
        <p class="para-start">
          Remember that these are general guidelines, and the specific steps may
          vary based on the brand and style of blinds or shades you have. Always
          follow the instructions provided by the manufacturer for the best
          results and safety.
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
export class DoitYourSelfPage extends Vue {}
export default toNative(DoitYourSelfPage);
</script>
<style>
.para-start {
  font-style: italic;
  font-weight: 500;
}

/* ul {
    line-height: 1.75rem;
} */

.text-body1 {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.text-h6 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
}

ul {
  line-height: 1.5em;
  margin: 5px 0 15px;
  padding: 0;
}

li.circle-checkmark {
  position: relative;
  list-style-type: none;
  padding-left: 2rem;

  margin-bottom: 1rem;
  margin-left: 2rem;
}

li.circle-checkmark::before {
  content: "";
  position: absolute;
  left: 0;
  top: 2px;
  border: solid 8px #efd289;
  border-radius: 8px;
}

li.circle-checkmark::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 6px;
  width: 6px;
  height: 6px;
  border: solid #000000;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
