import { reactive } from 'vue';
import { PublicCategoryList } from '@/openapi';

interface CategoryState {
    categories: PublicCategoryList[];
  }
  
  const state = reactive<CategoryState>({
    categories: []
  });
  const addAllCategories = (item: any): void => {
    state.categories=item
  };

  export { state,addAllCategories};