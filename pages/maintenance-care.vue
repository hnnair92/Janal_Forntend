<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 column">
      <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
        Maintenance and Care
      </div>
      <q-separator class="q-mt-sm q-mx-lg" />
      <div class="q-flex-grow-1 column q-pa-md text-body1">
        <div class="q-px-lg q-py-md">
          <q-card flat class="q-mb-md q-pa-md">
            Maintaining and caring for shades and blinds is essential to ensure
            they remain functional and look their best for years to come.
            <span id="break">
              Here are some maintenance and care tips for shades and blinds
              window coverings.
            </span>
          </q-card>
          <q-timeline color="secondary">
            <q-timeline-entry
              title="Regular Dusting"
              icon="done_all"
              color="orange"
            >
              <div>
                If you notice stains or spots on your window coverings, use a
                mild detergent or a specialized blind and shade cleaner. Test
                the cleaner in an inconspicuous area first to ensure it won't
                damage the material.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="Spot Cleaning">
              <div>
                Dust your shades and blinds regularly to prevent the buildup of
                dirt and debris. Use a feather duster, microfiber cloth, or a
                vacuum cleaner with a brush attachment.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="Cleaning Fabric Shades" icon="wash">
              <div>
                For fabric shades like Roman or roller shades, gently wipe them
                with a damp cloth or sponge. Avoid excessive moisture to prevent
                damage.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="Wooden Blinds">
              <div>
                Wooden blinds require special care. Dust them regularly and
                clean with a wood-specific cleaner or a mixture of water and
                mild detergent. Avoid soaking the wood, as it can warp.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Aluminum or Vinyl Blinds"
              icon="roller_shades"
            >
              <div>
                Clean aluminum or vinyl blinds by wiping them with a cloth
                dampened in a mixture of water and mild dish soap. Rinse and dry
                them thoroughly.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="Vertical Blinds">
              <div>
                For vertical blinds, use a vacuum cleaner with a brush
                attachment to remove dust. Wipe any stains or spots with a damp
                cloth.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="Cellular/Honeycomb Shades" icon="blinds">
              <div>
                Dust and vacuum cellular shades with a brush attachment. For
                deeper cleaning, you can gently spot clean with a damp cloth.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="Cord Care">
              <div>
                Check the cords or strings regularly for signs of wear and tear.
                Replace any damaged cords promptly to ensure safe operation.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="Child Safety" icon="child_care">
              <div>
                Please check Health Canada's Corded Window Coverings Regulations
                for more information. Use cord cleats or cordless options for
                added safety.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="Professional Cleaning">
              <div>
                Consider professional cleaning for more delicate or heavily
                soiled window coverings. Some companies offer ultrasonic
                cleaning services for blinds and shades.
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="Avoid Harsh Chemicals">
              <div>
                Avoid using abrasive cleaners, strong chemicals, or bleach, as
                they can damage the materials and finish of your window
                coverings.
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Sun Protection"
              icon="light_mode"
              color="orange"
            >
              <div>
                You can opt for solar shades for rooms that receive a lot of
                direct sunlight. Our solar shades are designed to protect your
                space from the sun's harsh UV rays and blinding glare, ensuring
                a comfortable atmosphere. Explore our product descriptions to
                find the ideal shade that suits your needs.
              </div>
            </q-timeline-entry>
          </q-timeline>
          <q-card flat class="q-mt-md q-pa-md">
            Regular maintenance and care will not only extend the life of your
            shades and blinds but also keep them looking clean and fresh.
            <span id="break">
              Be gentle in your cleaning efforts, especially with delicate
              materials, and follow any specific care instructions provided by
              the manufacturer to maintain the warranty.
            </span>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
@Component({
  name: "MaintenanceCarePage",
  template: "default",
})
export class MaintenanceCarePage extends Vue {}
export default toNative(MaintenanceCarePage);
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
