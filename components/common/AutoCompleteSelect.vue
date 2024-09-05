<template>
  <div class="q-pa-md">
    <label class="text-secondary text-subtitle2">{{ label }}</label>
    <q-select
      v-model="internalValue"
      :options="options"
      use-input
      input-debounce="300"
      @filter="filterOptions"
      @update:model-value="updateModelValue"
      clearable
      autocomplete
      hint="Type color/ fabric name to search for item"
      multiple
      use-chips
      outlined
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section> No results found </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { useRuntimeConfig } from "#app";
import axios from "axios";

const config = useRuntimeConfig();

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: () => "",
  },
});

const selectedOptions = ref([]);
const options = ref([]);
const pagination = reactive({
  next: null,
  page: 1,
  loading: false,
});
const emit = defineEmits(["update:modelValue"]);

const internalValue = ref([...props.modelValue]);

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = [...newValue];
  }
);

const searchQuery = ref("");

const apiUrl = `${config.public.baseURL}/admin/product/fabrics/`;

const fetchOptions = async (url, append = false) => {
  if (pagination.loading) return;

  pagination.loading = true;
  let accessToken = null;
  const { token, data } = useAuth();
  if (token.value) {
    accessToken = token.value.split("Bearer ")[1];
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { results, next } = response.data;
    const newOptions = results.map((option) => ({
      label: `${option.fabric_name}`,
      value: option.id,
    }));

    if (append) {
      options.value = [...options.value, ...newOptions];
    } else {
      options.value = newOptions;
    }

    pagination.next = next;
  } catch (error) {
    console.error("Error fetching options:");
  } finally {
    pagination.loading = false;
  }
};

const filterOptions = (val, update) => {
  searchQuery.value = val;
  if (val === "") {
    update();
    return;
  }
  pagination.page = 1;
  const url = `${apiUrl}?search=${val}&page=${pagination.page}&page_size=50`;
  fetchOptions(url).then(() => update());
};

const onScroll = () => {
  if (pagination.next && !pagination.loading && isNearBottom()) {
    pagination.page += 1;
    const url = `${apiUrl}?search=${searchQuery.value}&page=${pagination.page}&page_size=50`;
    fetchOptions(url, true);
  }
};

const isNearBottom = () => {
  const scrollThreshold = 100;
  return (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - scrollThreshold
  );
};

const updateModelValue = (val) => {
  emit("update:modelValue", val);
};

onMounted(async () => {
  const url = `${apiUrl}?page=${pagination.page}&page_size=50`; // Fetch the initial page
  await fetchOptions(url);
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
/* Add your custom styles here */
</style>
