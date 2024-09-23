<template>
  <q-page class="q-pa-sm">
    <div class="q-d-flex q-flex-grow-1 row wrap justify-center">
      <div
        class="col-xl-10 col-md-10 col-sm-10 col-xs-12 q-pa-md q-d-flex q-flex-grow-1 column"
      >
        <div class="q-d-flex q-flex-grow-1">
          <div class="text-h4">Checkout</div>
          <q-separator class="q-my-md" />
        </div>
        <div class="q-d-flex q-flex-grow-1 justify-center row">
          <div
            class="col-md-8 col-lg-8 col-xl-8 col-sm-12 col-xs-12 q-d-flex q-flex-grow-1"
          >
            <q-card class="q-pa-md">
              <q-card-section>
                <div class="text-h6">Login to continue</div>
              </q-card-section>
              <q-separator class="q-mb-md" />
              <q-card-section>
                <label class="text-weight-medium q-px-md">Email</label>
                <q-input
                  v-model="username"
                  type="text"
                  outlined
                  class="q-px-md q-mb-md"
                  lazy-rules
                  name="username"
                  :rules="[(val) => !!val || 'This field is required']"
                />
                <label class="text-weight-medium q-px-md">Password</label>
                <q-input
                  v-model="password"
                  outlined
                  name="password"
                  class="q-px-md q-mb-md"
                  :type="isPwd ? 'password' : 'text'"
                  @keydown.enter.prevent="login()"
                  lazy-rules
                  :rules="[(val) => !!val || 'This field is required']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <div class="text-right q-px-md q-mb-md">
                  <q-btn
                    class="text-right text-black full-width"
                    square
                    unelevated
                    color="primary"
                    icon="login"
                    @click.prevent="login()"
                    size="md"
                    padding="md"
                    label="Login"
                    :loading="loading"
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
                  <q-btn color="secondary" flat to="/account/register"
                    >Sign Up</q-btn
                  >
                </div>
              </q-card-section>
              <h6><span>OR</span></h6>
              <q-card-section>
                <q-btn
                  class="text-right text-white full-width"
                  square
                  unelevated
                  color="secondary"
                  icon="person"
                  @click.prevent="guestCheckout()"
                  size="md"
                  padding="md"
                  label="Guest Checkout"
                />
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
import { state as cartItems } from "@/store/cart";
import { OpenAPI, Order, PublicService } from "@/openapi";
@Component({
  name: "CheckoutPage",
  template: "default",
  components: {},
})
export class CheckoutPage extends Vue {
  username = "";
  password = "";

  loading = false;
  isPwd = true;

  get cartItems() {
    return cartItems;
  }
  // @ts-ignore
  @Setup((props, ctx) =>
    useHead({
      title: "Janal | Checkout",
    })
  )
  // @ts-ignore
  pageHead!: useHead;

  // @ts-ignore
  @Setup((props, ctx) => useAuth())
  // @ts-ignore
  authenticationBackend = useAuth();

  // @ts-ignore
  @Setup((props, ctx) => useAuthState())
  // @ts-ignore
  useAuthBackend = useAuthState();

  mounted() {
    if (
      this.authenticationBackend &&
      this.authenticationBackend.status.value == "authenticated" &&
      this.authenticationBackend.data &&
      this.authenticationBackend.data.value
    ) {
      this.guestCheckout();
    }
  }

  async login() {
    if (!this.username || !this.password) {
      this.$q.notify({
        message: "Please enter email and password",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
      return;
    }
    this.loading = true;
    try {
      // ts-ignore
      const { signIn, signOut } = useAuth();

      await signIn(
        { email: this.username, password: this.password },
        { redirect: false }
        // Where the user will be redirected after a successful login
      );
      const { token, status } = useAuth();
      console.log(token.value, status.value);
      const { setToken } = useAuthState();

      if (token.value) {
        const accessToken = token.value.split("Bearer ")[1];
        OpenAPI.TOKEN = accessToken;
        this.guestCheckout();
      }

      // this.loading = false;
      // this.guestCheckout();
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
    this.$router.push(`/checkout/flow/`);
  }
  // this.$router.push("/checkout/address-shipping/")
}

export default toNative(CheckoutPage);
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
