<template>
  <Loading :isLoading="loading"></Loading>
</template>

<script lang="ts">
import { Component, Vue, Setup, toNative } from "vue-facing-decorator";
import {
  initializeCart,
  cartAddOnsTotal,
  state as cartItems,
  cartItemTax,
  cartItemTotal,
} from "@/store/cart";
import { Order, PublicService } from "@/openapi";
import Loading from "@/components/public/Loading.vue";
@Component({
  name: "flow",
  template: "default",
  components: { Loading },
})
export class flow extends Vue {
  loading = true;
  get cartItems() {
    return cartItems;
  }
  get cartItemsTotal() {
    return cartItemTotal();
  }
  get cartItemTax() {
    return cartItemTax();
  }
  get cartAddOnsTotal() {
    return cartAddOnsTotal();
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

  mounted() {
    initializeCart();
    // const data = await this.authenticationBackend.getSession();
    // if (data && data.value) {
    //   console.log("authenticated");
    // }
    this.checkout();
    // this.$router.push("/checkout/address-shipping/")
  }
  checkout() {
    console.log("checkout", this.cartItems);
    let total: number = this.cartItemsTotal;
    let tax: number = this.cartItemTax;
    const addOnTotal: number = this.cartAddOnsTotal;
    console.log(total, tax, addOnTotal);
    if (this.cartItems && total && tax) {
      let order: Order = <Order>{
        items: this.cartItems.cartItems,
        tax: tax.toString(),
        sale_total: total.toString(),
        add_on_total: addOnTotal.toString(),
      };
      PublicService.publicOrderCreate(order).then((response: Order) => {
        this.$router.push({
          path: `/checkout/${response.uuid}/address-shipping`,
          query: { key: Date.now() },
        });
      });
    }
  }
}

export default toNative(flow);
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
