<template>
  <div class="full-width column wrap items-start content-start">
    <div class="q-pa-sm full-width">
      <q-breadcrumbs class="q-ml-sm q-mb-lg q-mt-sm">
        <q-breadcrumbs-el
          to="/pages-admin/users/"
          class="text-secondary text-bold"
          label="Users"
        />
        <q-breadcrumbs-el label="Create" />
      </q-breadcrumbs>
      <q-page>
        <span class="text-h6 q-ml-sm text-secondary">Required</span>
        <q-card flat class="q-mb-lg">
          <q-card-section>
            <q-form>
              <label class="text-weight-medium q-pb-md">First Name</label>
              <q-input
                v-model="user.first_name"
                outlined
                class="q-mb-sm q-mr-md"
                :rules="validationRules.first_name"
                ref="firstNameRef"
              />
              <label class="text-weight-medium q-pb-md">Last Name</label>
              <q-input
                v-model="user.last_name"
                outlined
                class="q-mb-sm q-mr-md"
                :rules="validationRules.last_name"
                ref="lastNameRef"
              />
              <label class="text-weight-medium q-pb-md">Email</label>
              <q-input
                v-model="user.email"
                outlined
                class="q-mr-md"
                :rules="validationRules.email"
                ref="emailRef"
              />
            </q-form>
          </q-card-section>
        </q-card>
        <span class="text-h6 q-ml-sm text-secondary">Privileges</span>
        <q-card flat class="q-mb-lg q-pa-md">
          <div>
            <q-checkbox
              color="secondary"
              v-model="user.is_admin"
              label="Admin"
              class="q-mr-md text-bold"
            />
            <q-checkbox
              color="secondary"
              v-model="user.is_staff"
              label="Staff"
              class="q-mr-md text-bold"
            />
            <q-checkbox
              color="secondary"
              v-model="user.is_superuser"
              label="Superuser"
              class="text-bold"
            />
          </div>
        </q-card>
        <div class="q-ml-md row justify-end q-mt-md">
          <q-btn
            to="/pages-admin/users/"
            color="secondary"
            flat
            class="q-mr-sm"
          >
            <q-icon name="arrow_back_ios" size="sm" />Back</q-btn
          >
          <q-btn
            type="submit"
            color="secondary"
            class="q-mr-md"
            @click="createUser"
            :loading="loading"
          >
            <q-icon name="save" size="sm" /> Create User
          </q-btn>
        </div>
      </q-page>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { UsersService, UserEmail, AllFieldsUser } from "@/openapi/";

@Component({
  name: "UserDetails",
})
export class UserDetails extends Vue {
  user: AllFieldsUser = <AllFieldsUser>{
    is_staff: false,
    is_superuser: false,
    is_admin: false,
  };
  userEmail: UserEmail = <UserEmail>{};
  admin: boolean = false;
  staff: boolean = false;
  superuser: boolean = false;
  loading: boolean = false;

  validationRules = {
    first_name: [
      (val: any) => !!val || "First name is required",
      (val: any) =>
        (val && /^[a-zA-Z\s]*$/.test(val)) ||
        "Name must contain only letters and spaces",
    ],
    last_name: [
      (val: any) => !!val || "Last name is required",
      (val: any) =>
        (val && /^[a-zA-Z\s]*$/.test(val)) ||
        "Name must contain only letters and spaces",
    ],
    email: [
      (val: any) => !!val || "Email is required",
      (val: any) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || "Invalid email address",
    ],
  };

  createUser() {
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
    this.user.name = this.user.first_name + " " + this.user.last_name;
    this.loading = true;
    UsersService.usersCreate(this.user)
      .then((res) => {
        //@ts-ignore
        if (res.error) {
          (this as any).$q.notify({
            message: "Email is already in use. Please use unique email!",
            color: "red",
            position: "top",
            classes: "text-body1",
          });
        } else {
          this.loading = false;
          (this as any).$q.notify({
            message: "User Created",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
          //@ts-ignore
          if (res.email_sent) {
            (this as any).$q.notify({
              message: "Activation Email Sent",
              color: "green",
              position: "top",
              classes: "text-body1",
            });
          }
          this.$router.push(`/pages-admin/users/`);
        }
      })
      .catch((err) => {
        (this as any).$q.notify({
          message: "Something went wrong. Please try again.",
          color: "red",
          position: "top",
          classes: "text-body1",
        });
      });
  }
}
export default toNative(UserDetails);
</script>
