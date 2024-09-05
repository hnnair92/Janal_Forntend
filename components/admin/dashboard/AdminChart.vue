<template>
  <ClientOnly fallback="Loading Stats">
    <Line :key="updated" :data="chartData" :options="chartOptions" />
  </ClientOnly>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AdminService } from "@/openapi";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  // eslint-disable-next-line prettier/prettier
  Legend
);
@Component({
  name: "AdminChart",
  components: {
    Line,
  },
})
export class AdminChart extends Vue {
  updated = 0;
  chartData = {
    labels: [],
    datasets: [
      {
        label: "Orders",
        borderColor: "#2E5F9A",
        data: [],
        tension: 0.1,
      },
    ],
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  showNoDataMessage() {
    // Update chartData to display a message
    this.chartData = {
      // @ts-ignore
      labels: ["No Data"],
      datasets: [
        {
          label: "No Data Available",
          borderColor: "#dddddd",
          data: [],
          tension: 0.1,
        },
      ],
    };
  }

  mounted() {
    AdminService.adminOrderCountList().then((res) => {
      if (!res.length) {
        this.showNoDataMessage();
      }
      this.chartData.labels = res.map((item: any) => item.date);
      this.chartData.datasets[0].data = res.map(
        // eslint-disable-next-line prettier/prettier
        (item: any) => item.total_orders
      );
      this.updated++;
    });
  }
}
export default toNative(AdminChart);
</script>
