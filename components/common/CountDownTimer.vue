<template>
    <div class="q-flex-grow-1 q-mt-none q-pt-none">
        <q-banner dense class="bg-secondary text-white text-center" v-if="showTimer">
            <div class="text-h6"> {{ displayTime }}</div>
        </q-banner>
    </div>
</template>
   
<script>
import { ref, onMounted, watch, onUnmounted } from 'vue';

export default {
    name: "CountDownTimer",
    props: {
        dateTime: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const displayTime = ref('');
        const percentage = ref(0);
        const showTimer = ref(true);

        onMounted(() => {
            startCountdown();
            intervalId = setInterval(startCountdown, 1000);
        });

        onUnmounted(() => {
            clearInterval(intervalId);
        });

        let intervalId;

        function startCountdown() {
            const dateParts = props.dateTime.split('-');
            const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]) - 1; // Month is zero-based
            const day = parseInt(dateParts[2]);

            const endDate = new Date(year, month, day, 23, 59, 59, 999);

            const totalSeconds = Math.floor((endDate - new Date()) / 1000);
            const seconds = totalSeconds % 60;
            const minutes = Math.floor(totalSeconds / 60) % 60;
            const hours = Math.floor(totalSeconds / 3600) % 24;
            const days = Math.floor(totalSeconds / 86400);
            if (totalSeconds > 0) {
                const dayText = days > 1 ? "Days" : "Day";
                displayTime.value = `Sale Ends in ${days} ${dayText} ${hours}:${minutes}:${seconds}`;
                percentage.value = totalSeconds / 864000; // Assuming the max is 10 days
            } else {
                showTimer.value = false;
                displayTime.value = 'Time up!';
                percentage.value = 0;
            }
        }

        return {
            displayTime,
            percentage,
            showTimer
        };
    },
};
</script>