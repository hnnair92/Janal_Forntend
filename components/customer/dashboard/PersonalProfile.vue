<template>
  <div>
    <q-card flat class="q-pa-md">
      <q-form class="q-gutter-md">
        <label class="text-weight-medium">First Name</label>
        <q-input
          v-model="first_name"
          outlined
          lazy-rules
          :rules="[
            (val: string | any[]) =>
              (val && val.length > 0) || 'Please type something',
          ]"
        />

        <label class="text-weight-medium">Last Name</label>
        <q-input v-model="last_name" outlined lazy-rules class="q-mb-md" />

        <label class="text-weight-medium">Email</label>
        <q-input v-model="email" outlined lazy-rules disable />

        <div class="d-flex row justify-between">
          <DeleteAccount />
          <div class="d-flex row">
            <UpdatePassword />
            <q-btn
              label="Update"
              type="submit"
              color="secondary"
              :disable="updateButton"
              @click.prevent="updateUserDetails"
            />
          </div>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { CustomerService } from "@/openapi/";
import UpdatePassword from "@/components/customer/dashboard/UpdatePassword.vue";
import DeleteAccount from "@/components/customer/dashboard/DeleteAccount.vue";

@Component({
  name: "PersonalProfile",
  components: {
    UpdatePassword,
    DeleteAccount,
  },
})
export class PersonalProfile extends Vue {
  email = "";
  first_name = "";
  last_name = "";

  initialFirstName = "";
  initialLastName = "";

  get updateButton() {
    if (
      !(this.first_name === this.initialFirstName) ||
      !(this.last_name === this.initialLastName)
    ) {
      return false;
    }
    return true;
  }

  updateUserDetails() {
    // @ts-ignore
    const { getSession } = useAuth();

    CustomerService.customerPersonalProfilePartialUpdate({
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
    })
      .then((res: any) => {
        this.$q.notify({
          message: "Details Updated",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
        this.initialFirstName = res.first_name;
        this.initialLastName = res.last_name;
        getSession({ force: true });
      })
      .catch(() => {
        this.$q.notify({
          message: "Oops, something went wrong!",
          color: "red",
          position: "top",
          classes: "text-body1",
        });
      });
  }

  mounted() {
    const { data } = useAuth();
    if (data.value) {
      // @ts-ignore
      this.email = data.value.email;
      // @ts-ignore
      this.first_name = data.value.first_name;
      // @ts-ignore
      this.last_name = data.value.last_name;
      this.initialFirstName = this.first_name;
      this.initialLastName = this.last_name;
    }
  }
}
export default toNative(PersonalProfile);
</script>
