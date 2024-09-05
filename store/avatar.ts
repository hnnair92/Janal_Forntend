import { reactive } from "vue";

const state = reactive({
  initials: null,
});

const setInitials = (item: any): void => {
  state.initials = item;
};

export { state, setInitials };
