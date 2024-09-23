<template>
  <div class="full-width row wrap items-start content-start">
    <div class="full-width q-pa-sm">
      <q-breadcrumbs class="q-ml-sm q-mb-lg q-mt-sm">
        <q-breadcrumbs-el
          to="/pages-admin/users/"
          class="text-secondary text-bold"
          label="Users"
        />
        <q-breadcrumbs-el label="Details" />
      </q-breadcrumbs>
      <q-page>
        <q-card flat class="q-mb-lg">
          <q-card-section>
            <q-form>
              <div class="row justify-start">
                <div class="q-mr-sm">
                  <span class="text-bold">Account Status</span>
                  <q-toggle
                    v-model="user.is_active"
                    checked-icon="check"
                    :color="user.is_active ? 'green' : 'red'"
                    unchecked-icon="clear"
                    :label="user.is_active ? 'Active' : 'Inactive'"
                  />
                </div>
                <div v-if="user.is_superuser" class="q-my-sm">
                  <q-icon name="security" size="sm" color="secondary" />
                  <span class="text-bold q-ml-sm">Superuser</span>
                </div>
                <div v-if="user.is_admin" class="q-my-sm q-ml-sm">
                  <q-icon
                    name="admin_panel_settings"
                    size="sm"
                    color="secondary"
                  />
                  <span class="text-bold q-ml-sm">Admin</span>
                </div>
                <div v-if="user.is_staff" class="q-my-sm q-ml-sm">
                  <q-icon name="verified_user" size="sm" color="secondary" />
                  <span class="text-bold q-ml-sm">Staff</span>
                </div>
              </div>

              <div class="row justify-end">
                <span class="text-bold">Last Login</span> :
                {{ lastLogin }}
              </div>

              <label class="text-weight-medium q-pb-md"> First Name</label>
              <q-input
                v-model="user.first_name"
                outlined
                dense
                class="q-mb-md q-mt-sm"
                ref="firstNameRef"
                :rules="validationRules.first_name"
              />
              <label class="text-weight-medium q-pb-md"> Last Name</label>
              <q-input
                v-model="user.last_name"
                outlined
                dense
                class="q-mb-md q-mt-sm"
                ref="lastNameRef"
                :rules="validationRules.last_name"
              />
              <label class="text-weight-medium q-pb-md"> Email</label>
              <q-input
                v-model="user.email"
                outlined
                class="q-mb-md q-mt-sm"
                ref="emailRef"
                dense
                :rules="validationRules.email"
              />
            </q-form>
          </q-card-section>
        </q-card>
        <q-card flat>
          <q-card-section>
            <div class="q-d-flex q-flex-grow-1">
              <div class="q-pa-md">
                <span class="text-bold">Addresses</span>
              </div>
              <q-separator />
              <div class="q-d-flex q-flex-grow-1 q-pa-md column">
                <div class="q-flex-grow-1 row wrap">
                  <div
                    v-for="(address, index) in user.address"
                    :key="`add-${index}`"
                    class="col-lg-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pa-sm"
                  >
                    <AddressCard
                      v-if="address.id"
                      :address.sync="address"
                      :provinceList.sync="provinces"
                      @edit-address="editAddress(address)"
                      @delete-address="deleteAddress(address)"
                      showAddressTypes="true"
                    />
                  </div>
                </div>
                <div>
                  <q-btn
                    color="secondary"
                    unelevated
                    outline
                    @click="addAddress"
                  >
                    <q-icon name="add" size="sm" class="q-mr-sm" /> Add
                    Address</q-btn
                  >
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat class="q-mb-lg">
          <!-- <q-card-title>
            <div class="q-pa-md">
              <span class="text-bold">Address</span>
            </div>
          </q-card-title> -->
          <!-- <q-card-section v-if="user.address">
            <q-form>
              <label class="text-weight-medium q-pb-md">First Name</label>
              <q-input
                v-model="user.address.first_name"
                outlined
                dense
                class="q-mt-sm"
                :rules="validationRules.first_name"
              />
              <label class="text-weight-medium q-pb-md">Last Name</label>
              <q-input
                v-model="user.address.last_name"
                outlined
                dense
                class="q-mt-sm"
                :rules="validationRules.last_name"
              />
              <label class="text-weight-medium q-pb-md">Email</label>
              <q-input
                v-model="user.address.email"
                outlined
                dense
                class="q-mt-sm q-mb-md"
                :rules="validationRules.email"
              />

              <label class="text-weight-medium q-pb-md">Address</label>
              <q-input
                v-model="user.address.address"
                outlined
                dense
                class="q-mt-sm q-mb-md"
                :rules="validationRules.address"
              />

              <label class="text-weight-medium q-pb-md">Apartment</label>
              <q-input
                v-model="user.address.apartment"
                outlined
                dense
                class="q-mt-sm q-mb-md"
              />

              <label class="text-weight-medium q-pb-md">City</label>
              <q-input
                v-model="user.address.city"
                outlined
                dense
                class="q-mt-sm q-mb-md"
                :rules="validationRules.city"
              />

              <label class="text-weight-medium q-pb-md">Postal Code</label>
              <q-input
                v-model="user.address.postal_code"
                outlined
                dense
                class="q-mt-sm q-mb-md"
                :rules="validationRules.postal_code"
              />

              <label class="text-weight-medium q-pb-md">Province</label>
              <q-select
                v-model="user.address.province"
                outlined
                dense
                :options="provinces"
                class="q-mb-md q-mt-sm"
                option-label="name"
                option-value="id"
                emit-value
                map-options
              />

              <label class="text-weight-medium q-pb-md">Phone Number</label>
              <q-input
                v-model="user.address.phone_number"
                outlined
                dense
                class="q-mt-sm"
                :rules="validationRules.phone"
                :mask="'###-###-####'"
              />
            </q-form>
          </q-card-section> -->
          <!-- <q-card-section>
            <q-btn color="secondary" unelevated outline @click="addAddress">
              <q-icon name="add" size="sm" class="q-mr-sm" /> Add Address</q-btn
            >
          </q-card-section> -->
        </q-card>
        <div class="full-width justify-between row q-pa-md">
          <div class="q-mb-sm row">
            <UpdatePassword v-if="currentUser" class="q-pl-sm" />
            <q-btn
              v-else
              color="secondary"
              size="md"
              unelevated
              @click="confirm = true"
              class="q-mr-md"
              ><q-icon name="password" class="q-pr-sm" />
              Reset Password
            </q-btn>
            <q-btn
              color="red"
              size="md"
              unelevated
              @click="alert = true"
              v-if="!currentUser"
              ><q-icon name="warning" class="q-pr-sm" /> Delete User</q-btn
            >

            <q-dialog v-model="confirm">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Password Reset</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  Are you sure you want to send password reset email?
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" v-close-popup />
                  <q-btn
                    flat
                    label="Send"
                    color="secondary"
                    @click="sendPasswordReset"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="alert">
              <q-card>
                <q-card-section>
                  <div class="text-h6">
                    <q-icon name="warning" color="red" size="sm" /> Attention
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  Are you sure you want to delete this user?
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="secondary" v-close-popup />
                  <q-btn
                    flat
                    label="Delete"
                    color="red"
                    @click="deleteUser"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <div id="mobile-buttons">
            <q-btn
              class="q-mr-md"
              to="/pages-admin/users/"
              color="secondary"
              outline
            >
              <q-icon name="arrow_back_ios" size="sm" />Back</q-btn
            >
            <q-btn
              type="submit"
              color="secondary"
              class="q-mr-md"
              @click="updateUserDetails"
              :loading="loading"
            >
              <q-icon name="save" size="sm" class="q-mr-sm" /> Save
            </q-btn>
          </div>
        </div>
      </q-page>
    </div>

    <!-- Dialog box to create or edit addresses -->
    <q-dialog v-model="showAddressDialog" persistent>
      <q-card style="width: 900px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 text-secondary q-mb-sm q-px-sm">
            {{ activeAddress && activeAddress.id ? "Edit" : "Create" }} Address
          </div>

          <q-separator class="q-mb-sm" />
          <AddressCard
            :address.sync="activeAddress"
            :provinceList.sync="provinces"
            showAddressTypes="true"
            editMode="true"
          ></AddressCard>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Cancel"
            color="secondary"
            flat
            @click="showAddressDialogCancel"
          />
          <q-btn label="Save" color="secondary" @click="saveAddress" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, toNative } from "vue-facing-decorator";
