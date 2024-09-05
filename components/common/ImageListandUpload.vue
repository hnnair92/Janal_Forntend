<template>
  <div class="q-d-flex q-flex-grow-1">
    <div class="full-width row">
      <div class="q-mr-md" v-for="image in imageList">
        <q-card class="upload-card" flat bordered>
          <q-card-section class="q-pa-none">
            <q-img :src="image.large_image ?? undefined" class="thumbnail">
            </q-img>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              round
              class="q-ma-none"
              icon="delete"
              color="red"
              @click="deleteItem(image)"
            />
            <q-btn
              round
              class="q-ma-none"
              icon="edit"
              color="primary"
              @click="editItem(image)"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="q-d-flex">
        <q-card
          class="upload-card thumbnail text-h6 justify-center items-center"
          @click="openFileInput"
        >
          <q-icon name="upload"></q-icon>
          <span>Upload Image</span>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ImagesService, UploadedImages } from "@/openapi";
import { Component, Vue, Prop, Emit, toNative } from "vue-facing-decorator";
@Component({
  emits: ["file-updates", "file-deleted"],
})
export class ImageListUpload extends Vue {
  // @ts-ignore
  @Prop({ default: [] }) imageList: Array<UploadedImages>;
  activeImage: UploadedImages = <UploadedImages>{};
  openFileInput() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = this.saveImage;
    input.click();
  }
  saveImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    const formData = new FormData();
    if (file) {
      // @ts-ignore
      formData.append("large_image", file);
      if (this.activeImage.id) {
        formData.append("id", this.activeImage.id.toString());
        // @ts-ignore
        ImagesService.imagesUpdate(this.activeImage.id, formData).then(
          (result: UploadedImages) => {
            this.$emit("file-updates");
          }
        );
      } else {
        // @ts-ignore
        ImagesService.imagesCreate(formData).then((result: UploadedImages) => {
          this.$emit("file-updates", result);
        });
      }
    }
  }
  editItem(image: UploadedImages) {
    this.activeImage = image;
    this.openFileInput();
  }

  deleteItem(image: UploadedImages) {
    if (image.id) {
      ImagesService.imagesDelete(image.id).then((res) => {
        this.$emit("file-deleted", image.id);
      });
    }
  }
}
export default toNative(ImageListUpload);
</script>
<style>
.upload-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.thumbnail {
  height: 250px;
  width: 250px;
}
</style>
