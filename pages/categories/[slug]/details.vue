<template>
  <q-page-container>
    <q-page class="q-pa-sm">
      <Loading :isLoading="isFetching"></Loading>
      <CartProductAdded
        :isLoading.sync="loadingToCart"
        :message.sync="loadingMessage"
      />
      <q-breadcrumbs active-color="secondary q-ml-lg text-subtitle2">
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el
          label="Shades, Blinds & Shutters"
          :to="`/categories/All_Products`"
        />
        <q-breadcrumbs-el
          :label="$route.params.slug.replace('_', ' ')"
          :to="`/categories/${$route.params.slug}`"
        />
        <q-breadcrumbs-el :label="productFabric.fabric_name" />
      </q-breadcrumbs>

      <div
        class="q-d-flex q-flex-grow-1 row wrap justify-center q-mt-md"
        :class="$q.platform.is.mobile ? 'q-pa-sm' : 'q-pa-md'"
      >
        <!-- Left Panel -->
        <div
          class="col-xl-4 col-lg-3 col-md-4 col-sm-12 col-xs-12 q-pa-sm q-d-flex q-flex-grow-1 column"
        >
          <div class="q-flex-grow-1">
            <div class="q-pa-none q-mt-sm q-flex-grow-1 column items-center">
              <q-carousel
                swipeable
                animated
                v-model="slide"
                thumbnails
                infinite
                class="height-prod-image"
              >
                <q-carousel-slide
                  v-for="(image, index) in productImages"
                  :name="index"
                  @click="fullscreenDialog = true"
                  class="q-pa-none"
                  :img-src="image.large_image"
                >
                  <div class="row fit justify-center no-wrap">
                    <q-img
                      class="col-12 full-height"
                      :src="image.large_image"
                      fit="contain"
                    />
                  </div>
                </q-carousel-slide>
              </q-carousel>
              <div class="text-subtitle1 text-center text-italic">
                {{
                  selectedItem.color.color_name
                    ? selectedItem.color.color_name.replace("_", " ")
                    : ""
                }}
              </div>
            </div>
            <div class="q-pa-md text-h6">
              <div class="q-d-flex q-flex-1 row text-body1 q-px-sm q-mb-sm">
                <div class="col">Unit Price</div>
                <div class="col text-right">${{ measurementPrice }}</div>
              </div>
              <div
                class="q-d-flex q-flex-1 row text-body1 q-px-sm self-center q-mb-sm"
              >
                <div class="col q-pt-md">Quantity</div>
                <div class="col column items-end">
                  <q-input
                    class="text-body1"
                    square
                    outlined
                    v-model.number="selectedItem.quantity"
                    ref="quantityRef"
                    :rules="inputQuantity"
                    type="number"
                    dense
                    style="width: 30%"
                  />
                </div>
              </div>
              <div
                class="q-d-flex q-flex-1 row text-body1 q-px-sm self-center q-mb-sm text-weight-medium"
                v-if="addOnPrices || discount_price"
              >
                <div class="col">Subtotal</div>
                <div class="col text-right">${{ subtotal.toFixed(2) }}</div>
              </div>
              <div
                class="q-d-flex q-flex-1 row text-body1 q-px-sm self-center q-mb-md"
                v-if="addOnPrices"
              >
                <div class="col">Add-on x {{ selectedItem.quantity }}</div>
                <div class="col text-right">${{ addOnTotal.toFixed(2) }}</div>
              </div>

              <div
                class="q-d-flex q-flex-1 row text-body1 q-px-sm self-center q-mb-md text-red text-italic"
                v-if="discount_price"
              >
                <div class="col">Promotion - {{ discount }}% off</div>
                <div class="col text-right">
                  -${{ discount_price.toFixed(2) }}
                </div>
              </div>

              <!-- <div class="q-d-flex q-flex-1 row text-body1 q-px-sm q-mb-md">
                        <div class="col">Warranty (3-Year Limited Warranty) </div>
                        <div class="col text-right">FREE</div>
                    </div> -->
              <q-separator />
              <!-- <div class="q-d-flex q-flex-1 row text-body1 q-px-sm q-mb-md q-mt-md">
                        <div class="col">Subtotal </div>
                        <div class="col text-right text-bold">$ {{ subtotal }}</div>
                    </div> -->
              <!-- <div class="q-d-flex q-flex-1 row text-h6 q-px-sm q-mb-md text-red">
                        <div class="col">Promotion </div>
                        <div class="col text-right">$</div>
                    </div> -->
              <div
                class="q-d-flex q-flex-1 row text-body1 text-bold q-px-sm q-mb-md text-secondary q-mt-sm"
              >
                <div class="col">Total Sale Price</div>
                <div class="col text-right">${{ final_total }}</div>
              </div>
              <div class="q-d-flex q-flex-1 row text-h6 q-px-sm q-mb-md">
                <div
                  class="col-xs-12 col-md-6 q-mt-sm"
                  v-if="$q.platform.is.desktop"
                >
                  <q-btn
                    class="full-width text-black"
                    square
                    unelevated
                    color="primary"
                    icon="add_shopping_cart"
                    :loading="loadingToCart"
                    :size="$q.platform.is.desktop ? 'md' : 'sm'"
                    :padding="$q.platform.is.desktop ? 'md' : 'sm'"
                    label="Add to cart"
                    @click.prevent="addToCart"
                  >
                    <template v-slot:loading>
                      <q-spinner-hourglass class="on-left" />
                      Adding to cart
                    </template>
                  </q-btn>
                </div>
                <q-page-sticky
                  position="bottom-right"
                  :offset="[18, 18]"
                  style="z-index: 1"
                  v-else
                >
                  <q-btn
                    unelevated
                    color="secondary"
                    icon="add_shopping_cart"
                    :loading="loadingToCart"
                    label="Add to cart"
                    padding="md"
                    @click.prevent="addToCart"
                  >
                    <template v-slot:loading>
                      <q-spinner-hourglass class="on-left" />
                      Adding to cart
                    </template>
                  </q-btn>
                </q-page-sticky>
                <div
                  class="col-xs-12 col-md-6 q-mt-sm"
                  :class="{ 'q-pl-sm': $q.platform.is.desktop }"
                >
                  <q-btn
                    @click.prevent="addProductToWishlist(Number(fabricId))"
                    class="full-width"
                    square
                    outline
                    color="black"
                    :icon="
                      isInWishlist(Number(fabricId))
                        ? 'bookmark_added'
                        : 'bookmark_add'
                    "
                    :size="$q.platform.is.desktop ? 'md' : 'sm'"
                    :padding="$q.platform.is.desktop ? 'md' : 'sm'"
                    :label="isInWishlist(Number(fabricId)) ? 'Saved' : 'Save'"
                    :disable="isInWishlist(Number(fabricId))"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Right Panel -->
        <div
          class="col-xl-8 col-lg-9 col-md-8 q-pa-sm"
          :class="{ 'desktop-right-absolute': $q.platform.is.desktop }"
        >
          <div v-if="$q.platform.is.mobile">
            <q-separator class="q-mb-md" />
          </div>

          <div
            class="q-d-flex q-flex-grow-1 column q-ma-none q-pa-sm"
            :class="{ 'q-ml-xl': $q.platform.is.desktop }"
            v-if="productFabric && productFabric.product"
          >
            <div class="text-h4">{{ productFabric.fabric_name }}</div>
            <div class="text-h6 q-mt-sm">{{ productFabric.product.name }}</div>
            <div class="text-subtitle1 q-mt-lg">
              {{ productFabric.product.short_description }}
            </div>
            <div class="q-mt-xl">
              <div class="text-h6">Color and Fabrics</div>
              <q-separator class="q-mt-md" />
              <div
                v-for="(value, key) in productColors"
                :key="`color-${key}`"
                class="q-pa-sm"
              >
                {{ key ? key.toString().toUpperCase() : "" }}
                <div class="q-d-flex row">
                  <div
                    v-for="(color_option, index) in value"
                    :key="`${color_option.name}-${index}`"
                  >
                    <div style="width: 65px" class="q-mr-md">
                      <q-img
                        class="q-ma-sm"
                        v-if="color_option.fabric_image"
                        :style="buttonStyle(color_option)"
                        :src="color_option.fabric_image?.large_image"
                        fit="fill"
                        @click="selectColor(color_option)"
                        height="64px"
                        ratio="1"
                        width="64px"
                      >
                        <q-tooltip
                          class="bg-primary text-black text-body2"
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                        >
                          {{ color_option.color_name }}
                        </q-tooltip>
                      </q-img>
                      <div class="q-px-sm text-break">
                        {{
                          color_option.color_name
                            ? color_option.color_name.replace("_", " ")
                            : ""
                        }}
                      </div>
                    </div>

                    <!-- <q-btn v-for="(color_option, index) in value" :key="`${color_option.name}-${index}`" flat
                                    round :style="buttonStyle(color_option)" class="q-mx-sm q-my-sm"
                                    @click="selectColor(color_option)">
                                    <q-tooltip class="bg-primary text-black text-body2" anchor="top middle"
                                        self="bottom middle" :offset="[10, 10]">
                                        {{ color_option.color_name }}
                                    </q-tooltip>
                                </q-btn> -->
                  </div>
                </div>
              </div>
            </div>

            <div class="text-h6 q-mt-xl">Size Selection</div>
            <q-separator class="q-mt-md" />
            <div class="q-mt-md row q-col-gutter-x-xl q-pa-md">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <label class="text-subtitle2">Width</label>
                <div class="row">
                  <q-input
                    class="text-body1 col"
                    square
                    outlined
                    v-model="selectedItem.width_inch"
                    ref="widthRef"
                    suffix="in"
                    type="number"
                    @change="
                      updateQueryParams('width', selectedItem.width_inch)
                    "
                    :rules="inputRulesWidth"
                  />
                  <q-select
                    class="col q-ml-sm text-body1"
                    square
                    outlined
                    v-model="selectedItem.width_fraction"
                    color="black"
                    :options="inchOptions"
                  />
                </div>
              </div>

              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <label class="text-subtitle2">Height</label>
                <div class="row">
                  <q-input
                    class="text-body1 col"
                    square
                    outlined
                    v-model="selectedItem.height_inch"
                    ref="heightRef"
                    suffix="in"
                    type="number"
                    @change="
                      updateQueryParams('height', selectedItem.height_inch)
                    "
                    :rules="inputRulesHeight"
                  />
                  <q-select
                    class="col q-ml-sm text-body1"
                    square
                    outlined
                    v-model="selectedItem.height_fraction"
                    color="black"
                    :options="inchOptions"
                  />
                </div>
              </div>
            </div>
            <div
              class="q-mt-sm column q-pa-sm"
              v-for="(group, attributeName) in productGroups"
              v-if="productGroups"
              :key="attributeName"
            >
              <div class="text-h6 q-mt-md">
                {{ attributeName }}
                <q-btn
                  outline
                  round
                  icon="info"
                  size="sm"
                  dense
                  color="grey"
                  v-if="group.helpText"
                >
                  <q-tooltip
                    anchor="center right"
                    self="center left"
                    :offset="[10, 10]"
                    class="text-body2"
                  >
                    {{ group.helpText }}
                  </q-tooltip>
                </q-btn>
              </div>
              <q-separator class="q-mt-md" />
              <div
                class="row"
                :class="{ 'justify-center': $q.platform.is.mobile }"
              >
                <q-card
                  v-for="(dynamicAttribute, dynamicIndex) in group.items"
                  :key="`dynamic-${dynamicIndex}`"
                  flat
                  :class="{
                    'q-card-selected':
                      selectedItem.attributes_selected[group.id]['selected'] ===
                      dynamicAttribute,
                    'no-pointer': dynamicAttributeDisabled[dynamicAttribute.id],
                  }"
                  bordered
                  class="q-ma-sm attribute-card"
                  @click="selectDynamicAttribute(group.id, dynamicAttribute)"
                >
                  <q-card-section class="q-pa-none">
                    <q-img
                      :src="dynamicAttribute.image?.large_image ?? undefined"
                      height="180px"
                    ></q-img>
                  </q-card-section>
                  <q-card-section class="q-pa-sm q-d-flex flex-grow-1 row">
                    <div class="text-body1 col-8">
                      {{ dynamicAttribute.value }}
                    </div>
                    <div
                      class="text-body1 text-bold text-center col-4 text-secondary"
                    >
                      <span
                        v-if="
                          dynamicAttribute.price &&
                          parseFloat(dynamicAttribute.price) > 0
                        "
                      >
                        ${{ dynamicAttribute.price }}
                      </span>
                    </div>
                    <div
                      class="col-12"
                      v-if="
                        dynamicAttribute.help_text &&
                        !dynamicAttributeDisabled[dynamicAttribute.id]
                      "
                    >
                      <q-btn
                        outline
                        icon="info"
                        size="sm"
                        dense
                        color="light-blue-9"
                      >
                        Info
                        <q-tooltip
                          anchor="center right"
                          self="center left"
                          :offset="[10, 10]"
                          class="text-body2"
                        >
                          {{ dynamicAttribute.help_text }}
                        </q-tooltip>
                      </q-btn>
                    </div>
                    <div
                      class="col-12"
                      v-if="
                        dynamicAttribute.position_required &&
                        selectedItem.attributes_selected[group.id]['selected'][
                          'id'
                        ] === dynamicAttribute.id
                      "
                    >
                      <q-select
                        class="q-my-sm"
                        outlined
                        v-model="
                          selectedItem.attributes_selected[group.id][
                            'selected'
                          ]['position']
                        "
                        :options="positions"
                        option-value="id"
                        dense
                        color="secondary"
                        option-label="name"
                        label="Position"
                        emit-value
                        map-options
                      />
                    </div>
                    <div v-if="dynamicAttribute.sub_items">
                      <div
                        v-for="subItem in dynamicAttribute.sub_items"
                        :key="`sub-${subItem.id}`"
                      >
                        <q-radio
                          v-if="!dynamicAttributeSubItemsDisabled[subItem.id]"
                          v-model="subItems[dynamicAttribute.id]"
                          :class="{
                            'no-pointer1':
                              selectedItem.attributes_selected[group.id][
                                'selected'
                              ] !== dynamicAttribute,
                          }"
                          @click="
                            updatedSelectedSubItem(
                              dynamicAttribute.id,
                              subItem.id
                            )
                          "
                          :disable="
                            dynamicAttributeSubItemsDisabled[subItem.id]
                          "
                          :val="subItem.id"
                          color="secondary"
                          checked-icon="task_alt"
                          unchecked-icon="panorama_fish_eye"
                          >{{ subItem.name }}
                          <span v-if="subItem.price"
                            >(+${{ subItem.price }})</span
                          ></q-radio
                        >
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    <div
                      class="col-12 unavailable-card"
                      v-if="
                        dynamicAttribute.help_text &&
                        dynamicAttributeDisabled[dynamicAttribute.id]
                      "
                    >
                      <q-icon name="warning" size="sm" />
                      Unavailable<br />
                      {{ dynamicAttribute.help_text }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <q-card style="width: 300px" v-else flat>
              <q-skeleton height="200px" square />
              <q-item>
                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="text" />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <!-- Bottom sections -->
          <div class="q-d-flex q-flex-grow-1 row wrap justify-center q-pa-md">
            <div class="col-xs-12 col-sm-12 col-xl-12 col-md-12">
              <q-list>
                <q-expansion-item
                  class="text-subtitle1 text-weight-medium"
                  expand-separator
                  v-if="productFabric"
                  label="Product Information"
                >
                  <q-card flat>
                    <q-card-section class="text-body1">
                      <div>{{ productFabric.product?.long_description }}</div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  class="text-subtitle1 text-weight-medium q-mt-md"
                  expand-separator
                  label="Motorization"
                >
                  <q-card flat>
                    <q-card-section class="text-body1">
                      <div>
                        <p>
                          Motorized blinds, also known as motorized shades or
                          motorized window treatments, are window coverings that
                          can be operated and controlled using an electric motor
                          or a motorized system.
                        </p>
                        <p>
                          Unlike traditional blinds that are manually adjusted
                          using cords or wands, motorized blinds offer the
                          convenience of remote control or automation.
                        </p>
                        <p>
                          These blinds are typically equipped with a motorized
                          mechanism that allows them to be raised, lowered, or
                          tilted at the touch of a button on a remote control or
                          through a smartphone app. Some advanced systems also
                          offer integration with smart home platforms like
                          Amazon Alexa, Google Assistant, or Apple HomeKit,
                          enabling users to control their motorized blinds
                          through voice commands or automated schedules.
                        </p>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <!-- <q-expansion-item
                class="text-subtitle1 text-weight-medium q-mt-md"
                expand-separator
                label="Reviews"
              >
                <q-card flat>
                  <q-card-section class="text-body1">
                    <div>TODO</div>
                  </q-card-section>
                </q-card>
              </q-expansion-item> -->
                <q-expansion-item
                  class="text-subtitle1 text-weight-medium q-mt-md"
                  expand-separator
                  label="Shipping & Production"
                >
                  <q-card flat>
                    <q-card-section class="text-body1">
                      <div>
                        <div class="q-mt-lg text-h6">Free shipping</div>
                        <div class="q-mt-lg text-body1">
                          You can set your mind at ease regarding shipping
                          costs; we will take care of them for you. Our goal is
                          to provide hassle-free logistics, and we'll make sure
                          your blinds and shades are delivered right to your
                          front door.
                        </div>
                        <div class="q-mt-sm">
                          <p class="q-pa-sm">
                            <span class="para-start">Changes: </span> We allow
                            changes to your order within a 24-hour window after
                            your online order is finalized. This is because
                            production typically begins shortly after your order
                            is placed. The changes must be emailed to us within
                            24-hour period.
                          </p>
                        </div>
                        <div class="q-mt-sm">
                          <p class="q-pa-sm">
                            <span class="para-start">Cancellations: </span> If
                            you decide to cancel your order within the initial
                            24-hour period, we will provide a refund of your
                            payment.
                          </p>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  class="text-subtitle1 text-weight-medium q-mt-md"
                  expand-separator
                  label="Measure & Install Guide"
                >
                  <q-card flat>
                    <q-card-section class="text-body1">
                      <div class="q-flex-grow-1">
                        <p>
                          Measuring accurately is crucial when it comes to
                          installing blinds or shades.
                        </p>
                        <p>
                          You can find more details measuring and installation
                          in following links
                        </p>
                        <ul class="q-px-lg">
                          <li>
                            <nuxt-link to="/customize/measuring-tips"
                              >Measuring Tips</nuxt-link
                            >
                          </li>
                          <li>
                            <nuxt-link to="/customize/installation-guides"
                              >Installation Guidelines</nuxt-link
                            >
                          </li>
                        </ul>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </div>
          </div>
        </div>
      </div>

      <q-dialog v-model="missingOptionsDialog">
        <q-card :style="$q.platform.is.mobile ? 'width: 90%' : 'width: 70%'">
          <q-card-section>
            <div class="text-h6">The following product options required</div>
          </q-card-section>
          <q-card-section class="q-px-md q-py-sm">
            <div class="text-body1">
              <ul class="q-my-none">
                <li
                  v-for="(item, index) in optionsNotSelected"
                  :key="`item-${index}`"
                  class="text-secondary"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Ok" @click="missingOptionsDialog = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="fullscreenDialog" maximized>
        <div :class="{ 'full-screen': $q.platform.is.desktop }">
          <q-carousel
            swipeable
            animated
            ref="carousel"
            infinite
            v-model="slide"
            :class="{ 'full-height': $q.platform.is.desktop }"
          >
            <q-carousel-slide
              v-for="(image, index) in productImages"
              :name="index"
              ratio="1"
              class="q-pa-none"
            >
              <div class="row fit justify-start no-wrap">
                <q-img
                  class="col-12 full-height"
                  :src="image.large_image"
                  ratio="1"
                  fit="fill"
                />
              </div>
            </q-carousel-slide>

            <template v-slot:control>
              <q-carousel-control
                position="top-right"
                :offset="[18, 18]"
                class="text-white rounded-borders"
                style="background: rgba(0, 0, 0, 0.3); padding: 4px 8px"
              >
                <q-btn
                  outline
                  round
                  color="primary"
                  icon="close"
                  @click="fullscreenDialog = false"
                />
              </q-carousel-control>

              <q-carousel-control
                position="bottom-right"
                :offset="[18, 18]"
                class="q-gutter-xs"
              >
                <q-btn
                  push
                  round
                  dense
                  color="orange"
                  text-color="black"
                  icon="arrow_left"
                  @click="$refs.carousel.previous()"
                />
                <q-btn
                  push
                  round
                  dense
                  color="orange"
                  text-color="black"
                  icon="arrow_right"
                  @click="$refs.carousel.next()"
                />
              </q-carousel-control>
            </template>
          </q-carousel>
        </div>
      </q-dialog>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import {
  ColorOption,
  DynamicAttributeValue,
  PublicService,
  UploadedImages,
  ProductPricing,
  DynamicAttributesPublic,
  CartItem,
  PublicProductFabricsDetails,
  PublicColorOption,
  SelectedSubItem,
  DynamicAttributeValueSubItems,
} from "@/openapi";
import { Component, Vue, Watch, Setup, toNative } from "vue-facing-decorator";
import { addToCart, initializeCart, totalCartQuantity } from "@/store/cart";
import { addToWishlist, state, initializeWishList } from "@/store/wishlist";
import Loading from "@/components/public/Loading.vue";
import CartProductAdded from "@/components/common/CartProductAdded.vue";
@Component({
  name: "PublicProductDetailsPage",
  template: "default",
  components: {
    Loading,
    CartProductAdded,
  },
})
export class PublicProductDetailsPage extends Vue {
  categorySelected = [];
  slide = 0;
  fullscreenDialog = false;
  productFabric: PublicProductFabricsDetails = <PublicProductFabricsDetails>{};

  positions = [
    { id: 1, name: "Left" },
    { id: 2, name: "Right" },
  ];
  heightList: number[] = [];
  widthList: number[] = [];
  measurementPrice = 0;
  discount = 0;
  addOnPrices = 0;
  fabricId: string = "";
  expanded = 1;
  isFetching = false;
  loadingToCart = false;
  loadingMessage = "Adding to cart...";
  inchOptions = ["0", "1/8", "1/4", "3/8", "1/2", "5/8", "3/4", "7/8"];
  showMessage = false;
  dynamicAttributeDisabled: any = {};
  dynamicAttributeSubItemsDisabled: any = {};
  subItems: any = {};
  cartAdded = false;
  selectedItem: CartItem = <CartItem>{
    quantity: 1,
    height_inch: 36,
    width_inch: 24,
    color: <ColorOption>{},
    attributes_selected: {},
    attribute_values: [],
    product_id: null,
    product_variant: null,
    price: "",
    refer_url: "",
    fabric_id: undefined,
    height_fraction: "0",
    width_fraction: "0",
    sub_items: Array<SelectedSubItem>(),
  };
  productGroups: any = [];
  isSticky = false;
  wishlistItems: any = [];
  missingOptionsDialog = false;

  // @ts-ignore
  @Setup((props, ctx) =>
    useHead({
      title: "Janal | Product Details",
    })
  )
  // @ts-ignore
  pageHead!: useHead;

  isInWishlist(productId: any) {
    return this.wishlistItems.includes(productId);
  }

  mounted() {
    if ((this as any).$route.query.fabricId) {
      this.fabricId = (this as any).$route.query.fabricId;
      this.getProductDetails();
    } else {
      (this as any).$router.go("/cart");
    }
    initializeCart();
    window.addEventListener("scroll", this.handleScroll);
    initializeWishList();
    this.wishlistItems = state.wishlistItems;
  }
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  inRange(subItem: DynamicAttributeValueSubItems) {
    if (
      !subItem.max_height ||
      !subItem.min_height ||
      !subItem.max_width ||
      !subItem.min_width
    ) {
      return true;
    }
    if (
      this.selectedItem &&
      this.selectedItem.height_inch &&
      this.selectedItem.width_inch
    ) {
      return (
        this.selectedItem.height_inch >= subItem.min_height &&
        this.selectedItem.height_inch <= subItem.max_height &&
        this.selectedItem.width_inch >= subItem.min_width &&
        this.selectedItem.width_inch <= subItem.max_width
      );
    }
  }

  handleScroll() {
    // Calculate the scroll position
    const scrollY = window.scrollY || window.pageYOffset;

    // Define a threshold for when to make the button sticky
    const threshold = 700;

    this.isSticky = scrollY > threshold;
  }

  getDynamicAttributeValue(dynamicAttributeId: number) {
    const subItem = this.selectedItem.sub_items?.find(
      (item) => item.dynamic_attribute_value === dynamicAttributeId
    );
    return subItem ? subItem.dynamic_attribute_value : null;
  }

  @Watch("$route")
  measurementChange() {
    if (
      this.selectedItem &&
      this.selectedItem.height_inch &&
      this.selectedItem.width_inch &&
      this.selectedItem.color.id &&
      this.productFabric.id
    ) {
      const subItemIds = this.selectedItem.sub_items?.map(
        (obj: SelectedSubItem) => obj.sub_item
      );
      PublicService.publicFabricGetPrice(
        this.productFabric.id,
        undefined,
        undefined,
        this.selectedItem.color.id,
        this.selectedItem.height_inch,
        this.selectedItem.width_inch,
        this.selectedItem.attribute_values,
        subItemIds
      ).then((res: ProductPricing) => {
        if (res && res.price) {
          this.measurementPrice = parseFloat(res.price);
          this.discount = res.discount ? res.discount : 0;
          this.addOnPrices = res.add_on_prices ? res.add_on_prices : 0;
        } else {
          this.measurementPrice = 0;
        }
      });
    }
  }

  getProductDetails() {
    this.isFetching = true;
    if (this.fabricId) {
      PublicService.publicProductsFabricsRead(parseInt(this.fabricId))
        .then((res: PublicProductFabricsDetails) => {
          this.productFabric = res;
          this.selectedItem.product = res.product?.id;
          this.selectedItem.fabric_id = this.fabricId;
          this.createProductGroups();
          this.updateQueryParams(
            {
              height: this.selectedItem.height_inch,
              width: this.selectedItem.width_inch,
              quantity: this.selectedItem.quantity,
            },
            undefined
          );
          this.readFromQuery();
          this.measurementChange();
          this.disableSelection();
        })
        .finally(() => {
          this.isFetching = false;
        });
    }
  }

  updateQueryParams(paramName: any, paramValue: any) {
    const queries = { ...this.$route.query };
    if (paramName && typeof paramName === "object") {
      for (const [key, value] of Object.entries(paramName)) {
        if (!queries.hasOwnProperty(key)) {
          // @ts-ignore
          queries[key] = value;
        }
      }
    } else if (paramValue === null || paramValue === undefined) {
      // Remove the query parameter if paramValue is null or undefined
      delete queries[paramName];
    } else {
      queries[paramName] = paramValue;
    }

    if (queries) {
      // @ts-ignore
      const updatedParams = new URLSearchParams(queries).toString();
      this.$router.push(`?${updatedParams}`);
    }
  }

  /**
   * Reads query parameters from the current route and updates the corresponding properties of the selectedItem object.
   *
   * @return {void}
   */
  readFromQuery() {
    if (
      this.$route.query.height &&
      typeof this.$route.query.height == "string"
    ) {
      this.selectedItem.height_inch = parseInt(this.$route.query.height);
    }
    if (this.$route.query.width && typeof this.$route.query.width == "string") {
      this.selectedItem.width_inch = parseInt(this.$route.query.width);
    }
    if (
      this.$route.query.colorId &&
      typeof this.$route.query.colorId == "string"
    ) {
      const color = this.getColorFromId(parseInt(this.$route.query.colorId));
      if (color) {
        // @ts-ignore
        this.selectedItem.color = color;
      }
    }

    if (
      this.$route.query.quantity &&
      typeof this.$route.query.quantity == "string"
    ) {
      this.selectedItem.quantity = parseInt(this.$route.query.quantity);
    }
  }
  removeSubDynamicSubItem(dynamicId: number, subId: number | null = null) {
    // remove subitems for the removing dynamic ID

    if (this.selectedItem.sub_items) {
      let index = -1;
      if (subId && dynamicId) {
        index = this.selectedItem.sub_items.findIndex(
          (obj: SelectedSubItem) => {
            return (
              obj.dynamic_attribute_value == dynamicId && obj.sub_item == subId
            );
          }
        );
      } else {
        index = this.selectedItem.sub_items.findIndex(
          (obj: SelectedSubItem) => {
            return obj.dynamic_attribute_value == dynamicId;
          }
        );
      }

      if (index != -1) {
        this.selectedItem.sub_items.splice(index, 1);
        this.updateQueryParams(`subItem${dynamicId}`, null);
      }
      if (this.subItems[dynamicId] && index != -1) {
        delete this.subItems[dynamicId];
      }
    }
  }
  autoSelectSubItem(dynamicId: number) {
    if (
      !this.productFabric.dynamic_attribute_values ||
      !this.productFabric.dynamic_attribute_values.length
    )
      return;
    const index = this.productFabric.dynamic_attribute_values.findIndex(
      (obj: DynamicAttributesPublic) => {
        return obj.id == dynamicId;
      }
    );
    if (index != -1) {
      // TODO
    }
  }
  updateSelectedOptions(dynamicId: number, existingId: number) {
    if (!this.selectedItem.attribute_values) {
      this.selectedItem.attribute_values = [];
    }
    const existingIndex =
      this.selectedItem.attribute_values.indexOf(existingId);
    if (existingIndex != -1) {
      this.selectedItem.attribute_values.splice(existingIndex, 1, dynamicId);
      // remove subitems for the removing dynamic ID
      this.removeSubDynamicSubItem(existingId);
    } else {
      this.selectedItem.attribute_values.push(dynamicId);
    }
  }

  get subtotal() {
    return this.selectedItem.quantity * this.measurementPrice;
  }
  get addOnTotal() {
    return this.addOnPrices * this.selectedItem.quantity;
  }
  get final_total() {
    const total_sales = this.subtotal + this.addOnTotal;
    return (total_sales - this.discount_price).toFixed(2);
  }

  //Add items to cart
  addToCart() {
    this.missingOptionsDialog = false;
    (this as any).$refs.widthRef.validate();
    (this as any).$refs.heightRef.validate();
    (this as any).$refs.quantityRef.validate();

    if (!this.selectedItem.height_inch || !this.selectedItem.width_inch) {
      this.$q.notify({
        message: "Don't forget to provide the measurements",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
      return;
    }
    if (!this.validateAttributes) {
      this.missingOptionsDialog = true;
      return;
    }

    if (
      (this as any).$refs.widthRef.hasError ||
      (this as any).$refs.heightRef.hasError
    ) {
      this.$q.notify({
        message:
          "Invalid Measurements! Please verify the measurements before adding the product",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
      return;
    }

    if ((this as any).$refs.quantityRef.hasError) {
      this.$q.notify({
        message: "Quantity should be less than 100 units per item",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
      return;
    }
    this.loadingToCart = true;
    this.loadingMessage = "Adding to cart...";
    this.selectedItem.refer_url = window.location.pathname;
    this.selectedItem.price = this.measurementPrice.toString();
    // this.selectedItem.discount = this.discount;
    this.selectedItem.discount_amount = this.discount;
    this.selectedItem.add_on_prices = this.addOnPrices;

    setTimeout(() => {
      this.loadingMessage = "Added to cart!";
      addToCart(this.selectedItem);
      this.loadingToCart = false;
      this.selectedItem.quantity = 1;
      totalCartQuantity();
    }, 1000);
    //
  }
  selectDynamicAttribute(
    attributeId: number,
    dynamicAttribute: DynamicAttributeValue
  ) {
    if (dynamicAttribute.id) {
      this.updateQueryParams(
        `productOption${attributeId}`,
        dynamicAttribute.id
      );
      let existingId = null;
      if (this.selectedItem.attributes_selected[attributeId]["selected"]) {
        existingId =
          this.selectedItem.attributes_selected[attributeId]["selected"]["id"];
      }
      this.selectedItem.attributes_selected[attributeId]["selected"] =
        dynamicAttribute;
      if (dynamicAttribute.position_required) {
        this.selectedItem.attributes_selected[attributeId]["selected"][
          "position"
        ] = 1;
      }
      this.updateSelectedOptions(dynamicAttribute.id, existingId);
    }
  }

  createProductGroups() {
    if (this.productFabric.dynamic_attribute_values) {
      const groupedData = this.productFabric.dynamic_attribute_values.reduce(
        (result: any, item: any) => {
          const attributeName = item.attribute.name;
          const attributeId = item.attribute.id;
          const attributeHelpText = item.attribute.help_text;
          if (!result[attributeName]) {
            result[attributeName] = {
              name: attributeName,
              id: attributeId,
              helpText: attributeHelpText,
              items: [],
            };
            this.selectedItem.attributes_selected[attributeId] = {
              name: attributeName,
              id: attributeId,
              selected: {},
            };
          }
          this.dynamicAttributeDisabled[item.id] = false;
          if (item.sub_items) {
            for (const subItemAttribute of item.sub_items) {
              this.dynamicAttributeSubItemsDisabled[subItemAttribute.id] =
                false;
            }
          }
          result[attributeName]["items"].push(item);
          return result;
        },
        {}
      );
      this.productGroups = groupedData;
      this.mapSelectionFromUrl();
    }
    this.selectedItem.product = this.productFabric.product?.id;
  }

  findDynamicValue(dynamicValueId: any) {
    if (this.productFabric && this.productFabric.dynamic_attribute_values) {
      return this.productFabric.dynamic_attribute_values.find(
        (obj: DynamicAttributesPublic) => obj.id == dynamicValueId
      );
    }
  }

  subItemsInQuery(
    dynamicValueID: number,
    subItems: Array<DynamicAttributeValueSubItems>
  ) {
    const dynamicSubQuery = `subItem${dynamicValueID}`;
    if (
      this.$route.query[`${dynamicSubQuery}`] &&
      typeof this.$route.query[`${dynamicSubQuery}`] == "string"
    ) {
      // @ts-ignore
      const subItemID = parseInt(this.$route.query[`${dynamicSubQuery}`]);
      const subFound = subItems.find(
        (obj: DynamicAttributeValueSubItems) => obj.id == subItemID
      );
      if (subFound && subFound.id) {
        this.updatedSelectedSubItem(dynamicValueID, subFound.id, false);
        this.subItems[dynamicValueID] = subFound.id;
      }
    }
  }

  mapSelectionFromUrl() {
    if (this.productGroups) {
      for (const [key, value] of Object.entries(this.productGroups)) {
        // @ts-ignore
        if ("id" in value) {
          const id = value.id;
          const param = `productOption${id}`;

          if (this.$route.query[param]) {
            const dynamicValue = this.findDynamicValue(
              this.$route.query[param]
            );

            if (dynamicValue && dynamicValue.id) {
              // @ts-ignore
              this.selectedItem.attributes_selected[id]["selected"] =
                dynamicValue;
              this.selectedItem.attribute_values?.push(dynamicValue.id);

              if (dynamicValue.sub_items && dynamicValue.sub_items.length) {
                this.subItemsInQuery(dynamicValue.id, dynamicValue.sub_items);
              }
            }
          }
        }
      }
    }
  }
  get optionsNotSelected() {
    if (this.selectedItem.attributes_selected) {
      let notSelected = [];
      for (const key in this.selectedItem.attributes_selected) {
        if (
          this.selectedItem.attributes_selected.hasOwnProperty(key) &&
          Object.keys(this.selectedItem.attributes_selected[key]["selected"])
            .length == 0
        ) {
          notSelected.push(this.selectedItem.attributes_selected[key]["name"]);
        }
      }
      return notSelected;
    }
    return [];
  }

  get validateAttributes() {
    if (
      !this.selectedItem.attribute_values ||
      !this.selectedItem.attribute_values.length ||
      this.measurementPrice == 0
    ) {
      return false;
    }
    let validated = true;

    if (this.selectedItem.attributes_selected) {
      for (const key in this.selectedItem.attributes_selected) {
        if (
          this.selectedItem.attributes_selected.hasOwnProperty(key) &&
          Object.keys(this.selectedItem.attributes_selected[key]["selected"])
            .length == 0
        ) {
          validated = false;
          break;
        }
      }
    }
    return validated;
  }

  get productColors() {
    let productColors: any = [];
    if (
      this.productFabric.color_options &&
      this.productFabric.color_options.length
    ) {
      productColors = this.groupByKey(
        this.productFabric.color_options,
        "color_type"
      );
    }
    const keys = Object.keys(productColors);

    if (keys.length > 0 && !this.selectedItem.color.id) {
      let color = productColors[keys[0]].find((obj: any) => {
        return obj.images.length > 0;
      });
      this.selectColor(color);
    }
    return productColors;
  }

  groupByKey(array: any[], key: any) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }

  buttonStyle(color_option: ColorOption) {
    return `box-shadow: ${
      this.selectedItem.color.id === color_option.id
        ? "1px 1px 10px black; !important"
        : "none"
    }`;
  }

  selectColor(color_option: PublicColorOption) {
    this.selectedItem.color = color_option;
    this.measurementPrice = 0;
    this.updateQueryParams("colorId", color_option.id);
  }
  getColorFromId(colorId: number) {
    if (this.productFabric.color_options) {
      return this.productFabric.color_options.find(
        (obj: PublicColorOption) => obj.id === colorId
      );
    }
  }
  get productImages() {
    let productImages: Array<UploadedImages> = Array<UploadedImages>();

    if (
      this.selectedItem.color &&
      this.selectedItem.color.images &&
      this.selectedItem.color.images.length
    ) {
      productImages.push(...this.selectedItem.color.images);
    } else {
      if (this.productFabric.image) {
        productImages.push(this.productFabric.image);
      }
    }
    return productImages;
  }

  get maxAvailableWidth() {
    if (this.selectedItem.color) {
      return this.selectedItem.color.max_width;
    }
    return 100;
  }

  get maxAvailableHeight() {
    if (this.selectedItem.color) {
      return this.selectedItem.color.max_height;
    }
    return 100;
  }
  get inputRulesWidth() {
    // Set a maximum value
    const maxValue = this.maxAvailableWidth || 112; // Change this to your desired maximum value

    // Set a minimum value
    const minValue = 12; // Change this to your desired minimum value

    return [
      (v: any) => !!v || "Width required", // Required validation
      (v: any) => v >= minValue || `Minimum width is ${minValue}`, // Minimum value validation
      (v: any) => v <= maxValue || `Maximum width is ${maxValue}`, // Maximum value validation
    ];
  }
  get inputRulesHeight() {
    // Set a maximum value
    const maxValue = this.maxAvailableHeight || 200; // Change this to your desired maximum value

    // Set a minimum value
    const minValue = 24; // Change this to your desired minimum value

    return [
      (v: any) => !!v || "Height required", // Required validation
      (v: any) => v >= minValue || `Minimum height is ${minValue}`, // Minimum value validation
      (v: any) => v <= maxValue || `Maximum height is ${maxValue}`, // Maximum value validation
    ];
  }

  get inputQuantity() {
    // Set a maximum value
    const maxValue = 100; // Change this to your desired maximum value

    // Set a minimum value
    const minValue = 1; // Change this to your desired minimum value

    return [
      (v: any) => !!v || "Quantity required", // Required validation
      (v: any) => v >= minValue || `Minimum quantity is ${minValue}`, // Minimum value validation
      (v: any) => v <= maxValue || `Maximum quantity is ${maxValue}`, // Maximum value validation
    ];
  }

  addProductToWishlist(productId: number) {
    addToWishlist(productId);
    this.$q.notify({
      message: `Added to Wishlist`,
      color: "green",
      position: "top",
      classes: "text-body1",
    });
  }

  get discount_price() {
    if (!this.discount || !this.subtotal) {
      return 0;
    }
    return (this.discount / 100) * this.subtotal;
  }

  removeSelection(dynamicAttributeID: any, dynamicAttributeValue: any) {
    if (
      this.selectedItem.attributes_selected &&
      Object.hasOwn(
        this.selectedItem.attributes_selected,
        dynamicAttributeID
      ) &&
      this.selectedItem.attributes_selected.dynamicAttributeID
    ) {
      if (
        Object.hasOwn(
          this.selectedItem.attributes_selected.dynamicAttributeID,
          "selected"
        ) &&
        Object.hasOwn(
          this.selectedItem.attributes_selected.dynamicAttributeID.selected,
          "id"
        ) &&
        this.selectedItem.attributes_selected.dynamicAttributeID.selected.id ==
          dynamicAttributeValue
      ) {
        this.selectedItem.attributes_selected.dynamicAttributeID.selected =
          null;
      }
    }
  }
  disableSubitems(
    dynamicId: number,
    dynamicSub: Array<DynamicAttributeValueSubItems>,
    height: number,
    width: number
  ) {
    if (!dynamicSub) return;
    for (const item of dynamicSub) {
      if (item.min_height && item.max_height && item.id) {
        if (height < item.min_height || height > item.max_height) {
          this.dynamicAttributeSubItemsDisabled[item.id] = true;
          this.removeSubDynamicSubItem(dynamicId, item.id);
        } else {
          this.dynamicAttributeSubItemsDisabled[item.id] = false;
        }
      }
      if (item.min_width && item.max_width && item.id) {
        if (width < item.min_width || width > item.max_width) {
          this.dynamicAttributeSubItemsDisabled[item.id] = true;
          this.removeSubDynamicSubItem(dynamicId, item.id);
        } else {
          this.dynamicAttributeSubItemsDisabled[item.id] = false;
        }
      }
    }
  }

  @Watch("selectedItem.height_inch")
  @Watch("selectedItem.width_inch")
  disableSelection() {
    if (this.dynamicAttributeDisabled && this.productGroups) {
      for (const [groupKey, groupValue] of Object.entries(
        this.productGroups
      ) as [any, any][]) {
        const items = groupValue["items"] || [];

        for (const item of items) {
          const attributeValue = item;
          let isDisabled = false; // Combined flag for disabling

          // Check height-related conditions
          if (
            this.selectedItem.height_inch &&
            attributeValue.min_height != undefined &&
            attributeValue.max_height != undefined &&
            attributeValue.id
          ) {
            if (
              this.selectedItem.height_inch > attributeValue.max_height ||
              this.selectedItem.height_inch < attributeValue.min_height
            ) {
              isDisabled = true;
            }
          }

          // Check width-related conditions
          if (
            this.selectedItem.width_inch &&
            attributeValue.min_width != undefined &&
            attributeValue.max_width != undefined &&
            attributeValue.id
          ) {
            if (
              this.selectedItem.width_inch > attributeValue.max_width ||
              this.selectedItem.width_inch < attributeValue.min_width
            ) {
              isDisabled = true;
            }
          }

          // Update disabled status
          if (attributeValue.id) {
            this.dynamicAttributeDisabled[attributeValue.id] = isDisabled;

            // Remove from selection if disabled
            if (isDisabled) {
              this.removeSelection(groupValue["id"], attributeValue.id);
            }
          }

          // Check and process sub-items
          if (
            attributeValue.sub_items &&
            this.selectedItem.height_inch &&
            this.selectedItem.width_inch
          ) {
            this.disableSubitems(
              attributeValue.id,
              attributeValue.sub_items,
              this.selectedItem.height_inch,
              this.selectedItem.width_inch
            );
          }
        }
      }
    }
  }

  updatedSelectedSubItem(
    dynamicValueId: number,
    subItemId: number,
    updateQuery: boolean = true
  ) {
    const subItem: SelectedSubItem = <SelectedSubItem>{
      dynamic_attribute_value: dynamicValueId,
      sub_item: subItemId,
    };
    if (this.selectedItem.sub_items) {
      let dynamicValueFound = this.selectedItem.sub_items.find(
        (obj: SelectedSubItem) => {
          return obj.dynamic_attribute_value == subItem.dynamic_attribute_value;
        }
      );
      if (dynamicValueFound) {
        dynamicValueFound.sub_item = subItemId;
        if (updateQuery) {
          this.updateQueryParams(
            `subItem${subItem.dynamic_attribute_value}`,
            subItemId
          );
        }
      } else {
        this.selectedItem.sub_items.push(subItem);
        if (updateQuery) {
          this.updateQueryParams(
            `subItem${subItem.dynamic_attribute_value}`,
            subItemId
          );
        }
      }
    }
  }
}
export default toNative(PublicProductDetailsPage);
</script>

<style scoped>
.q-card-selected {
  background-color: #edce68;
  color: white;
  font-weight: bold !important;
}

.q-carousel__slide {
  background-size: contain;
  background-repeat: no-repeat;
}

.attribute-card {
  min-height: 240px;
  width: 240px;
}

@media (max-width: 1000px) and (min-width: 700px) {
  .inside_box {
    padding-right: calc(15px + (100vw - 700px) * (15 - 30) / (700 - 1000));
  }
}

/* @media (max-width: 3000px) and (min-width: 775px) {
  .height-prod-image {
    height: 600px;
    width: 600px;
  }
} */

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .height-prod-image {
    width: 90%;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .height-prod-image {
    height: 300px;
    width: 300px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .height-prod-image {
    height: 300px;
    width: 300px;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .height-prod-image {
    height: 300px;
    width: 300px;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .height-prod-image {
    height: 300px;
    width: 300px;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1441px) {
  .height-prod-image {
    height: 350px;
    width: 350px;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1920px) {
  .height-prod-image {
    height: 400px;
    width: 400px;
  }
}

.full-screen {
  height: 80vh;
  width: 80vh;
}

.para-start {
  font-style: italic;
  font-weight: 500;
}

.no-pointer {
  pointer-events: none;
  background: #ccc;
}

.no-pointer1 {
  pointer-events: none;
}

.unavailable-card {
  border: 1px solid #2e5f9a;
  padding: 3px;
  color: #2e5f9a;
  margin-top: 1px;
}
</style>
