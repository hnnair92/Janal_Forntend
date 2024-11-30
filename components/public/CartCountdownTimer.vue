<template>
  <div
    v-if="startTime && timeLeft >= 0"
    class="text-right q-d-flex align-bottom q-mt-md"
  >
    <div v-if="timeLeft > 0" class="justify-center align-center q-pr-md">
      <p class="counter-text q-mb-none">
        Time left in this session: {{ timeFormatted }}
      </p>
    </div>
    <div v-else class="justify-center align-center text-red">
      <p class="counter-text q-mb-none">
        Session expired. Please checkout now!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component
export default class CountdownTimer extends Vue {
  // Prop to receive the start time (UTC created_on)
  @Prop({ required: true }) startTime!: string; // ISO 8601 UTC string (e.g., "2024-11-30T18:47:37.028658Z")

  // Data properties
  timeLeft: number = -1; // Time left in seconds
  timer: any = null; // Timer reference for clearing interval

  // Computed property to format time as HH:MM:SS
  get timeFormatted(): string {
    const hours = String(Math.floor(this.timeLeft / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((this.timeLeft % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(this.timeLeft % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  // Method to calculate expiration time (startTime + 15 minutes) and start countdown
  startCountdown() {
    // Parse the start time into a JavaScript Date object
    const startTimestamp = new Date(this.startTime).getTime(); // Add 15 minutes (15 * 60 * 1000 ms) to the start time to get expiration time
    const expirationTimestamp = startTimestamp + 15 * 60 * 1000;

    if (!expirationTimestamp) return;

    // Update every second
    this.timer = setInterval(() => {
      const now = new Date().getTime();
      this.timeLeft = Math.floor((expirationTimestamp - now) / 1000);

      // Stop the countdown when time reaches 0
      if (this.timeLeft <= 0) {
        clearInterval(this.timer as number);
        this.timeLeft = 0;
      }
    }, 1000);
  }

  // Lifecycle hook when the component is mounted
  mounted() {
    this.startCountdown();
  }

  // Cleanup timer when component is destroyed
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer as number);
    }
  }
}
</script>

<style scoped>
.counter {
  background-color: #e3e3e3;
  padding: 10px;
  border-radius: 5px;
}

.counter-text {
  font-size: 18px;
  font-weight: bold;
}
</style>
