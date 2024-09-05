<template>
  <div class="row">
    <!-- Filter left panel -->
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
      <div class="q-d-flex q-flex-grow-1 q-pa-sm q-mt-md">
        <div>
          <div class="q-d-flex q-flex-grow-1 row q-mb-none q-pb-sm">
            <div class="col text-subtitle1 text-bold q-mb-none q-pb-sm">
              Filter Results
            </div>
            <div class="col text-right">
              <q-btn
                color="secondary"
                flat
                size="md"
                label="Clear"
                @click="clearFilters"
              />
            </div>
          </div>

          <q-separator />
        </div>
        <div :class="{ 'right-border-line': $q.platform.is.desktop }">
          <q-list padding>
            <q-expansion-item
              v-for="(k, v) in productFilters"
              dense
              dense-toggle
              :default-opened="$q.platform.is.desktop"
              class="q-pa-sm"
              :header-style="{ fontWeight: '500' }"
              expand-separator
              :label="formatText(v)"
            >
              <div v-for="fil in k" class="q-pl-sm">
                <q-checkbox
                  v-model="fil.selected"
                  color="secondary"
                  :label="fil.name"
                  @click.prevent="filterClicked()"
                />
              </div>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
    </div>
    <!-- Product details right panel -->
    <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12">
      <div class="q-d-flex q-pl-lg q-pt-lg q-d-flex row" v-if="categoryName">
        <div class="col-lg-8 col-xl-8 col-md-8 col-sm-12 col-xs-12">
          <p class="text-h5 text-secondary text-bold q-ma-none q-mb-sm">
            {{ categoryName.replace("_", " ") }}
          </p>

          <p v-if="totalProducts > 0">
            Showing {{ productList.length }} out of {{ totalProducts }} products
          </p>
        </div>
        <div
          class="col-lg-4 col-xl-4 col-md-4 col-sm-12 col-xs-12 row justify-end q-pr-md"
        >
          <label class="items-center q-pt-sm">Sort By&nbsp;</label>
          <q-select
            outlined
            v-model="sortBy"
            :options="sortOptions"
            option-label="label"
            class="q-mb-md"
            @input-value="getAllProducts()"
            dense
            color="secondary"
            option-value="value"
            emit-value
            map-options
          />
        </div>
      </div>
      <q-separator></q-separator>
      <div class="q-pa-md q-d-flex q-flex-grow-1 column" v-if="!initLoading">
        <!-- Product cards -->
        <div class="q-flex-grow-1" v-if="productList && productList.length">
          <div class="q-flex-grow-1 row wrap">
            <div
              class="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-6"
              v-for="product_fabrics in productList"
              :key="`fabric-${product_fabrics.id}`"
            >
              <ProductsCard :product.sync="product_fabrics"></ProductsCard>
            </div>
          </div>
          <div
            class="q-flex-grow-1 text-center q-mt-md"
            v-intersection="loadMore"
          >
            <q-btn
              icon="refresh"
              color="secondary"
              :loading="loading"
              outline
              label="Load More Items"
              v-if="next"
              size="md"
            />
            <div v-else>End of results</div>
          </div>
        </div>

        <div class="row q-flex-grow-1 justify-center" v-else>
          <q-img
            src="/no-item-found-here.png"
            alt="No Items Found"
            width="25vw"
            fit="contain"
          />
        </div>
      </div>
      <!-- Skeleton loader-->
      <div class="q-pa-md q-d-flex q-flex-grow-1 row" v-else>
        <div
          class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12 q-pa-sm"
          v-for="i in 10"
        >
          <q-card flat>
            <q-skeleton height="300px" square />
            <q-card-section>
              <q-skeleton type="text" class="text-subtitle1" />
              <q-skeleton type="text" width="50%" class="text-subtitle1" />
              <q-skeleton type="text" class="text-caption" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  PublicProductFabrics,
  PublicService,
  FilterOptionsService,
} from "@/openapi";
import { Component, Vue, Watch, Prop, toNative } from "vue-facing-decorator";
import ProductsCard from "@/components/common/products/ProductsCard.vue";

