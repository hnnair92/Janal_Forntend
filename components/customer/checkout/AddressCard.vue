<template>
  <div class="q-d-flex q-flex-grow-1 column">
    <div v-if="!edit && address && address.id">
      <q-card class="min-card-height q-pa-sm row q-mt-md" bordered flat>
        <q-card-section class="q-pa-md col-8">
          <div
            class="text-h6 q-pb-sm"
            v-if="showAddressTypes && address.address_type"
          >
            {{ capitalizeFirstLetter(address.address_type) }} Address
            <span v-if="address.is_default"
              ><q-badge outline color="green" label="Default"
            /></span>
          </div>
          <div class="text-body1 q-pb-sm">
            {{ address.first_name }} {{ address.last_name }}
          </div>
          <div class="text-body1 q-pb-sm" v-if="address.apartment">
            {{ address.apartment }}
          </div>
          <div class="text-body1 q-pb-sm">
            {{ address.address }}
          </div>
          <div class="text-body1 q-pb-sm">
            {{ address.city }},
            <span v-if="address.province_name">
              {{ address.province_name }}
            </span>
            <span v-else>{{ provinceName(address.province) }}</span>
            {{ address.postal_code }}
          </div>
          <div class="text-body1 q-pb-sm">
            <q-icon name="phone" class="q-mr-sm" /> {{ address.phone_number }}
          </div>
          <div class="text-body1 q-pb-sm">
            <q-icon name="mail" class="q-mr-sm" /> {{ address.email }}
          </div>
        </q-card-section>
        <q-card-section class="q-pa-md col-4 text-right">
          <div v-if="showAddressTypes" class="column">
            <q-btn
              class="q-ma-sm"
              color="secondary"
              icon="edit"
              label="Edit"
              outline
              @click="editAddressPopUp"
            />
            <q-btn
              color="red"
              class="q-ma-sm"
              icon="delete"
              label="Delete"
              outline
              @click="deleteAddress"
            />
          </div>
          <div v-else>
            <q-btn
              color="secondary"
              icon="edit"
              label="Edit"
              outline
              @click="edit = true"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else-if="edit && address">
      <div class="row q-pa-sm">
        <div class="col">
          <label class="text-weight-medium q-px-md"
            >First Name <span class="text-red">*</span></label
          >
          <q-input
            v-model="address.first_name"
            type="text"
            outlined
            class="q-px-md q-mb-sm"
            ref="firstNameRef"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
        <div class="col">
          <label class="text-weight-medium q-px-md"
            >Last Name <span class="text-red">*</span></label
          >
          <q-input
            v-model="address.last_name"
            type="text"
            outlined
            class="q-px-md q-mb-sm"
            ref="lastNameRef"
            :rules="[(val: any) => !!val || 'Field is required']"
          />
        </div>
      </div>
      <div class="row q-pa-sm">
        <div class="col">
          <label class="text-weight-medium q-px-md"
            >Address <span class="text-red">*</span></label
          >
          <q-input
            v-model="address.address"
            type="text"
            outlined
            class="q-px-md q-mb-sm"
            ref="addressRef"
            :rules="[(val: any) => !!val || 'Field is required']"
          />
        </div>
      </div>
      <div class="row q-pa-sm">
        <div class="col">
          <label class="text-weight-medium q-px-md"
            >Apartment, Suite, etc (Optional)</label
          >
          <q-input
            v-model="address.apartment"
            type="text"
            outlined
            class="q-px-md q-mb-sm"
          />
        </div>
      </div>
      <div class="row q-pa-sm">
        <div class="col">
          <label class="text-weight-medium q-px-md"
            >City <span class="text-red">*</span></label
          >
          <q-input
            v-model="address.city"
            type="text"
            outlined
            class="q-px-md q-mb-sm"
            ref="cityRef"
            :rules="[(val: any) => !!val || 'Field is required']"
          />
        </div>
      </div>
      <div class="row q-pa-sm">
        <div class="col">
          <label class="text-weight-medium q-px-md"
            >Province <span class="text-red">*</span></label
          >
          <q-select
            square
            outlined
            v-model="address.province"
            :options="provinceList"
            emit-value
            ref="provinceRef"
            map-options
            class="q-px-md q-mb-sm"
            option-label="name"
            option-value="id"
            :rules="[(val: any) => !!val || 'Field is required']"
          />
        </div>
        <div class="col">
          <label class="text-weight-medium q-px-md"
            >Postal Code <span class="text-red">*</span></label
          >
          <q-input
            v-model="address.postal_code"
            type="text"
            outlined
            class="q-px-md q-mb-sm"
            ref="postCodeRef"
            mask="A#A #A#"
            :rules="[
              postalCodeValidator,
              (val: any) => !!val || 'Field is required',
            ]"
            lazy-rules
          />
        </div>
      </div>

      <div class="row q-pa-sm">
        <div class="col">
          <label class="text-weight-medium q-px-md"
            >Phone Number <span class="text-red">*</span></label
          >
          <q-input
            v-model="address.phone_number"
            type="text"
            mask="(###) ###-####"
            ref="phoneNumberRef"
            outlined
            class="q-px-md q-mb-sm"
            :rules="[
              phoneNumberValidator,
              (val: any) => !!val || 'Field is required',
            ]"
            lazy-rules
          />
        </div>
      </div>
      <div class="row q-pa-sm">
        <div class="col">
          <label class="text-weight-medium q-px-md"
            >Email <span class="text-red">*</span></label
          >
          <q-input
            v-model="address.email"
            type="text"
            outlined
            class="q-px-md q-mb-sm"
            ref="emailRef"
            :rules="[
              emailValidator,
              (val: any) => !!val || 'Field is required',
            ]"
            lazy-rules
          />
        </div>
      </div>
      <div class="row q-pa-sm" v-if="showAddressTypes">
        <div class="col">
          <label class="text-weight-medium q-px-md"
            >Address Type <span class="text-red">*</span></label
          >
          <q-select
            square
            outlined
            v-model="address.address_type"
            :options="addressTypeOptions"
            emit-value
            map-options
            class="q-px-md q-mb-sm"
            :rules="[(val: any) => !!val || 'Field is required']"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Address, Province } from "@/openapi";
