<template>
  <div class="q-d-flex q-flex-grow-1 q-pa-sm">
    <div class="text-h5 header">Categories</div>
    <div class="row q-flex-grow-1 wrap" v-if="categoryList">
      <div
        class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-xs-12 q-pa-sm"
        v-for="cat in categoryStateItems"
      >
        <q-card @click.prevent="loadProduct(cat.name)">
          <img
            :src="cat.images[0].large_image ?? undefined"
            fit="fill"
            ratio="1"
            loading="eager"
          />
          <q-card-section>
            <div class="text-subtitle1">{{ cat.name }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else class="row q-flex-grow-1 wrap">
      <div
        class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pa-sm"
        v-for="i in 4"
      >
        <q-card flat>
          <q-skeleton height="300px" square />
          <q-card-section>
            <q-skeleton type="text" class="text-subtitle1" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PublicCategoryList, ProductCategoriesService } from "@/openapi";
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";
import { state as categoryItems } from "@/store/products";

@Component({
  name: "PublicViewCategories",
})
export class PublicViewCategories extends Vue {
  categoryList: Array<PublicCategoryList> = Array<PublicCategoryList>();
  mounted() {
    // this.loadData()
  }

  loadData() {
    ProductCategoriesService.productCategoriesList(1, 100).then(
      (result: any) => {
        if (result.results) {
          this.categoryList = result.results;
        }
      }
    );
  }
  loadProduct(category_name: string) {
    this.$router.push(`/categories/${category_name.replace(" ", "_")}`);
  }
  get categoryStateItems() {
    if (!categoryItems.categories || !categoryItems.categories.results) {
      return [];
    }
    return categoryItems.categories.results;
  }
}
export default toNative(PublicViewCategories);
</script>

<style scoped>
.header {
  position: relative;
  padding-left: 3.5%;
  font-weight: 500;
}

.header::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3%;
  height: 3px;
  background-color: black;
}

.my-card {
  height: 300px;
}

.category-card {
  height: 350px;
  width: 300px;
}
</style>
