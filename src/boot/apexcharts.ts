import { defineBoot } from '#q-app';
import VueApexCharts from 'vue3-apexcharts';

export default defineBoot(({ app }) => {
  app.use(VueApexCharts);
});
