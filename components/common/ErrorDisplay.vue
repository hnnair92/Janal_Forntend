<template>
  <div v-if="errors">
    <ul>
      <li
        class="text-red"
        v-for="(message, fieldName) in formattedErrors"
        :key="fieldName"
      >
        {{ fieldName }}: {{ message.join(", ") }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-facing-decorator";

@Component
export default class ErrorDisplay extends Vue {
  @Prop({ type: Object, default: () => null }) readonly errors!: Record<
    string,
    string[]
  > | null;

  get formattedErrors(): Record<string, string[]> {
    if (this.errors && typeof this.errors === "object") {
      return this.errors;
    }
    return {};
  }
}
</script>

<style scoped>
.error-display {
  color: red;
  background-color: #fdd;
  padding: 10px;
  border-radius: 4px;
}
</style>