import {
  UsersService,
  UserEmail,
  IdentityService,
  Address,
  AllFieldsUser,
  Province,
  ProvincesService,
} from "@/openapi/";
import AddressCard from "@/components/customer/checkout/AddressCard.vue";
import UpdatePassword from "@/components/customer/dashboard/UpdatePassword.vue";
@Component({
  name: "UserDetails",
  components: { AddressCard, UpdatePassword },
})
export class UserDetails extends Vue {
  @Prop() userId!: number;
  user: AllFieldsUser = <AllFieldsUser>{
    address: undefined,
    password: undefined,
  };

  loading: boolean = false;
  userEmail: UserEmail = <UserEmail>{};
  alert = false;
  confirm = false;
  provinces: Province[] = [];
  showAddressDialog = false;
  activeAddress: Address | null = null;

  get currentUser() {
    const { status, data } = useAuthState();
    if (data && data.value && data.value.id && data.value.id == this.userId) {
      return true;
    }
    return false;
  }
  // Add address from admin user
  addAddress() {
    this.showAddressDialog = true;
    this.activeAddress = <Address>{
      address_type: Address.address_type.HOME,
    };
  }
  // When user clicks edit address from card
  editAddress(address: Address) {
    this.activeAddress = address;
    this.showAddressDialog = true;
  }