import {
  Component,
  Vue,
  toNative,
  Prop,
  Emit,
  Watch,
} from "vue-facing-decorator";
@Component({
  name: "AddressCard",
  emits: ["validation-status", "edit-address", "delete-address"],
  components: {},
})
export class AddressCard extends Vue {
  @Prop() address: Address;
  @Prop() provinceList: Array<Province>;
  @Prop({ default: false }) showAddressTypes: boolean;
  @Prop() editMode: boolean;
  edit = false;
  addressTypes: any = [];
  addressTypeOptions = [] as { label: string; value: Address.address_type }[];

  mounted() {
    if (this.address && !this.address.id) {
      this.edit = true;
    }
    if (this.editMode != undefined) {
      this.edit = this.editMode;
    }
    this.addressTypes = Address.address_type;
    this.addressTypeOptions = this.getAddressTypeOptions();
  }

  editAddressPopUp() {
    this.$emit("edit-address");
  }

  deleteAddress() {
    this.$emit("delete-address");
  }
  getAddressTypeOptions() {
    return Object.keys(this.addressTypes).map((key) => {
      return {
        label: this.capitalizeFirstLetter(this.addressTypes[key]),
        value: this.addressTypes[key],
      };
    });
  }
  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  provinceName(provinceId: any) {
    if (!this.provinceList.length && !provinceId) return;

    let province = this.provinceList.find(
      (obj: Province) => obj.id == provinceId
    );
    if (province) return province.name;
  }

  @Emit("validation-status")
  emitValidationStatus(isValid: boolean) {
    return isValid;
  }

  @Watch("address", { deep: true, immediate: true })
  onAddressChange() {
    this.$nextTick(() => {
      this.emitValidationStatus(this.isValidated);
    });
  }

  get isValidated() {
    if (this.edit && this.address) {
      (this as any).$refs.firstNameRef.validate();
      (this as any).$refs.lastNameRef.validate();
      (this as any).$refs.addressRef.validate();
      (this as any).$refs.provinceRef.validate();
      (this as any).$refs.postCodeRef.validate();
      (this as any).$refs.cityRef.validate();
      (this as any).$refs.phoneNumberRef.validate();
      (this as any).$refs.emailRef.validate();

      return !(
        (this as any).$refs.firstNameRef.hasError ||
        (this as any).$refs.lastNameRef.hasError ||
        (this as any).$refs.addressRef.hasError ||
        (this as any).$refs.provinceRef.hasError ||
        (this as any).$refs.postCodeRef.hasError ||
        (this as any).$refs.cityRef.hasError ||
        (this as any).$refs.phoneNumberRef.hasError ||
        (this as any).$refs.emailRef.hasError
      );
    } else if (this.address && this.address.id) {
      return true;
    } else {
      return true;
    }
  }
  emailValidator(value: any) {
    if (!value && this.address) {
      value = this.address.email;
    }
    // Regular expression for basic email validation
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!value) {
      return true; // Allow empty values (handled by the 'Field is required' rule)
    } else if (emailPattern.test(value)) {
      return true; // Valid email address
    } else {
      return "Invalid email address"; // Invalid email address format
    }
  }

  postalCodeValidator(value: any) {
    // Canadian postal code regex pattern
    const postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;

    if (!value) {
      return true; // Allow empty values (handled by the 'Field is required' rule)
    } else if (postalCodePattern.test(value)) {
      return true; // Valid Canadian postal code
    } else {
      return "Invalid postal code format. Example - A1A 1A1"; // Invalid postal code
    }
  }

  phoneNumberValidator(value: any) {
    if (!value && this.address) {
      value = this.address.phone_number;
    }

    // North American phone number regex pattern
    const phoneNumberPattern = /^(?:\(\d{3}\)\s?|^\d{3}-)\d{3}-\d{4}$/;

    if (!value) {
      return true; // Allow empty values (handled by the 'Field is required' rule)
    } else if (phoneNumberPattern.test(value)) {
      return true; // Valid North American phone number format
    } else {
      return "Invalid phone number"; // Invalid phone number format
    }
  }
}
export default toNative(AddressCard);
</script>
<style scoped>
.min-card-height {
  min-height: 285px;
}
</style>
