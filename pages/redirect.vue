<template></template>

<script lang="ts">
import { Component, Vue, Setup, toNative } from "vue-facing-decorator";
@Component({
  name: "RedirectionPage",
  template: "default",
  components: {},
  // mixins: [meta]
})
export class RedirectionPage extends Vue {
  // @ts-ignore
  @Setup((props, ctx) => useAuth())
  // @ts-ignore
  authenticationBackend = useAuth();

  mounted() {
    let data: any = this.authenticationBackend.data;
    if (data.value?.groups && data.value.groups?.length) {
      if (data.value.groups.includes("Admin")) {
        // this.$router.push("/pages-admin");
        const URL = `${window.location.origin}/pages-admin`;
        window.location.replace(URL);
      } else if (data.value.groups.includes("customer")) {
        // this.$router.push("/customer");
        const URL = `${window.location.origin}/customer`;
        window.location.replace(URL);
      } else {
        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
  }
}
export default toNative(RedirectionPage);
</script>
