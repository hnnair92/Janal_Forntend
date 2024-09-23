<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <div class="q-pa-md">
          <q-img
            loading="eager"
            fetchpriority="high"
            no-spinner
            src="/logo.svg"
            width="100px"
            @click.prevent="home()"
          ></q-img>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            flat
            style="background: #b23b3b; color: white"
            label="Logout"
            @click="logout"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="left"
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="link in links1"
            :key="link.text"
            v-ripple
            clickable
            @click="navigateTo(link.link)"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold text-uppercase">
            Product Management
          </q-item-label>

          <q-item
            v-for="link in links2"
            :key="link.text"
            v-ripple
            clickable
            @click="navigateTo(link.link)"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item-label header class="text-weight-bold text-uppercase">
            Promotions
          </q-item-label>

          <q-item
            v-for="link in links3"
            :key="link.text"
            v-ripple
            clickable
            @click="navigateTo(link.link)"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item-label header class="text-weight-bold text-uppercase">
            Order Management
          </q-item-label>

          <q-item
            v-for="link in links4"
            :key="link.text"
            v-ripple
            clickable
            @click="navigateTo(link.link)"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item-label header class="text-weight-bold text-uppercase">
            Customer Care
          </q-item-label>
          <q-item
            v-for="link in links5"
            :key="link.text"
            v-ripple
            clickable
            @click="navigateTo(link.link)"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item-label header class="text-weight-bold text-uppercase">
            User Management
          </q-item-label>
          <q-item
            v-for="link in links6"
            :key="link.text"
            v-ripple
            clickable
            @click="navigateTo(link.link)"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item-label header class="text-weight-bold text-uppercase">
            Utilities
          </q-item-label>
          <q-item
            v-for="link in links7"
            :key="link.text"
            v-ripple
            clickable
            @click="navigateTo(link.link)"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "admin",

  setup() {
    const leftDrawerOpen = ref(true);
    const search = ref("");
    const router = useRouter();
    const { signOut } = useAuth();

    function toggleLeftDrawer() {
      leftDrawerOpen.value = true;
    }
    function navigateTo(route) {
      router.push(route); // Use router.push() to navigate to the specified route
    }
    function home() {
      router.push("/pages-admin/");
    }
    async function logout() {
      await signOut({ callbackUrl: "/" });
    }
    return {
      leftDrawerOpen,
      search,
      navigateTo,
      toggleLeftDrawer,
      home,
      logout,
      links1: [{ icon: "home", text: "Dashboard", link: "/pages-admin/" }],
      links2: [
        {
          icon: "category",
          text: "Categories",
          link: "/pages-admin/products/categories/",
        },
        { icon: "inventory", text: "Products", link: "/pages-admin/products/" },
        {
          icon: "blinds",
          text: " Fabrics",
          link: "/pages-admin/products/variant/",
        },
        {
          icon: "flaky",
          text: "Product Options",
          link: "/pages-admin/products/options/",
        },
        {
          icon: "attach_money",
          text: "Product Pricing",
          link: "/pages-admin/products/pricing/",
        },
      ],
      links3: [
        {
          icon: "percent",
          text: "Promotions",
          link: "/pages-admin/promotions/",
        },
      ],
      links4: [
        { icon: "list_alt", text: "Orders", link: "/pages-admin/orders/" },
      ],
      links5: [
        {
          icon: "support_agent",
          text: "Customer Enquiries",
          link: "/pages-admin/customer-queries/",
        },
      ],
      links6: [
        {
          icon: "group",
          text: "Users",
          link: "/pages-admin/users/",
        },
      ],
      links7: [
        {
          icon: "settings",
          text: "Utilities",
          link: "/pages-admin/utilities/payment-settings/",
        },
        {
          icon: "assured_workload",
          text: "Tax Settings",
          link: "/pages-admin/utilities/tax-settings/",
        },
      ],
    };
  },
};
</script>

<style lang="sass">
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
</style>
