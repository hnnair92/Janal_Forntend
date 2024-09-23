<template>
  <q-dialog v-model="isOpenLocal" persistent aria-modal>
    <q-card>
      <q-card-section>
        <div class="text-bold">Confirm Delete!</div>
        <p class="text-body1 q-py-sm">
          Are you sure you want to delete this item?
        </p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" @click="close" color="grey" flat />
        <q-btn
          label="Delete"
          unelevated
          @click="confirmDelete"
          color="negative"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isOpenLocal: this.isOpen,
    };
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(newVal) {
        this.isOpenLocal = newVal;
      },
    },
  },
  methods: {
    close() {
      this.$emit("update:isOpen", false);
    },
    confirmDelete() {
      this.$emit("confirm");
      this.close();
    },
  },
};
</script>

<style scoped></style>
