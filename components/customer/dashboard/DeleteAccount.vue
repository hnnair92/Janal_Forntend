<template>
  <div>
    <q-btn color="red" @click="dialogdeleteUserAccount = true"
      >Delete Account</q-btn
    >
    <q-dialog v-model="dialogdeleteUserAccount">
      <q-card class="q-pa-md">
        <div class="text-h4 text-red">
          <p class="d-flex row">
            <q-icon name="warning" color="red" size="lg" class="q-mr-sm" />
            <span> Delete Account </span>
          </p>
        </div>
        <span class="text-caption text-red">
          Please note that this action is irreverisble.</span
        >
        <p class="text-weight-medium q-mt-md">Enter Your Password</p>
        <q-input
          v-model="deleteUserAccount.password"
          outlined
          :type="isPwd ? 'password' : 'text'"
          style="max-width: 550px; width: 450px"
          class="q-my-sm"
          lazy-rules
          :rules="[(val: any) => !!val || 'This field is required']"
          ref="passwordRef"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <p class="text-weight-medium q-mt-md">Confirm Your Password</p>
        <q-input
          v-model="deleteUserAccount.confirm_password"
          outlined
          :type="isPwdRepeat ? 'password' : 'text'"
          style="max-width: 550px; width: 450px"
          class="q-my-sm"
          lazy-rules
          :rules="[
            (val: any) => !!val || 'This field is required',
            (val: any) =>
              val === deleteUserAccount.password ||
              'Both passwords need to match',
          ]"
          ref="confirmPasswordRef"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwdRepeat ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwdRepeat = !isPwdRepeat"
            />
          </template>
        </q-input>

        <p class="text-weight-medium q-mt-md">Reason For Deletion (Optional)</p>
        <q-input
          v-model="deleteUserAccount.reason_for_deletion"
          outlined
          type="text"
          autogrow
          style="max-width: 550px; width: 450px"
          class="q-my-sm"
          lazy-rules
          :rules="[
            (val: any) =>
              val?.length <= 500 || 'Text must not exceed 500 characters',
          ]"
          ref="reasonForDeletionRef"
        />

        <q-card-actions align="right">
          <q-btn
            color="secondary"
            label="Cancel"
            outline
            @click="closeDialogdeleteUserAccount"
          />
          <q-btn
            color="red"
            label="Proceed"
            :disable="disableProceed"
            @click="validateFields"
          >
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogFinalConfirmation">
      <q-card class="q-pa-sm" style="width: 480px" v-if="!deleting">
        <q-card-section>
          <div class="text-h5 text-red">
            <p>Warning - Final Confirmation</p>
          </div>
          <div>
            <p class="text-weight-bold">
              Are you sure you want to delete this account? This action cannot
              be undone.
            </p>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            outline
            label="Cancel"
            color="secondary"
            @click="closeDialogFinalConfirmation"
          />
          <q-btn label="Delete my Account" color="red" @click="deleteAccount" />
        </q-card-actions>
      </q-card>

      <q-card class="q-pa-sm" style="width: 480px" v-else>
        <q-card-section>
          <q-spinner color="primary" size="3em" />
          <div>
            <p class="text-weight-bold">Deleting Your Account!</p>
            <p class="text-weight-bold">
              You will be redirected to login page.
            </p>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogDeletingUserAccount">
      <q-card style="max-width: 550px; width: 400px" class="q-pa-md">
        <q-card-section class="d-flex row justify-center">
          <p class="text-weight-bold text-red text-h5">Deleting your account</p>
          <p>You will be redirected to the login page.</p>
        </q-card-section>
        <q-card-section class="d-flex row justify-center">
          <q-spinner-ios color="red" size="3em" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { CustomerService, DeleteUserAccount } from "@/openapi/";

@Component({
  name: "DeleteAccount",
})
export class DeleteAccount extends Vue {
  dialogdeleteUserAccount: boolean = false;
  dialogFinalConfirmation: boolean = false;
  deleteUserAccount: DeleteUserAccount = <DeleteUserAccount>{
    reason_for_deletion: "",
  };

  isPwd: boolean = true;
  isPwdRepeat: boolean = true;
  deleting: boolean = false;
  dialogDeletingUserAccount: boolean = false;

  clearAllFields() {
    this.deleteUserAccount = {
      password: "",
      confirm_password: "",
      reason_for_deletion: "",
    };
    this.isPwd = true;
    this.isPwdRepeat = true;
  }

  closeDialogdeleteUserAccount() {
    this.dialogdeleteUserAccount = false;
    this.clearAllFields();
  }

  closeDialogFinalConfirmation() {
    this.dialogFinalConfirmation = false;
    this.dialogdeleteUserAccount = false;
    this.clearAllFields();
  }

  get disableProceed() {
    if (
      this.deleteUserAccount.password &&
      this.deleteUserAccount.confirm_password &&
      !(this as any).$refs.passwordRef.hasError &&
      !(this as any).$refs.confirmPasswordRef.hasError &&
      !(this as any).$refs.reasonForDeletionRef.hasError
    ) {
      return false;
    }
    return true;
  }

  validateFields() {
    (this as any).$refs.passwordRef.validate();
    (this as any).$refs.confirmPasswordRef.validate();
    (this as any).$refs.reasonForDeletionRef.validate();

    if (
      !(this as any).$refs.passwordRef.hasError ||
      !(this as any).$refs.confirmPasswordRef.hasError ||
      !(this as any).$refs.reasonForDeletionRef.hasError
    ) {
      this.dialogdeleteUserAccount = false;
      this.dialogFinalConfirmation = true;
    }
  }

  deleteAccount() {
    const accountDeleted: string = "Account Deleted!";
    CustomerService.customerDeleteAccountDelete(this.deleteUserAccount).then(
      (res: any) => {
        if (res.message !== accountDeleted) {
          this.dialogFinalConfirmation = false;
          this.dialogdeleteUserAccount = true;

          this.$q.notify({
            message: `${res.message}`,
            color: "red",
            position: "top",
            classes: "text-body1",
          });
        }

        if (res.message === accountDeleted) {
          this.dialogFinalConfirmation = false;
          this.dialogDeletingUserAccount = true;

          setTimeout(() => {
            this.$q.notify({
              message: "Your account has been successfully deleted!",
              color: "green",
              position: "top",
              classes: "text-body1",
            });
            this.$router.push(`/account/login`);
          }, 2000);
        }
      }
    );
  }
}
export default toNative(DeleteAccount);
</script>