  // Update states when user cancel the dialog box
  showAddressDialogCancel() {
    this.activeAddress = null;
    this.showAddressDialog = false;
  }

  deleteAddress(address: Address) {
    if (this.user.address) {
      this.user.address = this.user.address.filter(
        (ad: Address) => ad.id !== address.id
      );
      this.updateUserDetails();
    }
  }

  saveAddress() {
    if (this.activeAddress && !this.activeAddress.id) {
      if (this.user && !this.user.address) {
        this.user.address = [];
      } else if (this.user && this.user.address) {
        this.user.address.push(this.activeAddress);
      }
    }
    this.updateUserDetails();
  }
  // Fetch details for a single user
  getUser() {
    UsersService.usersRead(this.userId)
      .then((res) => {
        this.user = res;
        this.userEmail.email = this.user.email;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // Format the last login date to user-readable format
  get lastLogin() {
    const lastLogin: any = this.user.last_login;
    if (lastLogin) {
      const date = new Date(lastLogin);
      return date.toLocaleString();
    } else {
      return "Not Available";
    }
  }

  // Function to update user details
  updateUserDetails() {
    (this as any).$refs.firstNameRef.validate();
    (this as any).$refs.lastNameRef.validate();
    (this as any).$refs.emailRef.validate();

    if (
      (this as any).$refs.firstNameRef.hasError ||
      (this as any).$refs.lastNameRef.hasError ||
      (this as any).$refs.emailRef.hasError
    ) {
      (this as any).$q.notify({
        message: "Please fill in all the required fields.",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
      return;
    }

    this.loading = true;
    UsersService.usersPartialUpdate(this.userId, this.user)
      .then((res) => {
        (this as any).$q.notify({
          message: "User Updated",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
        this.loading = false;
        this.showAddressDialogCancel();
        this.getUser();
      })
      .catch((err) => {
        (this as any).$q.notify({
          message: "Error Updating User",
          color: "red",
          position: "top",
          classes: "text-body1",
        });
        throw new Error(err);
      });
  }

  // Function to send password reset email
  sendPasswordReset() {
    IdentityService.identityAccountsForgotPasswordCreate(this.userEmail)
      .then(() => {
        (this as any).$q.notify({
          message: "Password Reset Email Sent",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
      })
      .catch((err) =>
        (this as any).$q.notify({
          message: "Error sending password reset email",
          color: "green",
          position: "top",
          classes: "text-body1",
        })
      );
  }

  //Function to delete user
  deleteUser() {
    UsersService.usersDelete(this.userId)
      .then(() => {
        (this as any).$q.notify({
          message: "Deleted User",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
        (this as any).$router.push(`/pages-admin/users/`);
      })
      .catch(() => {
        (this as any).$q.notify({
          message: "Error deleting user",
          color: "red",
          position: "top",
          classes: "text-body1",
        });
      });
  }

  //Get list of provinces
  getProvince() {
    ProvincesService.provincesList()
      .then((res) => {
        this.provinces = res.results;
      })
      .catch((err) => console.error(`Error fetching list of provinces ${err}`));
  }

  mounted() {
    this.getUser();
    this.getProvince();
  }

  //validation rules for address fields
  validationRules = {
    first_name: [
      (val: any) => !!val || "First Name is required",
      (val: any) =>
        (val && /^[a-zA-Z\s]*$/.test(val)) ||
        "Name must contain only letters and spaces",
    ],
    last_name: [
      (val: any) => !!val || "Last Name is required",
      (val: any) =>
        (val && /^[a-zA-Z\s]*$/.test(val)) ||
        "Name must contain only letters and spaces",
    ],
    email: [
      (val: any) => !!val || "Email is required",
      (val: any) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || "Invalid email address",
    ],
    address: [(val: any) => !!val || "Address is required"],
    city: [
      (val: any) => !!val || "City is required",
      (val: any) =>
        (val && /^[a-zA-Z\s]*$/.test(val)) ||
        "Name must contain only letters and spaces",
    ],
    phone: [(val: any) => !!val || "Phone number is required"],
    postal_code: [
      (val: any) => !!val || "Postal code is required",
      (val: any) =>
        (val && /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(val)) ||
        "Please enter a valid Canadian postal code (e.g., A1A 1A1)",
    ],
  };
}
export default toNative(UserDetails);
</script>

<style scoped>
@media (max-width: 767px) {
  #mobile-buttons {
    width: 100%;
    height: 100px;
    display: flex;
    gap: 18px;
    flex-direction: column-reverse;
  }
}
</style>
