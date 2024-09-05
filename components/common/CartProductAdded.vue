<template>
  <div v-if="isLoading" class="loading-screen-overlay">
    <div class="cart-animation">
      <div class="item">🛍️</div>
      <div class="cart">🛒</div>
    </div>
    <div class="loading-text">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: "Loading...", // Default message
    },
  },
};
</script>

<style scoped>
.loading-screen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure the overlay is on top of other elements */
}

.cart-animation {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.item {
  font-size: 3rem;
  position: absolute;
  animation: moveToCart 2s ease-in-out infinite;
}

.cart {
  font-size: 4rem;
  position: relative;
  margin-left: 50px;
}

.loading-text {
  font-size: 1.5rem;
  color: #fff;
}

/* Animation for moving item to cart */
@keyframes moveToCart {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(40px);
    opacity: 0.5;
  }
  100% {
    transform: translateX(80px);
    opacity: 0;
  }
}
</style>
