<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header reveal class="bg-grey-1 text-grey-8 q-py-xs" height-hint="30">
      <q-toolbar class="q-d-flex q-flex-grow-1 row text-grey-9 q-py-xs" shrink>
        <div class="q-pa-md">
          <q-img
            loading="eager"
            fetchpriority="high"
            no-spinner
            src="/logo.svg"
            :width="$q.platform.is.mobile ? '5rem' : '8rem'"
            @click.prevent="home()"
          ></q-img>
        </div>

        <!-- <q-avatar size="100px" class="q-mr-lg">
          <img src="/logo.svg">
        </q-avatar> -->

        <q-space />
        <div class="gt-sm">
          <!-- <q-btn flat label="Shades, Blinds & Shutters" to="/products/" /> -->
          <!-- {{ categoryStateItems }} -->
          <q-btn-dropdown flat label="Shades, Blinds & Shutters">
            <q-list style="text-secondary">
              <q-item
                v-for="(item, i) in categoryStateItems"
                :key="`nav-cat-${i}`"
                v-close-popup
                clickable
                :to="`/categories/${item.name.replace(' ', '_')}`"
              >
                <q-item-section>
                  <q-item-label>{{ item.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn flat label="Motorized blinds" to="/categories/All_Products" />
          <q-btn-dropdown flat label="Shop by Room">
            <q-list style="text-secondary">
              <q-item
                v-close-popup
                clickable
                to="/categories/All_Products?light_filtering=room-darken&light_filtering=light-filter"
              >
                <q-item-section>
                  <q-item-label>Living Room</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                v-close-popup
                clickable
                to="/categories/All_Products?light_filtering=room-darken&light_filtering=light-filter"
              >
                <q-item-section>
                  <q-item-label>Dining Room</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                v-close-popup
                clickable
                to="/categories/All_Products?light_filtering=light-filter"
              >
                <q-item-section>
                  <q-item-label>Kitchen</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-close-popup
                clickable
                to="/categories/All_Products?light_filtering=room-darken"
              >
                <q-item-section>
                  <q-item-label>Bedrooms</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-close-popup
                clickable
                to="/categories/All_Products?light_filtering=room-darken&light_filtering=light-filter"
              >
                <q-item-section>
                  <q-item-label>Kids Bedrooms</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-close-popup
                clickable
                to="/categories/All_Products?light_filtering=room-darken"
              >
                <q-item-section>
                  <q-item-label>Nursery</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-close-popup
                clickable
                to="/categories/All_Products?light_filtering=light-filter"
              >
                <q-item-section>
                  <q-item-label>Guestrooms</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn
            flat
            round
            size="lg"
            icon="local_shipping"
            to="/account/order-status"
          >
            <q-tooltip class="bg-secondary text-body2">Track Order</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            size="lg"
            icon="bookmarks"
            to="/categories/All_Products/wishlist/"
            outline
          >
            <q-tooltip class="bg-secondary text-body2">Wishlist</q-tooltip>
          </q-btn>
          <q-btn flat round size="lg" icon="shopping_cart" to="/cart/" outline>
            <q-badge
              v-if="cartCount > 0"
              floating
              rounded
              class="q-ma-sm text-black"
              color="primary"
              >{{ cartCount }}</q-badge
            >
            <q-tooltip class="bg-secondary text-body2">Cart</q-tooltip>
          </q-btn>
          <q-btn
            v-if="!isUserLoggedIn"
            flat
            round
            size="lg"
            icon="person"
            to="/account/login"
            outline
          >
            <q-tooltip class="bg-secondary text-body2">Login</q-tooltip>
          </q-btn>

          <q-avatar v-else color="primary" style="cursor: pointer">
            <span>{{ username }}</span>
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 120px">
                <q-item
                  v-if="!isCustomerHome"
                  v-close-popup
                  clickable
                  class="q-pb-sm"
                  to="/customer"
                >
                  <q-item-section class="text-body2">
                    My Profile</q-item-section
                  >
                </q-item>
                <q-separator />
                <q-item v-close-popup clickable @click="logout">
                  <q-item-section class="text-body2"> Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
        </div>
        <div class="lt-md">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          ></q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      side="right"
      bordered
      :width="200"
      :breakpoint="500"
      overlay
    >
      <q-scroll-area class="fit q-mt-lg">
        <q-list>
          <q-expansion-item
            expand-separator
            icon="bed"
            label="Shop by Room"
            style="text-secondary"
          >
            <q-card>
              <q-card-section>
                <q-list>
                  <q-item
                    v-for="(item, i) in categoryStateItems"
                    :key="`nav-cat-${i}`"
                    v-close-popup
                    clickable
                    :to="`/categories/${item.name.replace(' ', '_')}`"
                  >
                    <q-item-section>
                      <q-item-label>{{ item.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-item v-ripple clickable to="/categories/All_Products">
            <q-item-section avatar>
              <q-icon name="settings" color="secondary" />
            </q-item-section>
            <q-item-section> Motorized blinds </q-item-section>
          </q-item>

          <q-expansion-item
            expand-separator
            icon="bed"
            label="Shop by Room"
            style="text-secondary"
          >
            <q-card>
              <q-card-section>
                <q-list>
                  <q-item
                    v-ripple
                    clickable
                    to="/categories/All_Products?light_filtering=room-darken&light_filtering=light-filter"
                  >
                    <q-item-section> Living Room </q-item-section>
                  </q-item>
                  <q-item
                    v-ripple
                    clickable
                    to="/categories/All_Products?light_filtering=light-filter"
                  >
                    <q-item-section> Dining room </q-item-section>
                  </q-item>
                  <q-item
                    v-ripple
                    clickable
                    to="/categories/All_Products?light_filtering=light-filter"
                  >
                    <q-item-section> Kitchen </q-item-section>
                  </q-item>
                  <q-item
                    v-ripple
                    clickable
                    to="/categories/All_Products?light_filtering=room-darken"
                  >
                    <q-item-section> Bedrooms </q-item-section>
                  </q-item>
                  <q-item
                    v-ripple
                    clickable
                    to="/categories/All_Products?light_filtering=room-darken&light_filtering=light-filter"
                  >
                    <q-item-section> Kids bedrooms </q-item-section>
                  </q-item>
                  <q-item
                    v-ripple
                    clickable
                    to="/categories/All_Products?light_filtering=room-darken"
                  >
                    <q-item-section> Nursery </q-item-section>
                  </q-item>
                  <q-item
                    v-ripple
                    clickable
                    to="/categories/All_Products?light_filtering=light-filter"
                  >
                    <q-item-section> Guestrooms </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-item v-ripple clickable to="/categories/All_Products/wishlist/">
            <q-item-section avatar>
              <q-icon name="card_giftcard" />
            </q-item-section>
            <q-item-section>Wishlist </q-item-section>
          </q-item>
          <q-item v-ripple clickable to="/cart/">
            <q-item-section avatar>
              <q-icon name="shopping_cart" color="secondary" />
              <q-badge
                v-if="cartCount > 0"
                floating
                rounded
                class="q-ma-sm text-black"
                color="primary"
                >{{ cartCount }}</q-badge
              >
            </q-item-section>
            <q-item-section> Cart </q-item-section>
          </q-item>
          <q-item v-ripple clickable to="/account/login">
            <q-item-section avatar>
              <q-icon name="login" color="secondary" />
            </q-item-section>
            <q-item-section> Login </q-item-section>
          </q-item>
          <q-separator />
          <q-item v-ripple clickable to="/account/order-status">
            <q-item-section avatar>
              <q-icon name="local_shipping" />
            </q-item-section>
            <q-item-section> Track Order</q-item-section>
          </q-item>
          <q-separator />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="container">
      <!-- <q-banner class="bg-secondary text-white" v-if="$config.public.useProduction == 'false'">
        This website is currently in the testing phase as we work to improve your experience. Please excuse any
        inconsistencies or temporary content you may encounter during this process.
      </q-banner> -->
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { state as cartItems, totalCartQuantity } from "@/store/cart";
import { state as categoryItems, addAllCategories } from "@/store/products";
import { state as currentUser, setInitials } from "@/store/avatar";
export default {
  name: "admin",
  async setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const { status, data } = useAuthState();
    const { signOut } = useAuth();
    const categories = await useMyFetch(
      "/product_categories/?page=1&page_size=100"
    );

    if (data && data.value) {
      setInitials(data.value.name);
    }
    if (categories.data) {
      addAllCategories(categories.data);
    }
    async function logout() {
      currentUser.initials = null;
      await signOut({ callbackUrl: "/" });
    }
    return {
      leftDrawerOpen,
      search,
      categories,
      status,
      data,
      logout,
    };
  },
  computed: {
    cartCount() {
      return totalCartQuantity();
    },
    categoryStateItems() {
      if (categoryItems.categories && categoryItems.categories.results) {
        return categoryItems.categories.results;
      }
      return [];
    },
    isUserLoggedIn() {
      if (!this.status) {
        return false;
      }
      return this.status && this.status === "authenticated";
    },
    username() {
      if (this.data && this.data.name) {
        const initials = this.data.name
          .split(" ")
          .map((name) => name[0])
          .join("");
        return initials;
      }
      return "Hi";
    },
    isCustomerHome() {
      return this.$route.path === "/customer";
    },
  },

  methods: {
    navigateTo(route) {
      router.push(route); // Use router.push() to navigate to the specified route
    },
    home() {
      this.$router.push("/");
    },
    goToCart() {
      this.$router.push("/cart");
    },
    gotoAuth() {
      this.$router.push("/account/login");
    },
  },
};
</script>

<style lang="sass" scoped>
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
.q-item.q-router-link--active, .q-item--active
  color: black !important

.q-item__section--avatar
  color: #2E5F9A !important
.q-item__section--side .q-icon
  color: #2E5F9A !important
</style>
