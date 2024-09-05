<template>
  <div>
    <q-btn
      color="secondary"
      @click="dialogChangePassword = true"
      class="q-mr-sm"
      outline
      >Change Password</q-btn
    >

    <q-dialog v-model="dialogChangePassword">
      <q-card class="q-pa-lg">
        <div class="text-h4 text-secondary q-mb-sm">Change Password</div>

        <div class="q-pt-md">
          <div>
            <label class="text-weight-medium q-pb-sm">Old Password</label>
            <q-input
              v-model="password.old_password"
              outlined
              lazy-rules
              class="q-pt-sm"
              :type="isOldPwd ? 'password' : 'text'"
              style="max-width: 550px; width: 450px"
              :rules="[(val: any) => !!val || 'Old password is required']"
              ref="oldPasswordRef"
            >
              <template v-slot:append>
                <q-icon
                  :name="isOldPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isOldPwd = !isOldPwd"
                />
              </template>
            </q-input>
          </div>

          <div class="q-pt-md">
            <label class="text-weight-medium">New Password</label>
            <q-input
              v-model="password.new_password"
              outlined
              :type="isNewPwd ? 'password' : 'text'"
              style="max-width: 550px; width: 450px"
              class="q-pt-sm"
              lazy-rules
              :rules="[
                (val: any) => !!val || 'New password is required',
                (val) =>
                  val.length >= 8 ||
                  'Password must be at least 8 characters long',
                (val) =>
                  /[a-z]/.test(val) ||
                  'Password must contain at least one lowercase letter',
                (val) =>
                  /[A-Z]/.test(val) ||
                  'Password must contain at least one uppercase letter',
                (val) =>
                  /\d/.test(val) || 'Password must contain at least one number',
              ]"
              ref="newPasswordRef"
            >
              <template v-slot:append>
                <q-icon
                  :name="isNewPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isNewPwd = !isNewPwd"
                />
              </template>
            </q-input>
            <div class="d-flex column q-mt-sm">
              <span class="text-caption">
                <span v-if="password.new_password?.length > 8">
                  <q-icon name="done" color="green" size="20px" />
                </span>
                <span v-else>
                  <q-icon name="cancel" color="red" size="20px" />
                </span>
                Password must be atleast 8 characters long.
              </span>
              <span class="text-caption">
                <span v-if="password.new_password?.match(/[A-Z]/)">
                  <q-icon name="done" color="green" size="20px" />
                </span>
                <span v-else>
                  <q-icon name="cancel" color="red" size="20px" />
                </span>
                Password must contain at least 1 uppercase character.
              </span>

              <span class="text-caption">
                <span v-if="password.new_password?.match(/[a-z]/)">
                  <q-icon name="done" color="green" size="20px" />
                </span>
                <span v-else>
                  <q-icon name="cancel" color="red" size="20px" />
                </span>
                Password must contain at least 1 lowercase character.
              </span>
            </div>
          </div>

          <div class="q-pt-md">
            <label class="text-weight-medium">Confirm Password</label>
            <q-input
              v-model="password.confirm_password"
              outlined
              :type="isConfirmPwd ? 'password' : 'text'"
              style="max-width: 550px; width: 450px"
              class="q-pt-sm"
              lazy-rules
              :rules="[
                (val: any) => !!val || 'Confirmation password is required',
                (val: string) =>
                  val === password.new_password || 'Passwords do not match',
              ]"
              ref="confirmPasswordRef"
            >
              <template v-slot:append>
                <q-icon
                  :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isConfirmPwd = !isConfirmPwd"
                />
              </template>
            </q-input>
          </div>
        </div>

        <q-card-actions align="right">
          <q-btn color="red" label="Close" @click="closeDialog" outline />
          <q-btn color="secondary" label="Update" @click="updatePassword">
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { CustomerService, ChangePassword } from "@/openapi/";

@Component({
  name: "UpdatePassword",
})
export class UpdatePassword extends Vue {
  dialogChangePassword: boolean = false;
  password: ChangePassword = <ChangePassword>{};
  private passwordChanged: string = "Password changed!";
  isOldPwd: boolean = true;
  isNewPwd: boolean = true;
  isConfirmPwd: boolean = true;

  closeDialog() {
    this.password = {
      confirm_password: "",
      new_password: "",
      old_password: "",
    };
    this.isOldPwd = true;
    this.isNewPwd = true;
    this.isConfirmPwd = true;
    this.dialogChangePassword = false;
  }

  updatePassword() {
    (this as any).$refs.oldPasswordRef.validate();
    (this as any).$refs.newPasswordRef.validate();
    (this as any).$refs.confirmPasswordRef.validate();

    if (
      !this.password.old_password ||
      !this.password.new_password ||
      !this.password.confirm_password
    ) {
      this.$q.notify({
        message: "All fields are required!",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
      return;
    }

    if (
      (this as any).$refs.oldPasswordRef.hasError ||
      (this as any).$refs.newPasswordRef.hasError ||
      (this as any).$refs.confirmPasswordRef.hasError
    ) {
      return;
    }
    CustomerService.customerChangePasswordCreate(this.password)
      .then((res: any) => {
        this.$q.notify({
          message: `${res.message}`,
          color: res.message === this.passwordChanged ? "green" : "red",
          position: "top",
          classes: "text-body1",
        });

        if (res.message === this.passwordChanged) {
          this.password.confirm_password = "";
          this.password.new_password = "";
          this.password.old_password = "";
          this.dialogChangePassword = false;
        }
      })
      .catch((error: Error) => {
        this.$q.notify({
          message: "Something went wrong!",
          color: "red",
          position: "top",
          icon: "error",
        });
      });
  }
}
export default toNative(UpdatePassword);
</script>
