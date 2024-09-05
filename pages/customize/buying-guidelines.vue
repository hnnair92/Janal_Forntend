<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 column">
      <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
        Buying Guidelines
      </div>
      <q-separator class="q-mt-md q-mx-lg" />
      <div class="q-flex-grow-1 column q-pa-md text-body1">
        <div class="q-px-lg q-py-md">
          <div>
            When buying shades and blinds, there are several important
            guidelines to consider to ensure you make the right choice for your
            needs, style, and budget.
            <span id="break">
              Here's a comprehensive set of buying guidelines to help you make
              an informed decision:
            </span>
          </div>
          <q-timeline color="secondary">
            <q-timeline-entry
              title="1. Measurement and Fit"
              icon="design_services"
            >
              <div class="q-mb-sm">
                · Accurate measurement is crucial. Measure your windows
                carefully, considering both width and height.
              </div>
              <div class="q-mb-sm">
                · Decide whether you want an inside mount (inside the window
                frame) or an outside mount (outside the frame).
              </div>
              <div class="q-mb-sm">
                · Account for any obstructions like handles or locks that might
                affect the fit.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="2. Functionality" icon="done_all">
              <div class="q-mb-sm">
                · Determine the primary purpose of your window treatments: light
                control, privacy, energy efficiency, or purely decorative.
              </div>
              <div class="q-mb-sm">
                · Consider special functionalities like blackout, room
                darkening, or cordless options for safety and ease of use.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="3. Material and Style" icon="style">
              <div class="q-mb-sm">
                · Choose a material that suits your needs and aesthetic
                preferences. Common materials include wood, faux wood, aluminum,
                fabric, and vinyl.
              </div>
              <div class="q-mb-sm">
                · Select a style that complements your home decor, whether it's
                roller shades, Roman shades, cellular shades, vertical blinds,
                or horizontal blinds.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="4. Color and Finish" icon="palette">
              <div class="q-mb-sm">
                · Pick colors and finishes that harmonize with your interior
                design. Many manufacturers offer a variety of options to match
                different decor styles.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="5. Budget" icon="payments">
              <div class="q-mb-sm">
                · Determine your budget early in the process.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="6. Maintenance" icon="handyman">
              <div class="q-mb-sm">
                · Consider the maintenance requirements of the chosen material.
                Some materials are easier to clean and maintain than others.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="7. Child and Pet Safety"
              icon="child_friendly"
            >
              <div class="q-mb-sm">
                · If you have children or pets, opt for cordless or child-safe
                window coverings to reduce the risk of accidents.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="8. Light and Privacy" icon="blinds">
              <div class="q-mb-sm">
                · Think about the level of light control and privacy you need.
                Some window treatments offer better light-filtering or blackout
                capabilities.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="9. Energy Efficiency"
              icon="energy_savings_leaf"
            >
              <div class="q-mb-sm">
                · Consider how your window coverings might affect energy
                efficiency. Certain shades and blinds can help insulate your
                home and reduce energy costs.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="10. Reviews and Recommendations"
              icon="reviews"
            >
              <div>
                · Research product reviews and seek recommendations from friends
                or online forums to gain insights from others who have purchased
                similar window treatments.
              </div>
            </q-timeline-entry>
          </q-timeline>
          <div>
            By following these guidelines, you can make a well-informed decision
            when purchasing shades and blinds that not only enhance the
            aesthetics of your home but also meet your practical needs.
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
@Component({
  name: "BuyingGuidelines",
  template: "default",
})
export class BuyingGuidelines extends Vue {}
export default toNative(BuyingGuidelines);
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  #break {
    display: block;
    content: "";
    clear: both;
    margin-top: 2px;
  }
}
</style>
