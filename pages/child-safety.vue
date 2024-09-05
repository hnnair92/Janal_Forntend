<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 column">
      <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
        Child Safety Regulations
      </div>
      <q-separator class="q-mt-sm q-mx-lg" />
      <div class="q-flex-grow-1 column q-pa-md text-body1">
        <q-card flat class="q-mb-md q-pa-md">
          <q-card-section class="text-h6 text-secondary">
            <q-icon name="task_alt" color="green" />
            Maintenance
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            Maintaining and caring for shades and blinds is essential to ensure
            they remain functional and look their best for years to come.
            <span id="break">
              Here are some maintenance and care tips for shades and blinds
              window coverings.
            </span>
          </q-card-section>
        </q-card>
        <q-card flat class="q-mb-md q-pa-md">
          <q-card-section class="text-h6 text-secondary">
            <q-icon name="task_alt" color="green" />
            Replace blinds and window coverings that have long accessible cords.
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            Any type of long accessible cord, such as cords on the side, inside
            or back of the blind or window covering, is a strangulation risk for
            a child.
            <span id="break">
              The safest blinds and window coverings are ones without long
              accessible cords.
              <span id="break">
                Removing blinds and window coverings with long accessible cords,
                starting first with children's rooms and play spaces, is the
                best way to keep your child safe.
              </span>
            </span>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            Many affordable and easy-to-use blinds and window coverings, with no
            long accessible cords, are available for all sizes of windows at
            home and hardware stores across Canada.
          </q-card-section>
        </q-card>
        <q-card flat class="q-mb-md q-pa-md">
          <q-card-section class="text-h6 text-secondary">
            <q-icon name="task_alt" color="green" />
            Safety tips for long accessible cords on blinds and window
            coverings.
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            If you can't replace your blinds and window coverings that have long
            accessible cords, you can still take steps to reduce the risk. Until
            you can replace them, make sure to:
          </q-card-section>
        </q-card>
        <div class="q-pa-md">
          <q-carousel
            v-model="slide"
            transition-prev="jump-right"
            transition-next="jump-left"
            swipeable
            animated
            control-color="white"
            prev-icon="arrow_left"
            next-icon="arrow_right"
            navigation-icon="radio_button_unchecked"
            navigation
            padding
            arrows
            height="300px"
            class="bg-secondary text-white shadow-1 rounded-borders"
          >
            <q-carousel-slide name="tab0" class="column no-wrap flex-center">
              <q-icon name="escalator_warning" size="56px" />
              <div class="q-mt-md text-center">
                Always keep cords out of the reach of children.
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="tab1" class="column no-wrap flex-center">
              <q-icon name="menu_book" size="56px" />
              <div class="q-mt-md text-center">
                Follow the manufacturer's instructions and read all warnings.
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="tab2" class="column no-wrap flex-center">
              <q-icon name="crib" size="56px" />
              <div class="q-mt-md text-center">
                Never place cribs, beds, and playpens near a window where a
                child could reach a cord.
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="tab3" class="column no-wrap flex-center">
              <q-icon name="window" size="56px" />
              <div class="q-mt-md text-center">
                Do not place furniture that a child can climb near a window.
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="tab4" class="column no-wrap flex-center">
              <q-icon name="gesture" size="56px" />
              <div class="q-mt-md text-center">
                Securely attach tension devices supplied with blinds and window
                coverings to the wall so children can't place the cord around
                their neck.
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="tab5" class="column no-wrap flex-center">
              <q-icon name="roller_shades" size="56px" />
              <div class="q-mt-md text-center">
                Install a cleat or tie-down device up high on the wall and use
                it to keep cords out of reach.
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="tab6" class="column no-wrap flex-center">
              <q-icon name="supervisor_account" size="56px" />
              <div class="q-mt-md text-center">
                Never tie knots in cords. Immediately untie any knots that form
                accidentally. Remove any devices that form dangling loops,
                whether at the bottom, middle, or top of the cords.
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
        <div flat class="q-mb-md q-pa-md text-center">
          <q-card-section>
            For more information:
            <a
              href="https://www.canada.ca/en/health-canada/services/home-safety/blind-cord-safety.html
"
              target="_blank"
              >https://www.canada.ca/en/health-canada/services/home-safety/blind-cord-safety.html
            </a>
          </q-card-section>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { ref } from "vue";
@Component({
  name: "ChildSafetyRegulationPage",
  template: "default",
})
export class ChildSafetyRegulationPage extends Vue {
  slide = ref("tab0");
}
export default toNative(ChildSafetyRegulationPage);
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
