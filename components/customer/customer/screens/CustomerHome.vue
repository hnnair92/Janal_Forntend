<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 column">
      <div class="q-pa-sm">
        <p class="text-h4">Welcome, {{ userFullName }}</p>
      </div>
      <div>
        <q-splitter v-model="splitterModel">
          <template #before>
            <q-tabs v-model="tab" vertical class="text-secondary">
              <q-tab name="orders" icon="list" label="Orders" />
              <q-tab name="wishlist" icon="favorite" label="Wishlist" />
              <q-tab name="address" icon="import_contacts" label="Addresses" />
              <q-tab
                name="profile"
                icon="manage_accounts"
                label="Personal Profile"
              />
              <q-tab
                name="movies"
                icon="logout"
                label="Sign out"
                @click="signOut()"
              />
            </q-tabs>
          </template>

          <template #after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="orders" class="q-pa-md">
                <div class="text-h4 q-mb-md">Orders</div>
                <CustomerOrdersTab />
              </q-tab-panel>

              <q-tab-panel name="wishlist" class="q-pa-md">
                <div class="text-h4 q-mb-md">Wishlist</div>
                <CustomerWishListTab />
              </q-tab-panel>

              <q-tab-panel name="address" class="q-pa-md">
                <CustomerAddress :user.sync="user" />
              </q-tab-panel>
              <q-tab-panel name="profile" class="q-pa-md">
                <div class="text-h4 q-mb-md">Personal Profile</div>
                <PersonalProfile />
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Setup, toNative } from "vue-facing-decorator";
import { setInitials } from "@/store/avatar";
import PersonalProfile from "@/components/customer/dashboard/PersonalProfile.vue";
import CustomerAddress from "@/components/customer/dashboard/CustomerAddress.vue";
import CustomerOrdersTab from "@/components/customer/customer/tabs/CustomerOrdersTab.vue";
import CustomerWishListTab from "@/components/customer/customer/tabs/CustomerWishListTab.vue";
@Component({
  name: "CustomerHome",
  components: {
    PersonalProfile,
    CustomerAddress,
    CustomerOrdersTab,
    CustomerWishListTab,
  },
})
export class CustomerHome extends Vue {
  tab = "orders";
  splitterModel = 10;
  // @ts-ignore
  @Setup((_props, _ctx) => useAuth())
  // @ts-ignore
  authenticationBackend = useAuth();

  get userFullName() {
    if (!this.authenticationBackend || !this.authenticationBackend.data.value) {
      return;
    }
    const data = this.authenticationBackend.data;
    return data.value ? data.value.name : "";
  }
  get user() {
    if (!this.authenticationBackend || !this.authenticationBackend.data.value) {
      return;
    }

    return this.authenticationBackend.data.value;
  }

  // eslint-disable-next-line require-await
  async signOut() {
    this.authenticationBackend.signOut();
    this.$router.push("/");
  }
}
export default toNative(CustomerHome);
</script>

<style lang="scss" scoped></style>
