<template>
  <q-page class="q-pa-sm">
    <div>
      <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
        Help Center
      </div>
      <div class="text-center q-flex-grow-1 text-h6 text-secondary">
        Frequently Asked Questions
      </div>
    </div>
    <div class="q-pa-md">
      <q-list class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="square_foot"
          label="How do I measure my windows for window coverings?"
          group="faq"
          header-class="text-bold text-secondary"
        >
          <q-card id="custom" flat>
            <q-card-section>
              To measure your windows accurately, follow our step-by-step guide
              on our
              <NuxtLink id="custom-link" to="/customize/measuring-tips"
                >"Measuring Guidelines”</NuxtLink
              >
              page. You'll find detailed instructions and helpful tips.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <QSeparator />

        <q-expansion-item
          expand-separator
          icon="grid_view"
          label="What types of window coverings do you offer?"
          group="faq"
          header-class="text-bold text-secondary"
        >
          <q-card id="custom" flat>
            <q-card-section>
              We offer a wide range of window coverings, including blinds,
              shades, curtains, and shutters. Each type has unique features and
              benefits. Explore our product catalog to learn more.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <QSeparator />

        <q-expansion-item
          expand-separator
          icon="tune"
          label="Can I get custom-made window coverings to fit my windows?"
          group="faq"
          header-class="text-bold text-secondary"
        >
          <q-card id="custom" flat>
            <q-card-section>
              All our products are custom-made window coverings for a perfect
              fit. Contact for customer support if you need more information.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <QSeparator />

        <q-expansion-item
          icon="build"
          label="How do I install my window coverings?"
          group="faq"
          header-class="text-bold text-secondary"
        >
          <q-card id="custom" flat>
            <q-card-section>
              Installation instructions can be found on our "Installation
              Guidelines" page. We provide detailed guidance for each type of
              window covering we offer. You can also check our video tutorials
              for visual assistance.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <QSeparator />

        <q-expansion-item
          icon="window"
          label="What should I do for window covering maintenance and cleaning?"
          group="faq"
          header-class="text-bold text-secondary"
        >
          <q-card id="custom" flat>
            <q-card-section>
              Keeping your window coverings clean is important for their
              longevity. Visit our
              <NuxtLink id="custom-link" to="/maintenance-care"
                >"Maintenance and Care"</NuxtLink
              >
              section for tips on cleaning and maintaining your window
              coverings.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <QSeparator />

        <q-expansion-item
          icon="child_care"
          label="Are your window coverings child-safe?"
          group="faq"
          header-class="text-bold text-secondary"
        >
          <q-card id="custom" flat>
            <q-card-section>
              Yes, we prioritize child safety. We offer child-safe options and
              products that meet safety standards. Explore our child-safe window
              covering options for more details.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <QSeparator />

        <q-expansion-item
          icon="energy_savings_leaf"
          label="How can window coverings improve energy efficiency in my home?"
          group="faq"
          header-class="text-bold text-secondary"
        >
          <q-card id="custom" flat>
            <q-card-section>
              Window coverings can help with insulation and energy efficiency.
              Learn more about the energy-saving benefits of our products under
              the product description.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <QSeparator />

        <q-expansion-item
          icon="blinds"
          label="Do you provide design inspiration for window coverings?"
          group="faq"
          header-class="text-bold text-secondary"
        >
          <q-card id="custom" flat>
            <q-card-section>
              Absolutely! Check out our “Shop by Room" section for ideas on how
              window coverings can enhance your home's interior design.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <QSeparator />

        <q-expansion-item
          icon="undo"
          label="What is your return policy?"
          group="faq"
          header-class="text-bold text-secondary"
        >
          <q-card id="custom" flat>
            <q-card-section>
              Our return policy is detailed in our
              <NuxtLink id="custom-link" to="/warranty-returns"
                >"Warranty and Returns"</NuxtLink
              >
              page. It explains the process for returns and exchanges, including
              eligibility and time frames.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <QSeparator />

        <q-expansion-item
          icon="support_agent"
          label="How can I contact your customer support team?"
          group="faq"
          header-class="text-bold text-secondary"
        >
          <q-card id="custom" flat>
            <q-card-section>
              You can reach our customer support team through phone, email, or
              live chat. Visit our
              <NuxtLink id="custom-link" to="/contact-us"
                >"Contact Us"</NuxtLink
              >
              page for contact details and operating hours.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <QSeparator />
      </q-list>

      <q-card id="custom-card" flat class="q-mt-sm">
        <q-card-section class="text-secondary">
          <div class="text-bold text-h6 text-secondary">
            Didn't find an answer to your question?
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          If you have any additional questions or concerns not addressed in our
          FAQs, please don't hesitate to reach out to our
          <NuxtLink id="custom-link" to="/contact-us">
            customer support
          </NuxtLink>
          team. We are here to assist you with all your window covering needs.
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
@Component({
  name: "HelpCenterPage",
  template: "default",
})
export class HelpCenterPage extends Vue {}
export default toNative(HelpCenterPage);
</script>

<style scoped>
#custom {
  background-color: transparent;
}

#custom-link {
  text-decoration: none;
}

#custom-card {
  border-bottom: 2px solid #2e5f9a;
}
</style>
