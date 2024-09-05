<template>
  <div class="q-d-flex q-flex-grow-1  q-pa-md">
    <div class="full-width row">
      <div class="q-d-flex">
        <q-card class="upload-card thumbnail" v-if="uploadedImage.id">
          <q-img :src="uploadedImage.large_image ?? undefined" fit="fill">
          </q-img>
          <q-card-actions align="right">
            <q-btn round icon="delete" color="red" @click="deleteItem()" />
            <q-btn round icon="edit" color="primary" @click="openFileInput" />
          </q-card-actions>
        </q-card>
        <q-card class="upload-card thumbnail" @click="openFileInput" v-else>
          <q-icon name="upload"></q-icon>
          <span>Upload File</span>
        </q-card>
        <input type="file" ref="fileInput" style="display: none;" @change="handleFileChange">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ImagesService, UploadedImages } from '@/openapi';
import { defineComponent, ref, onMounted, watch } from 'vue';

export default defineComponent({
  name: 'ImageUploader',
  props: {
    imageId: Number
  },
  setup(props, { emit }) {

    const thumbnail = ref<string | null>(null);
    const uploadedImage = ref<UploadedImages>(<UploadedImages>{});

    const openFileInput = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = handleFileChange;
      input.click();
    };
    onMounted(() => {
      getImageFromServer();
    });

    const handleFileChange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        generateThumbnail(file);
        const formData = new FormData();

        // @ts-ignore
        formData.append('large_image', file);

        if (uploadedImage.value.id) {
          // @ts-ignore
          ImagesService.imagesPartialUpdate(uploadedImage.value.id, formData).then((result: UploadedImages) => {
            uploadedImage.value = result;
            emit('file-uploaded', result);
          })
        } else {
          // @ts-ignore
          ImagesService.imagesCreate(formData).then((result: UploadedImages) => {
            uploadedImage.value = result;
            emit('file-uploaded', result);
          })
        }

        // emit('file-changed', file);
      }
    };

    const generateThumbnail = (file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        thumbnail.value = event.target?.result as string;
      };

      reader.readAsDataURL(file);
    };
    const exposeThumbnail = () => thumbnail.value;

    watch(() => props.imageId, async (newImageId) => {
      getImageFromServer()
    })
    const getImageFromServer = async () => {

      if (props.imageId) {
        ImagesService.imagesRead(props.imageId).then((result: UploadedImages) => {
          uploadedImage.value = result;
        })
      } else {
        uploadedImage.value = <UploadedImages>{}
      }
    }

    const deleteItem = () => {
      if (uploadedImage.value.id) {
        ImagesService.imagesDelete(uploadedImage.value.id).then(() => {
          emit('file-deleted', uploadedImage.value.id);
        })
      }

    }

    return {
      thumbnail,
      openFileInput,
      handleFileChange,
      uploadedImage,
      deleteItem,
    };
  },
});
</script>
  
<style scoped>
.upload-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.thumbnail {
  height: 250px;
  width: 250px;
}

.upload-card v-icon {
  font-size: 48px;
}

.upload-card span {
  margin-top: 10px;
  font-size: 16px;
}
</style>
  