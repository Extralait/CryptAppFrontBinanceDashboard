<template>
  <AdvanceTradChart
      :chart="chart"
      :width="width"
      :height="height"
      :colorCandleDw="'#FF3C30'"
      :colorCandleUp="'#00C814'"
      :colorBack="'#FFFFFF'"
      :colorTbBack="'#ffffff'"
      :colorScale="'#00B2FF'"
      :colorCross="'#00B2FF'"
      :colorGrid="'#e7e7e7'"
      :colorPanel="'#00B2FF'"
      :colorTbBorder="'#e7e7e7'"
      :colorText="'#00B2FF'"
      :colorTextHL="'#fff'"
      :colorTitle="'#00B2FF'"
      :colorVolDw="'rgba(255,60,48,0.28)'"
      :colorVolUp="'rgba(0,200,20,0.28)'"
      :colorWickDw="'#FF3C30'"
      :colorWickUp="'#00C814'"
      :colorWickSm="'#C2C2C2'"
      :font="'normal bold 12.7px Sen'"
      :toolbar="true"
  />
</template>

<script>
import AdvanceTradChart from "@/components/charts/base_chart/AdvanceTradChart";

export default {
  name: "Chart",
  components: {
    AdvanceTradChart
  },
  props: {
    chart: {
      type: Object,
      default: function (){
        return {}
      }
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
}
</script>

<style scoped>
p {
  color: #C2C2C2;
}

</style>