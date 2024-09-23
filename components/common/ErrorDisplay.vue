<template>
  <q-banner v-if="hasErrors" color="negative" class="text-red">
    <div v-for="(messages, key) in errorMessages" :key="key">
      <span v-if="typeof messages === 'string'">
        <strong>{{ key }}:</strong> {{ messages }}
      </span>
      <span v-else-if="Array.isArray(messages)">
        <strong>{{ key }}: </strong>
        <span v-if="messages.length === 1">
          {{ messages[0] }}
          <!-- Display single item inline -->
        </span>
        <span v-else>
          <ul>
            <li v-for="(item, idx) in messages" :key="idx">{{ item }}</li>
          </ul>
        </span>
      </span>
      <span v-else-if="typeof messages === 'object'">
        <span v-for="(value, nestedKey) in messages" :key="nestedKey">
          <strong>{{ nestedKey }}:</strong>
          <ul>
            <li v-for="(item, idx) in value" :key="idx">{{ item }}</li>
          </ul>
        </span>
      </span>
    </div>
  </q-banner>
</template>

<script>
export default {
  props: {
    errorResponse: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    errorMessages() {
      return this.errorResponse || {};
    },
    hasErrors() {
      return Object.keys(this.errorMessages).length > 0;
    },
  },
};
</script>

<style scoped></style>