@Component({
  name: "PublicProductList",
  components: { ProductsCard },
})
export class PublicProductList extends Vue {
  @Prop({ default: "" }) categoryName: string;
  totalProducts = 0;
  categorySelected = [];
  categoryId: any = "";
  loading = false;
  initLoading = false;
  productList: Array<PublicProductFabrics> = Array<PublicProductFabrics>();
  productFilters: any = [];
  next = "";
  pagination = {
    rowsPerPage: 20,
    page: 1,
    rowsNumber: 0,
  };
  sortBy = "price_low_high";
  sortOptions = [
    {
      label: "Most Popular",
      value: "most_popular",
    },
    {
      label: "Newest Models",
      value: "new_models",
    },
    {
      label: "Price (low to high)",
      value: "price_low_high",
    },
    {
      label: "Price (high to low)",
      value: "price_high_low",
    },
    {
      label: "Name Ascending",
      value: "name_asc",
    },
    {
      label: "Name Descending",
      value: "name_desc",
    },
  ];

  mounted() {
    let categoryQuery = this.$route.query.categories;
    if (categoryQuery && typeof categoryQuery === "string") {
      this.categoryId = categoryQuery;
    }
    this.initLoading = true;
    this.getAllFilters();
    this.getAllProducts();
  }
  getAllFilters() {
    FilterOptionsService.filterOptionsList().then((result: any) => {
      if (result && result.filters) {
        this.productFilters = result.filters;
        this.setFilterDefaultValues();
      }
    });
  }

  formatText(t: any) {
    return t.replace("_", " ").toUpperCase();
  }

  paginationUpdate(action: string) {
    if (action === "fetch_more") {
      this.pagination.page += 1;
      this.getAllProducts();
    }
  }
  @Watch("sortBy")
  sortChange() {
    this.pagination.page = 1;
    this.getAllProducts();
  }

  getAllProducts() {
    this.loading = true;
    const queries = { ...this.$route.query };
    // PublicService.publicProductsFabricsList(this.pagination.page, this.pagination.rowsPerPage, queries['categories'], queries['pricing'], queries['light_filtering'])
    PublicService.publicProductsFabricsList(
      this.pagination.page,
      this.pagination.rowsPerPage,
      this.$route.params.slug,
      { ...this.$route.query },
      this.sortBy
    )
      .then((res: any) => {
        if (this.productList.length > 0 && this.pagination.page != 1) {
          this.productList.push(...res.results);
        } else {
          this.productList = res.results;
        }
        if (res.count) {
          this.totalProducts = res.count;
        }

        this.next = res.next;
      })
      .finally(() => {
        this.loading = false;
        this.initLoading = false;
      });
  }

  loadMore(entry: any) {
    if (this.next && entry.isIntersecting) {
      this.pagination.page += 1;
      this.getAllProducts();
    }
  }

  isKeyInUrl(query: any, key: string) {
    const lookupKey = key.toString();
    if (typeof query === "object" && query.length) {
      return query.indexOf(lookupKey) != -1;
    } else if (typeof query === "string") {
      return query == lookupKey;
    }
    return false;
  }

  setFilterDefaultValues() {
    if (this.productFilters) {
      const queries = { ...this.$route.query };

      for (const [key, value] of Object.entries(this.productFilters)) {
        const foundInQuery = queries[key];

        // @ts-ignore
        for (let item of value) {
          if (this.isKeyInUrl(foundInQuery, item.id)) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        }
      }
    }
  }

  @Watch("$route")
  routeChanges() {
    this.pagination.page = 1;
    this.pagination.rowsPerPage = 10;
    this.productList = [];
    this.getAllProducts();
  }

  filterClicked() {
    let queries: any[] = [];
    for (const [key, value] of Object.entries(this.productFilters)) {
      // @ts-ignore
      queries[key] = [];
      // @ts-ignore
      for (let item of value) {
        if (item.selected) {
          // @ts-ignore
          queries[key].push(item.id);
        }
      }
    }

    if (queries) {
      // @ts-ignore
      // Create an array of key-value pairs
      const queryParamsArray = [];

      for (const [k, v] of Object.entries(queries)) {
        if (Array.isArray(v)) {
          // If the value is an array, create separate key-value pairs for each element
          for (const item of v) {
            queryParamsArray.push([k, item]);
          }
        } else {
          // If the value is not an array, create a single key-value pair
          queryParamsArray.push([k, v]);
        }
      }

      // Convert the array into a URLSearchParams object
      const urlSearchParams = new URLSearchParams(queryParamsArray);

      this.$router.push(`?${urlSearchParams.toString()}`);
      // this.routeChanges();
    }
  }
  clearFilters() {
    let queries: any[] = [];
    for (const [key, value] of Object.entries(this.productFilters)) {
      // @ts-ignore
      queries[key] = [];
      // @ts-ignore
      for (let item of value) {
        item.selected = false;
      }
    }
    this.filterClicked();
  }
}
export default toNative(PublicProductList);
</script>

<style scoped>
.right-border-line {
  border-right: 1px solid #6c6c6c;
}
</style>
