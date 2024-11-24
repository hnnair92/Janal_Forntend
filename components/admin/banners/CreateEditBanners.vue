<template>
  <q-page class="q-pa-md">
    <q-card class="mt-2 q-pa-md">
      <q-card-section class="q-d-flex row q-flex-grow-1">
        <div class="text-h6 col">{{ label }} Banner</div>
        <div class="col text-right">
          <q-toggle
            v-model="promotion.is_enabled"
            color="green"
            :label="promotion.is_enabled ? 'Enabled' : 'Disabled'"
          />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div v-if="promotion.uuid">
          <label class="text-weight-medium q-pb-md">Campaign ID</label>
          <q-input
            v-model="promotion.uuid"
            outlined
            type="text"
            dense
            class="q-mb-md"
            readonly
          ></q-input>
        </div>
        <label class="text-weight-medium q-pb-md">Banner Name</label>
        <q-input
          v-model="promotion.name"
          outlined
          type="text"
          dense
          class="q-mb-md"
        ></q-input>

        <label class="text-weight-medium q-pb-md">Description</label>
        <q-input
          v-model="promotion.description"
          outlined
          type="text"
          dense
          class="q-mb-md"
        ></q-input>

        <div class="q-d-flex q-flex-grow-1 row">
          <div class="col q-px-sm">
            <label class="text-weight-medium q-pb-md"
              >Start Date (Optional)</label
            >
            <q-input
              filled
              v-model="promotion.start_date"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                    ref="qDateProxy"
                  >
                    <q-date
                      v-model="promotion.start_date"
                      mask="YYYY-MM-DD"
                      @input="() => $refs.qDateProxy.hide()"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col q-px-sm">
            <label class="text-weight-medium q-pb-md"
              >End Date (Optional)</label
            >
            <q-input
              filled
              v-model="promotion.end_date"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                    ref="qDateProxy1"
                  >
                    <q-date
                      v-model="promotion.end_date"
                      mask="YYYY-MM-DD"
                      today-btn
                      @input="() => $refs.qDateProxy.hide()"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <div class="q-d-flex flex-grow-1 column">
          <div class="text-h6">Banner Images</div>
          <q-separator></q-separator>
        </div>
        <div class="q-d-flex flex-grow-1 row q-my-md">
          <div class="col">
            <p class="text-subtitle2">Banner Image(2400 x 500)</p>
            <CommonImageUploader
              @file-uploaded="changeFile($event, 'banner')"
              :imageId.sync="imageId"
              @file-deleted="deleteImage($event, 'banner')"
            />
          </div>

          <div class="col">
            <p class="text-subtitle2">Banner Image - Mobile (300 x 250)</p>
            <CommonImageUploader
              @file-uploaded="changeFile($event, 'mobile')"
              :imageId.sync="mobileImageId"
              @file-deleted="deleteImage($event, 'mobile')"
            />
          </div>

          <div class="col">
            <p class="text-subtitle2">
              Banner Image - Website Pages (2400 x 150)
            </p>
            <CommonImageUploader
              @file-uploaded="changeFile($event, 'banner_long')"
              :imageId.sync="largeBannerImageId"
              @file-deleted="deleteImage($event, 'banner_long')"
            />
          </div>
        </div>

        <!-- <q-file v-model="promotion.image" accept="image/*" label="Select an image"></q-file> -->
      </q-card-section>

      <q-card-actions class="q-px-md">
        <div v-if="promotion.id">
          <q-btn
            icon="delete"
            color="red"
            size="md"
            label="Delete"
            @click="deleteItem(promotion)"
            unelevated
          />
        </div>
        <q-space></q-space>
        <q-btn color="grey" @click="routeHome" size="md" unelevated
          >Cancel</q-btn
        >
        <q-btn
          type="button"
          @click="saveData"
          color="primary"
          size="md"
          unelevated
          :loading="loading"
          >Save</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import {
  CampaignsService,
  Promotion,
  UploadedImages,
  ProductsService,
  Product,
  AdminBannerManagementService,
} from "@/openapi";
import { Component, Vue, Prop, toNative } from "vue-facing-decorator";
@Component({
  name: "CreateEditPromotions",
})
export class CreateEditBanners extends Vue {
  @Prop({ default: false }) createdMode: boolean;
  @Prop() promotionId: any;
  loading = false;
  label = "Create";
  promotion: Promotion = <Promotion>{ is_enabled: true };
  productList: Array<Product> = [];
  editActive = false;

