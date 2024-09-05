<template>
    <div v-if="isLoading" class="loading-overlay">
        <!-- Logo -->
        <q-img loading="eager" fetchpriority="high" no-spinner src="/logo.svg" width="200px"></q-img>
        <!-- Spinner and message -->
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p class="loading-message">{{ message }}</p>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Loading',
    props: {
        isLoading: Boolean, // Indicates whether loading should be shown or not
        message: String, // Message to display below the spinner
    },
};
</script>
  
<style scoped>
.loading-logo {
    /* Add styles for your logo here */
    width: 100px;
    /* Adjust the width and height as needed */
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    /* Make sure the logo is above the spinner */
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    /* Semi-transparent background */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* Make sure it's on top of everything */
}

.loading-spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #3498db;
    /* Change color here */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    /* Animation for spinning */
}

.loading-message {
    margin-top: 16px;
    /* Adjust spacing between spinner and message */
    font-size: 25px;
    /* Adjust font size */
    color: white;
    /* Change text color */
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
  