<template>
  <!-- TradingVueJs 101 (example from 'Getting Started' ) -->

  <trading-vue
      :titleTxt="titleTxt"
      :id="id"
      :width="width"
      :height="height"
      :colorTitle="colorTitle"
      :colorBack="colorBack"
      :colorGrid="colorGrid"
      :colorText="colorText"
      :colorTextHL="colorTextHL"
      :colorScale="colorScale"
      :colorCross="colorCross"
      :colorCandleUp="colorCandleUp"
      :colorCandleDw="colorCandleDw"
      :colorWickUp="colorWickUp"
      :colorWickDw="colorWickDw"
      :colorWickSm="colorWickSm"
      :colorVolDw="colorVolDw"
      :colorPanel="colorPanel"
      :colorVolUp="colorVolUp"
      :colorTbBack="colorTbBack"
      :colorTbBorder="colorTbBorder"
      :font="font"
      :toolbar="toolbar"
      :data="chartData"
      :overlays="overlays"
      :chartConfig="chartConfig"
      :legendButtons="legendButtons"
      :indexBased="indexBased"
  >
  </trading-vue>
</template>

<script>
import TradingVue, {DataCube} from 'trading-vue-js'

export default {
  name: 'AdvanceTraidChart',
  components: {TradingVue},
  props: {
    titleTxt: {
      type: String,
      default: 'TradingVue.js'
    },
    id: {
      type: String,
      default: 'trading-vue-js'
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 421
    },
    colorTitle: {
      type: String,
      default: '#42b883'
    },
    colorBack: {
      type: String,
      default: '#121826'
    },
    colorGrid: {
      type: String,
      default: '#2f3240'
    },
    colorText: {
      type: String,
      default: '#dedddd'
    },
    colorTextHL: {
      type: String,
      default: '#fff'
    },
    colorScale: {
      type: String,
      default: '#838383'
    },
    colorCross: {
      type: String,
      default: '#8091a0'
    },
    colorCandleUp: {
      type: String,
      default: '#23a776'
    },
    colorCandleDw: {
      type: String,
      default: '#e54150'
    },
    colorWickUp: {
      type: String,
      default: '#23a77688'
    },
    colorWickDw: {
      type: String,
      default: '#e5415088'
    },
    colorWickSm: {
      type: String,
      default: '#bdbec0'
    },
    colorVolUp: {
      type: String,
      default: '#79999e42'
    },
    colorVolDw: {
      type: String,
      default: '#ef535042'
    },
    colorPanel: {
      type: String,
      default: '#565c68'
    },
    colorTbBack: {
      type: String
    },
    colorTbBorder: {
      type: String,
      default: '#8282827d'
    },
    font: {
      type: String,
      default: "Sen"
    },
    toolbar: {
      type: Boolean,
      default: false
    },
    chart: {
      type: Object,
      required: true
    },
// Your overlay classes here
    overlays: {
      type: Array,
      default: function () {
        return []
      }
    },
// Overwrites ChartConfig values,
// see constants.js
    chartConfig: {
      type: Object,
      default: function () {
        return {}
      }
    },
    legendButtons: {
      type: Array,
      default: function () {
        return []
      }
    },
    indexBased: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed:{
    chartData: function (){
      return new DataCube(this.chart)
    }
  }
}
</script>