  get imageId() {
    if (this.promotion && this.promotion.banner_image) {
      return this.promotion.banner_image.id;
    }
    return undefined;
  }

  get mobileImageId() {
    if (this.promotion && this.promotion.banner_image_mobile) {
      return this.promotion.banner_image_mobile.id;
    }
    return undefined;
  }

  get largeBannerImageId() {
    if (this.promotion && this.promotion.banner_image_long) {
      return this.promotion.banner_image_long.id;
    }
    return undefined;
  }

  changeFile(file: UploadedImages, image_type: string) {
    if (image_type == "banner") {
      this.promotion.banner_image = file;
    }
    if (image_type == "banner_long") {
      this.promotion.banner_image_long = file;
    }

    if (image_type == "mobile") {
      this.promotion.banner_image_mobile = file;
    }

    if (this.promotion.id) {
      this.saveData();
    }
  }
  mounted() {
    if (!this.createdMode) {
      this.label = "Edit";
    }

    if (this.promotionId) {
      this.loadData();
    }
  }

  saveData() {
    if (this.promotion.id) {
      this.loading = true;
      this.promotion.discount_percentage = "0.00";
      AdminBannerManagementService.adminBannersUpdate(
        this.promotion.id + "",
        this.promotion
      )
        .then((result: Promotion) => {
          this.promotion = result;
          this.$q.notify({
            message: "Banner Updated",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
          this.$router.push(`/pages-admin/banners/${result.id}/edit`);
        })
        .catch(() => {
          this.$q.notify({
            message: "Failed to save changes",
            color: "red",
            position: "top",
            classes: "text-body1",
          });
        })
        .finally(() => (this.loading = false));
    } else if (!this.promotion.id && this.promotion.name) {
      this.promotion.permanent_banner = true;
      this.promotion.discount_percentage = "0.00";
      AdminBannerManagementService.adminBannersCreate(this.promotion)
        .then((res: Promotion) => {
          this.$q.notify({
            message: "Banner Created",
            color: "green",
            position: "top",
            classes: "text-body1",
          });
          this.$router.push(`/pages-admin/banners/`);
        })
        .catch(() => {
          this.$q.notify({
            message: "Failed to save changes",
            color: "red",
            position: "top",
            classes: "text-body1",
          });
        })
        .finally(() => (this.loading = false));
    } else {
      this.$q.notify({
        message: "Banner needs a name and at least one photo",
        color: "red",
        position: "top",
        classes: "text-body1",
      });
    }
  }
  loadData() {
    this.$q.loading.show();
    AdminBannerManagementService.adminBannersRead(this.promotionId)
      .then((res: Promotion) => (this.promotion = res))
      .finally(() => {
        this.$q.loading.hide();
      });
  }

  deleteItem(item: Promotion) {
    if (item.id) {
      AdminBannerManagementService.adminBannersDelete(item.id + "").then(() => {
        this.routeHome();
      });
    }
  }
  deleteImage(id: number, image_type: string) {
    let changes = false;
    if (this.promotion.banner_image && image_type == "banner") {
      this.promotion.banner_image = undefined;
      changes = true;
    }
    if (image_type == "banner_long") {
      this.promotion.banner_image_long = undefined;
      changes = true;
    }

    if (image_type == "mobile") {
      this.promotion.banner_image_mobile = undefined;
      changes = true;
    }

    if (changes && this.promotion.id) {
      this.saveData();
    }
  }
  routeHome() {
    (this as any).$router.push("/pages-admin/banners/");
  }
}
export default toNative(CreateEditBanners);
</script>

<style scoped></style>
