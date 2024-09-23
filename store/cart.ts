// store/cart.ts
import { CartItem } from '@/openapi/models/CartItem';
import { reactive } from 'vue';



interface CartState {
  cartItems: CartItem[];
}

const state = reactive<CartState>({
  cartItems: [],
});

const addToCart = (item: CartItem): void => {
  if(!updateQuantity(item)){
    state.cartItems.push(item);
  }
  saveCart();
};

const removeFromCart = (index: number): void => {
  state.cartItems.splice(index, 1);
  saveCart();
};

const isArrayEqual =(A:Array<any>, B:Array<any>):boolean =>{
  return (A.length === B.length) && A.every((v,i) => B[i] === v)
}

const updateQuantity = (item:CartItem):boolean =>{
  const itemFound = state.cartItems.find((obj:CartItem)=> obj.fabric_id==item.fabric_id && obj.product==item.product && obj.height_inch==item.height_inch && obj.width_inch==item.width_inch)
  let isUpdated=false;
  if(itemFound && itemFound.color && item.color && itemFound.color.id==item.color.id && isArrayEqual(item.attribute_values,itemFound.attribute_values)){
    itemFound.quantity +=item.quantity;
    isUpdated=true;
  }
  return isUpdated;
}
const updateCartItem = (index:number,item:CartItem):void =>{
  state.cartItems.splice(index, 1,item);
  saveCart();
}

const clearCart = (): void => {
  state.cartItems = [];
  saveCart();
};

const saveCart = (): void => {
  localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
};

const cartItemTotal = (): number => {
  let totalPrice = 0;
  if (state.cartItems && state.cartItems.length) {
    for (const item of state.cartItems) {
      // Convert item.price to a float (assuming it's a string)
      const itemPrice = parseFloat(item.price);
      // Check if itemPrice is a valid number
      if (!isNaN(itemPrice)) {
        totalPrice += itemPrice * item.quantity;
      }
    }
  }
  // Round the totalPrice to 2 decimal places (adjust as needed)
  return Math.round(totalPrice * 100) / 100;
};

const cartAddOnsTotal = (): number => {
  let totalPrice = 0;
  if (state.cartItems && state.cartItems.length) {
    for (const item of state.cartItems) {
      if(item.add_on_prices)
      totalPrice += item.add_on_prices * item.quantity;
    }
  }
  // Round the totalPrice to 2 decimal places (adjust as needed)
  return Math.round(totalPrice * 100) / 100;
};

const cartDiscountTotal = (): number => {
  let totalDiscount = 0;
  if (state.cartItems && state.cartItems.length) {
    for (const item of state.cartItems) {
      // Convert item.price to a float (assuming it's a string)
      const itemPrice = parseFloat(item.price);
      // Check if itemPrice is a valid number
      if (!isNaN(itemPrice) && item.discount_amount) {
        totalDiscount += (item.discount_amount/100) * (item.quantity* itemPrice);
      }
        
    }
  }
  // Round the totalPrice to 2 decimal places (adjust as needed)
  return Math.round(totalDiscount * 100) / 100;
};

const totalCartQuantity = (): number => {
  let totalQuantity = 0;
  if (state.cartItems && state.cartItems.length) {
    for (const item of state.cartItems) {

      // Check if itemPrice is a valid number
      if (!isNaN(item.quantity)) {
        totalQuantity += item.quantity;
      }
    }
  }
  return totalQuantity
};

const initializeCart = (): void => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) as CartItem[];
  if (cartItems) {
    state.cartItems = cartItems;
  }
};

export { state, addToCart, removeFromCart, clearCart,updateCartItem, cartItemTotal,totalCartQuantity,initializeCart, updateQuantity,cartAddOnsTotal,cartDiscountTotal};
