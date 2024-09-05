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
                <div class="text-h6 text-center text-secondary">Login</div>
              </q-card-section>
              <q-separator class="q-mb-md" />
              <q-card-section>
                <label class="text-weight-medium q-px-md">Email</label>
                <q-input
                  v-model="username"
                  type="text"
                  outlined
                  class="q-px-md q-mb-md"
                  ref="emailRef"
                  name="username"
                  :rules="[
                    emailValidator,
                    (val: any) => !!val || 'Field is required',
                  ]"
                  lazy-rules
                />
                <label class="text-weight-medium q-px-md">Password</label>
                <q-input
                  v-model="password"
                  outlined
                  name="password"
                  class="q-px-md q-mb-md"
                  ref="passwordRef"
                  :rules="[(val: any) => !!val || 'Field is required']"
                  :type="isPwdRepeat ? 'password' : 'text'"
                  @keydown.enter.prevent="login"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwdRepeat ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwdRepeat = !isPwdRepeat"
                    />
                  </template>
                </q-input>
                <div class="text-right q-px-md q-mb-md">
                  <q-btn
                    class="text-right text-black full-width"
                    square
                    unelevated
                    color="primary"
                    :loading="loading"
                    icon="login"
                    @click.prevent="login()"
                    size="md"
                    padding="md"
                    label="Login"
                  />
                </div>
                <div class="q-mb-md">
                  <q-btn
                    color="secondary"
                    label="Forgot Password"
                    flat
                    to="/account/forgot-password"
                  />
                </div>
                <div class="q-px-md q-mb-md">
                  Don't have an account?
                  <q-btn color="secondary" flat :to="`/account/register`"
                    >Sign Up</q-btn
                  >
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
import { Component, Vue, Setup, toNative } from "vue-facing-decorator";
// const meta = definePageMeta({
//     middleware: ['auth']
// })
@Component({
  name: "AuthenticationPage",
  template: "default",
  components: {},
  // mixins: [meta]
})
export class AuthenticationPage extends Vue {
  username = "";
  password = "";
  loading = false;
  isPwdRepeat = true;

  // @ts-ignore
  @Setup((props, ctx) => useAuth())
  // @ts-ignore
  authenticationBackend = useAuth();

  // @ts-ignore
  @Setup((props, ctx) =>
    // @ts-ignore
    useHead({
      title: "Janal | Login",
    })
  )
  // @ts-ignore
  pageHead!: useHead;

  mounted() {}

  async login() {
    (this as any).$refs.emailRef.validate();
    (this as any).$refs.passwordRef.validate();
    if (
      (this as any).$refs.emailRef.hasError ||
      (this as any).$refs.passwordRef.hasError
    ) {
      return;
    }

    this.loading = true;
    try {
      let res = await this.authenticationBackend.signIn(
        { email: this.username, password: this.password },
        { callbackUrl: "/redirect" } // Where the user will be redirected after a successful login
      );
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.$q.notify({
        message:
          "The email address or password you provided is incorrect. Please verify your details and try again.",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
    }
  }
  guestCheckout() {
    this.$router.push("/checkout/address-shipping/");
  }

  emailValidator(value: any) {
    if (!value) {
      value = this.username;
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
export default toNative(AuthenticationPage);
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
