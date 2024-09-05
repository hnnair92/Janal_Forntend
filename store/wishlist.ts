import { CustomerService, Wishlist } from "@/openapi";
import { reactive } from "vue";

const state = reactive({
  wishlistItems: [],
  loading:false,
});



const isAuthenticated = (): boolean => {
  const {
    status,
    data,
  } = useAuth();
  if (status && status.value === 'authenticated' && data && data.value) {
    return true;
  }
  return false;
};

const addToWishlist = (item: any): void => {
  const wishlistItems = localStorage.getItem("wishlistItems");
  const getWishlistedItems =  wishlistItems ? JSON.parse(wishlistItems) : [];
  if (!getWishlistedItems || !getWishlistedItems.includes(item)) {
    // @ts-ignore
    state.wishlistItems.push(item);
  }

  if(isAuthenticated() && item){
    CustomerService.customerWishlistCreate((<Wishlist>{fabric:item}))
  }
  saveWishlist();
};


const removeFromWishlist = (item: any): void => {
  const index = state.wishlistItems.findIndex((i) => i === item);
  const itemInArray = state.wishlistItems[index]
  if (index !== -1) {
    state.wishlistItems.splice(index, 1);
  }
  if(itemInArray){
    CustomerService.customerWishlistDelete(itemInArray)
  }
  
  saveWishlist();
};

const saveWishlist = (): void => {
  localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
};

const initializeWishList = () => {
  // Retrieve the item from local storage'
let serverWishlist:any = [];

if(isAuthenticated() && !state.loading){
  state.loading=true;
  CustomerService.customerWishlistList(1,100).then((res:any)=>{
    if(res.results){
      serverWishlist = res.results.map((obj:Wishlist)=>obj.fabric)
      state.wishlistItems = serverWishlist;
      saveWishlist();
    }
  }).finally(()=>state.loading=false)
}else if(!isAuthenticated()){
  const wishlistItems = localStorage.getItem("wishlistItems");

  // Parse the retrieved item, or assign an empty array if null
  const parsedWishlistItems = wishlistItems ? JSON.parse(wishlistItems) : [];
    if (wishlistItems) {
      state.wishlistItems = parsedWishlistItems;
    }
  };
}


export {
  state,
  addToWishlist,
  removeFromWishlist,
  saveWishlist,
  initializeWishList,
};
