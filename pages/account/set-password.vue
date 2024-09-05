<template>
  <Loading :isLoading="loading"></Loading>
  <q-page class="q-pa-sm" v-if="!loading">
    <div
      class="q-d-flex q-flex-grow-1 column justify-center"
      v-if="identityVerified"
    >
      <div class="q-d-flex q-flex-grow-1 justify-center row">
        <div
          class="col-md-8 col-lg-8 col-xl-8 col-sm-12 col-xs-12 q-d-flex q-flex-grow-1"
        >
          <q-card class="q-pa-md">
            <q-card-section>
              <div class="text-h6 text-center text-secondary">
                Finish setting up your password
              </div>
            </q-card-section>
            <q-separator class="q-mb-md" />
            <q-card-section>
              <label class="text-weight-medium q-px-md">Password</label>
              <q-input
                v-model="password"
                ref="passwordRef"
                :type="isPwd ? 'password' : 'text'"
                outlined
                :rules="[
                  passwordValidator,
                  (val: any) => !!val || 'Field is required',
                ]"
                lazy-rules
                class="q-px-md q-mb-md"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <label class="text-weight-medium q-px-md">Repeat Password</label>
              <q-input
                v-model="passwordRepeat"
                ref="passwordRepeatRef"
                outlined
                lazy-rules
                :rules="[
                  repeatPasswordValidator,
                  (val: any) => !!val || 'Field is required',
                ]"
                :type="isPwdRepeat ? 'password' : 'text'"
                @keydown.enter.prevent="resetPasswordSubmit"
                class="q-px-md q-mb-md"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwdRepeat ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwdRepeat = !isPwdRepeat"
                  /> </template
              ></q-input>
              <div class="text-right q-px-md q-mb-md">
                <q-btn
                  class="text-right text-black full-width"
                  square
                  unelevated
                  color="primary"
                  :loading="regLoading"
                  size="md"
                  padding="md"
                  label="Set Password"
                  @click="resetPasswordSubmit"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="q-d-flex q-flex-grow-1 row wrap justify-center" v-else>
      <p>{{ invalidMessage }}</p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ApiError, IdentityService, PasswordReset } from "@/openapi";
import Loading from "@/components/public/Loading.vue";
import { Component, Vue, Setup, toNative } from "vue-facing-decorator";
// const meta = definePageMeta({
//     middleware: ['auth']
// })
@Component({
  name: "VerifyRegisterPage",
  template: "default",
  components: { Loading },
  // mixins: [meta]
})
export class VerifyRegisterPage extends Vue {
  loading = false;
  identityVerified = false;
  regLoading = false;
  isPwd = true;
  isPwdRepeat = true;
  resetPasswordRequest: PasswordReset = <PasswordReset>{};
  firstName = "";
  lastName = "";
  password = "";
  passwordRepeat = "";
  invalidMessage = "";

  // @ts-ignore
  @Setup((props, ctx) =>
    useHead({
      title: "Janal | Reset Password",
    })
  )
  // @ts-ignore
  pageHead!: useHead;

  mounted() {
    if (!this.$route.query.email || !this.$route.query.code) {
      this.$router.push("/");
    }
    this.verifyEmailCode(this.$route.query.email, this.$route.query.code);
  }
  verifyEmailCode(email: any, code: any) {
    if (!email || !code) {
      return;
    }
    this.loading = true;
    IdentityService.identityAccountsEmailVerifyList(email, code)
      .then(() => {
        this.identityVerified = true;
        this.resetPasswordRequest.email = email;
        this.resetPasswordRequest.confirmation_code = code;
      })
      .catch((error: ApiError) => {
        if (error.status == 400) {
          this.invalidMessage = error.body.error;
        }
        if (error.status == 404) {
          this.invalidMessage =
            "Invalid link! Try resetting your account again or contact our customer service center.";
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
  resetPasswordSubmit() {
    (this as any).$refs.passwordRef.validate();
    (this as any).$refs.passwordRepeatRef.validate();

    if (
      (this as any).$refs.passwordRef.hasError ||
      (this as any).$refs.passwordRepeatRef.hasError
    ) {
      return;
    }
    this.regLoading = true;
    this.resetPasswordRequest.password = this.password;
    this.resetPasswordRequest.confirm_password = this.passwordRepeat;
    IdentityService.identityAccountsUserPasswordCreate(
      this.resetPasswordRequest
    )
      .then((res: any) => {
        this.regLoading = false;
        this.$q.notify({
          message:
            "Password change successful! Please login with email and password",
          color: "green",
          position: "top",
          classes: "text-body1",
        });
        this.$router.push("/account/login");
      })
      .catch((err: ApiError) => {
        this.regLoading = false;
        if (err.status == 400) {
          this.$q.notify({
            message: "Please fill all the required fields",
            color: "red",
            position: "top",
            classes: "text-body1",
          });
        }
      });
  }
  passwordValidator(value: any) {
    if (!value) {
      value = this.password;
    }

    // Check password requirements
    if (!this.validatePasswordRequirements(this.password)) {
      return "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.";
    }

    return true;
  }
  repeatPasswordValidator(value: any) {
    if (!value) {
      value = this.passwordRepeat;
    }

    // Check if password and confirm_password match
    if (this.password !== this.passwordRepeat) {
      return "Password didn't match";
    }

    // Check password requirements
    if (!this.validatePasswordRequirements(this.password)) {
      return "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.";
    }

    return true;
  }
  validatePasswordRequirements(password: string) {
    // Check minimum length
    if (password.length < 8) {
      return false;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Check for at least one number
    if (!/\d/.test(password)) {
      return false;
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
      return false;
    }

    return true;
  }
}
export default toNative(VerifyRegisterPage);
</script>

<style scoped>
h6 {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #c0c0c0;
  line-height: 0.1em;
  margin: 10px 0 20px;
}

h6 span {
  background: #fff;
  padding: 0 10px;
}
</style>
