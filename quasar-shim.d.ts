import { useQuasar } from "quasar";

declare module 'vue/types/quasar' {
    interface Vue {
      $q: useQuasar
    }
  }