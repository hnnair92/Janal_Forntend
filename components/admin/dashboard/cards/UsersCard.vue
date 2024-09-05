<template>
  <q-card flat bordered class="my-card q-pa-sm q-ma-sm">
    <q-card-section style="cursor: pointer" @click="allUsers">
      <q-icon name="package" />
      <div>
        <div class="text-h4 text-bold row justify-center">
          <div class="column items-center text-secondary">Users</div>
        </div>
        <div class="text-subtitle2 q-mt-sm column items-center">
          <span class="text-h6">Total</span>
          <div>
            <span class="text-h3">{{ count }}</span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <div class="row justify-between full-width">
        <div
          class="column items-center"
          style="cursor: pointer"
          @click="allUsers"
        >
          <q-btn flat class="text-subtitle2">Active</q-btn>
          <div>
            <span>{{ active }}</span>
          </div>
        </div>

        <div
          class="column items-center"
          style="cursor: pointer"
          @click="createUser"
        >
          <q-btn flat>Add New</q-btn>
          <div>
            <span><q-icon name="add_circle" size="sm" /></span>
          </div>
        </div>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { UsersService } from "@/openapi";

@Component({
  name: "UsersCard",
})
export class UsersCard extends Vue {
  serverData = null;
  count: number = 0;
  active: number = 0;

  allUsers() {
    this.$router.push(`/pages-admin/users/`);
  }

  createUser() {
    this.$router.push(`/pages-admin/users/create/`);
  }

  mounted() {
    UsersService.usersList().then((res) => {
      (this as any).serverData = res;
      // @ts-ignore
      this.count = res.count;
      // @ts-ignore
      this.active = res.results.filter((obj: anyj) => obj.is_active).length;
    });
  }
}
export default toNative(UsersCard);
</script>
