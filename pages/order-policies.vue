<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 column">
      <div class="text-center q-flex-grow-1 text-h3 q-pa-md text-secondary">
        Order Policies
      </div>
      <q-separator class="q-mt-sm q-mx-lg" />
      <div class="q-pa-md">
        <q-list class="rounded-borders">
          <q-expansion-item
            expand-separator
            icon="palette"
            label="Color"
            group="faq"
            header-class="text-bold text-secondary"
          >
            <q-card id="custom" flat>
              <q-card-section>
                <div class="q-mb-md">
                  While we strive for accurate online color representation,
                  actual colors may vary due to monitor differences. Our custom
                  products are non-returnable, so please consider potential
                  color variations from our samples. For precise color matches,
                  request a sample before ordering, noting minimal manufacturer
                  variations. To maintain consistency, order all blinds in one
                  color at once, as dye lots may differ slightly.
                </div>
                <div>
                  "Rear illumination" occurs when light passes through
                  translucent fabrics from behind, creating an effect that can
                  subtly change colors and accentuate fabric textures. Please be
                  aware that our swatches do not showcase this rear illumination
                  phenomenon. If you'd like to see how rear illumination can
                  influence the color or texture of a particular material, we
                  suggest visiting your nearest retailer or requesting a sample
                  from us.
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <QSeparator />
          <q-expansion-item
            expand-separator
            icon="design_services"
            label="Measurements"
            group="faq"
            header-class="text-bold text-secondary"
          >
            <q-card id="custom" flat>
              <q-card-section>
                <div class="q-mb-md">
                  When measuring window coverings, whether you opt for an inside
                  or outside mount, consider the following dimensions -
                </div>
                <div id="expand">
                  <q-tabs
                    v-model="tab"
                    dense
                    no-caps
                    inline-label
                    class="bg-secondary text-white"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                    mobile-arrows
                  >
                    <q-tab name="height" icon="height" label="Height" />
                    <q-tab name="width" icon="width_wide" label="Width" />
                    <q-tab
                      name="inside mount"
                      icon="blinds"
                      label="Inside Mount"
                    />
                    <q-tab
                      name="outside mount"
                      icon="blinds_closed"
                      label="Outside Mount"
                    />
                  </q-tabs>
                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="height">
                      <div class="text-h6">Height</div>
                      Measure from the top of the headrail to the bottom of the
                      bottom rail (or, for vertical blinds, to the bottom of the
                      vanes).
                    </q-tab-panel>

                    <q-tab-panel name="width">
                      <div class="text-h6">Width</div>
                      Measure from the left edge to the right edge of the window
                      treatment.
                    </q-tab-panel>

                    <q-tab-panel name="inside mount">
                      <div class="text-h6">Inside Mount</div>
                      This type fits inside the window frame. Factory deductions
                      for operating clearance are usually made, though they can
                      vary by manufacturer and product.
                    </q-tab-panel>

                    <q-tab-panel name="outside mount">
                      <div class="text-h6">Outside Mount</div>
                      For this option, the window treatment extends beyond the
                      window opening. Manufacturers do not include deductions,
                      so you must provide exact measurements, including any
                      additional width and height to accommodate trim or other
                      preferences.
                    </q-tab-panel>
                  </q-tab-panels>
                  <div class="q-mt-md">
                    For more details, please refer to our measuring guide.
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <QSeparator />
          <q-expansion-item
            expand-separator
            icon="policy"
            label="Changes, cancellations, and refunds"
            group="faq"
            header-class="text-bold text-secondary"
          >
            <q-card id="custom" flat>
              <q-card-section>
                <div class="q-mb-md">
                  Our products are custom-made to your precise specifications
                  and are not suitable for resale under normal circumstances.
                  Therefore, it's crucial to be confident in your choices before
                  finalizing your purchase. Here are some key points regarding
                  our cancellation and change policy:
                </div>
                <div id="expand">
                  <q-tabs
                    v-model="tab"
                    dense
                    no-caps
                    inline-label
                    class="bg-secondary text-white"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                    mobile-arrows
                  >
                    <q-tab
                      name="changes"
                      icon="published_with_changes"
                      label="Changes"
                    />
                    <q-tab
                      name="cancellations"
                      icon="cancel"
                      label="Cancellations"
                    />
                    <q-tab
                      name="refunds"
                      icon="currency_exchange"
                      label="Refunds"
                    />
                  </q-tabs>
                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="changes">
                      <div class="text-h6">Changes</div>
                      We allow changes to your order within a 24-hour window
                      after your online order is finalized. This is because
                      production typically begins shortly after your order is
                      placed. The changes must be emailed to us within 24-hour
                      period.
                    </q-tab-panel>

                    <q-tab-panel name="cancellations">
                      <div class="text-h6">Cancellations</div>
                      If you decide to cancel your order within the initial
                      24-hour period, we will provide a refund of your payment.
                    </q-tab-panel>

                    <q-tab-panel name="refunds">
                      <div class="text-h6">Refunds</div>
                      Once the 24-hour window has passed, we cannot offer
                      refunds or credits for credit card purchases in the event
                      of cancellation or changes.
                    </q-tab-panel>
                  </q-tab-panels>
                  <div class="q-mt-md">
                    Please carefully consider your choices and ensure your order
                    is accurate before finalizing your purchase.
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <QSeparator />
          <q-expansion-item
            expand-separator
            icon="local_shipping"
            label="Damaged or Lost Shipment"
            group="faq"
            header-class="text-bold text-secondary"
          >
            <q-card id="custom" flat>
              <q-card-section>
                <div class="q-mb-md">
                  In the case of damaged or lost shipments, it is important to
                  follow these procedures:
                </div>
                <div id="expand">
                  <q-tabs
                    v-model="tab"
                    dense
                    no-caps
                    inline-label
                    class="bg-secondary text-white"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                    mobile-arrows
                  >
                    <q-tab
                      name="reporting period"
                      icon="date_range"
                      label="Reporting Period"
                    />
                    <q-tab
                      name="documentation"
                      icon="description"
                      label="Documentation"
                    />
                    <q-tab
                      name="resolution"
                      icon="support_agent"
                      label="Resolution"
                    />
                  </q-tabs>
                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="reporting period">
                      <div class="text-h6">Reporting Period</div>
                      Any damaged or lost shipments must be reported to our
                      Customer Care Team within 7 business days from the date of
                      the tracking number indicating delivery. Failure to report
                      merchandise damage within 7 business days will result in
                      no free repair or replacement.
                    </q-tab-panel>

                    <q-tab-panel name="documentation">
                      <div class="text-h6">Documentation</div>
                      We may request documentation to support your claim of
                      defects or damage in the delivery. If you receive a
                      shipment that appears to be damaged, it is crucial to sign
                      for it as "damaged" upon delivery.
                    </q-tab-panel>

                    <q-tab-panel name="resolution">
                      <div class="text-h6">Resolution</div>
                      If a shipment is confirmed as damaged or lost, we will
                      replace the exact same product at no cost to you.
                    </q-tab-panel>
                  </q-tab-panels>
                  <div class="q-mt-md">
                    Please ensure that you promptly report any issues with your
                    shipment within the specified time frame to facilitate a
                    timely resolution.
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <QSeparator />
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Ref, toNative } from "vue-facing-decorator";
@Component({
  name: "WarrantyAndReturnsPage",
  template: "default",
})
export class WarrantyAndReturnsPage extends Vue {
  tab = Ref("height");
}
export default toNative(WarrantyAndReturnsPage);
</script>
<style scoped>
#custom {
  background-color: transparent;
}

@media (max-width: 768px) {
  #expand {
    max-width: 350px;
  }
}
</style>
