<template>
  <div class="q-flex-grow-1 column">
    <div class="row">
      <div class="text-h4 q-mb-md col">Addresses</div>
      <div class="col text-right">
        <q-btn color="secondary" unelevated outline @click="addAddress">
          <q-icon name="add" size="sm" class="q-mr-sm" /> Add Address</q-btn
        >
      </div>
    </div>
    <div class="q-flex-grow-1 row wrap">
      <div
        v-for="(address, index) in addresses"
        :key="`add-${index}`"
        class="col-lg-3 col-lg-3 col-md-4 col-sm-12 col-xs-12 q-pa-sm"
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
  Address,
  CustomerService,
  Province,
  ProvincesService,
} from "@/openapi/";
import AddressCard from "@/components/customer/checkout/AddressCard.vue";

@Component({
  name: "CustomerAddress",
  components: { AddressCard },
})
export class CustomerAddress extends Vue {
  @Prop({ required: true }) user: any;
  addresses: Array<Address> = Array<Address>();
  provinces: Province[] = [];

  mounted() {
    this.getAllCustomerAddresses();
    this.getProvince();
  }
  getAllCustomerAddresses() {
    CustomerService.customerAddressesList(1, 100).then((res: any) => {
      if (res.results) {
        this.addresses = res.results;
      }
    });
  }
  showAddressDialog = false;
  activeAddress: Address | null = null;
  //Get list of provinces
  getProvince() {
    ProvincesService.provincesList()
      .then((res) => {
        this.provinces = res.results;
      })
      .catch((err) => console.error(`Error fetching list of provinces ${err}`));
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
    if (address.id) {
      CustomerService.customerAddressesDelete(address.id).then(() => {
        this.$q.notify({
          message: "Address Deleted",
          color: "red",
          position: "top",
          classes: "text-body1",
        });
        this.getAllCustomerAddresses();
      });
    }
  }

  saveAddress() {
    if (this.activeAddress && this.activeAddress?.id) {
      CustomerService.customerAddressesPartialUpdate(
        this.activeAddress.id,
        this.activeAddress
      ).then(() => {
        this.$q.notify({
          message: "Address Updated",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
        this.showAddressDialogCancel();
        this.getAllCustomerAddresses();
      });
    } else if (this.activeAddress) {
      this.activeAddress.user = this.user.id;
      CustomerService.customerAddressesCreate(this.activeAddress).then(() => {
        this.$q.notify({
          message: "New Address Added",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
        this.showAddressDialogCancel();
        this.getAllCustomerAddresses();
      });
    }
  }
}
export default toNative(CustomerAddress);
</script>
