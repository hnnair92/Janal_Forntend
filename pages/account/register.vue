<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 row wrap justify-center">
      <div
        class="col-xl-10 col-md-10 col-sm-10 col-xs-12 q-pa-md q-d-flex q-flex-grow-1 column"
      >
        <div class="q-d-flex q-flex-grow-1 justify-center row">
          <div
            class="col-md-8 col-lg-8 col-xl-8 col-sm-12 col-xs-12 q-d-flex q-flex-grow-1"
          >
            <q-card class="q-pa-md">
              <q-card-section>
                <div class="text-h6 text-center text-secondary">Register</div>
              </q-card-section>
              <q-separator class="q-mb-md" />
              <q-card-section v-if="!registrationSuccess">
                <label class="text-weight-medium q-px-md">Email</label>
                <q-input
                  v-model="user.email"
                  ref="emailRef"
                  :rules="[
                    emailValidator,
                    (val: any) => !!val || 'Field is required',
                  ]"
                  lazy-rules
                  type="text"
                  outlined
                  class="q-px-md q-mb-md"
                />
                <div
                  v-if="errorMessage"
                  class="text-weight-medium q-px-md text-red"
                >
                  {{ errorMessage }}
                </div>
                <div class="text-right q-px-md q-mb-md">
                  <q-btn
                    class="text-right text-black full-width"
                    square
                    unelevated
                    color="primary"
                    :loading="loading"
                    icon="how_to_reg"
                    size="md"
                    padding="md"
                    label="Register"
                    @click="registerUser"
                  />
                </div>
              </q-card-section>
              <q-card-section v-if="registrationSuccess">
                <div class="text-weight-medium q-px-md">
                  Thank you for your request! We've just sent a confirmation
                  email to the address you provided. Please check your inbox
                  shortly. If you don't see it, don't forget to check your spam
                  or junk folder.
                </div>
                <div class="text-right q-px-md q-mt-md">
                  <q-btn
                    class="text-right text-black full-width"
                    square
                    unelevated
                    color="primary"
                    icon="home"
                    size="md"
                    padding="md"
                    label="Home"
                    to="/"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  ApiError,
  IdentityService,
  UserEmail,
  UserEmailResponse,
} from "@/openapi";
import { Component, Vue, Setup, toNative } from "vue-facing-decorator";
// const meta = definePageMeta({
//     middleware: ['auth']
// })
@Component({
  name: "RegistrationPage",
  template: "default",
  components: {},
  // mixins: [meta]
})
export class RegistrationPage extends Vue {
  loading = false;
  user: UserEmail = <UserEmail>{};
  errorMessage = "";
  registrationSuccess = false;
  // @ts-ignore
  @Setup((props, ctx) =>
    useHead({
      title: "Janal | Register",
    })
  )
  // @ts-ignore
  pageHead!: useHead;

  registerUser() {
    (this as any).$refs.emailRef.validate();

    if ((this as any).$refs.emailRef.hasError) {
      return;
    }

    this.loading = true;
    this.errorMessage = "";

    IdentityService.identityAccountsRegisterEmailCreate(this.user)
      .then((res: UserEmailResponse) => {
        if (res && res.status) {
          this.registrationSuccess = true;
        }
        if (res && !res.status) {
          this.errorMessage = res.message;
        }
      })
      .catch((obj: ApiError) => {
        if (obj.status == 400 && Object.hasOwn(obj.body, "email")) {
          this.errorMessage = obj.body.email[0];
        } else {
          this.$q.notify({
            message:
              "Failed to register account! Please contact customer service",
            color: "red",
            position: "top",
            classes: "text-body1",
          });
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }

  emailValidator(value: any) {
    if (!value) {
      value = this.user.email;
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
}
export default toNative(RegistrationPage);
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
