<template>
  <div id="app">
    <div class="control-container">
      <select
          name="klynes_type"
          v-model="kline_type"
      >
        <option
            v-for="kline_type in klines_types"
            :value="kline_type"
            :key="kline_type"
        >
          {{ kline_type }}
        </option>
      </select>
      <select
          name="coin_pair_name"
          v-model="coin_pair_name"
      >
        <option
            v-for="coin_pair_name in coins_pairs_names"
            :value="coin_pair_name"
            :key="coin_pair_name"
        >
          {{ coin_pair_name }}
        </option>
      </select>
      <select
          name="limit"
          v-model="limit"
      >
        <option
            v-for="limit in limits"
            :value="limit"
            :key="limit"
        >
          {{ limit }}
        </option>
      </select>
      <input
          type="datetime-local"
          v-model="first_date"
      >
      <input
          type="datetime-local"
          v-model="last_date"
      >
    </div>
    <div class="chart-container">
      <Chart
          class="main-chart"
          v-if="!loading"
          :width="clientWidth-100"
          :height="clientHeight-90"
          :chart="this.getChartData"
          :key="update_counter"
      />
    </div>
  </div>
</template>

<script>

import Chart from "@/components/pages/dashboard/chart_elements/Chart";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    Chart
  },
  data() {
    return {
      loading: true,
      clientHeight: 0,
      clientWidth: 0,
      kline_type: "1m",
      coin_pair_name: "BTCUSDT",
      limit: 200,
      update_counter: 0,
      first_date: null,
      last_date: null,
      limits: [
        50,
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
        1000,
        1500,
        2000,

      ],
      klines_types: [
        '1m', '3m', '5m', '15m', '30m',
        '1H', '2H', '4H', '6H', '8H',
        '12H', '1D', '3D', '1W', '1M'
      ],
      coins_pairs_names: [
        'BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'BNBUSDT', 'XRPUSDT', 'DOGEUSDT', 'DOTUSDT',
        'SOLUSDT', 'UNIUSDT', 'LINKUSDT', 'BCHUSDT', 'LTCUSDT', 'LUNAUSDT', 'MATICUSDT',
        'ICPUSDT', 'WBTCUSDT', 'XLMUSDT', 'ETCUSDT', 'VETUSDT', 'AVAXUSDT', 'FILUSDT',
        'THETAUSDT', 'TRXUSDT', 'XMRUSDT', 'CAKEUSDT', 'AAVEUSDT', 'EOSUSDT', 'GRTUSDT',
        'FTTUSDT', 'ATOMUSDT', 'AXSUSDT', 'KLAYUSDT', 'NEOUSDT', 'CROUSDT', 'ALGOUSDT',
        'BTCBUSDT', 'MKRUSDT', 'XTZUSDT', 'SHIBUSDT', 'MIOTAUSDT', 'BSVUSDT', 'BTTUSDT',
        'EGLDUSDT', 'LEOUSDT', 'AMPUSDT', 'DASHUSDT', 'KSMUSDT', 'WAVESUSDT',
        'RUNEUSDT', 'COMPUSDT', 'HNTUSDT', 'HTUSDT', 'NEARUSDT', 'HBARUSDT', 'CHZUSDT',
        'DCRUSDT', 'QNTUSDT', 'XDCUSDT', 'ZECUSDT', 'HOTUSDT', 'TFUELUSDT', 'STXUSDT',
        'ENJUSDT', 'SUSHIUSDT', 'MANAUSDT', 'SNXUSDT', 'TELUSDT', 'YFIUSDT', 'CELUSDT',
        'FTMUSDT', 'RVNUSDT', 'FLOWUSDT', 'QTUMUSDT', 'ZILUSDT', 'RARIUSDT', 'DOCKUSDT'
      ]
    }
  },
  methods: {
    ...mapActions(['setKlines', 'addOffchartIndicator', 'setTimeOffset']),
    buildChart: async function () {
      await this.setKlines(
          {
            "database": "binance",
            "table": "klines",
            "columns": [],
            "functions": [],
            "conditions": [
              `coin_pair_name = '${this.coin_pair_name}'${this.first_date ?" AND take_time > '" + String(this.using_first_date).replace("T", " ") + "'" : ''} ${this.last_date ?"AND take_time < '" + String(this.using_last_date).replace("T", " ") + "'" : ''}`,
              `kline_type = '${this.kline_type}'`,
            ],
            "group_by": [],
            "having": [],
            "order_by": [
              'take_time DESC',
            ],
            "limit": this.limit,
            "sql": ""
          }
      )
      await this.addOffchartIndicator(
          {
            "database": "binance",
            "table": "indicators",
            "columns": [],
            "functions": [],
            "conditions": [
              `coin_pair_name = '${this.coin_pair_name}'${this.first_date ?" AND take_time[1] > '" + String(this.using_first_date).replace("T", " ") + "'" : ''} ${this.last_date ?"AND take_time[1] < '" + String(this.using_last_date).replace("T", " ") + "'" : ''}`,
              `indicator_kline_type = '${this.kline_type}'`,
              "indicator_name = 'test_1'",
            ],
            "order_by": ["take_time[1] DESC"],
            "group_by": [],
            "having": [],
            "limit": this.limit,
            "sql": ""
          }
      )
      await this.addOffchartIndicator(
          {
            "database": "binance",
            "table": "indicators",
            "columns": [],
            "functions": [],
            "conditions": [
              `coin_pair_name = '${this.coin_pair_name}'${this.first_date ?" AND take_time[1] > '" + String(this.using_first_date).replace("T", " ") + "'" : ''} ${this.last_date ?"AND take_time[1] < '" + String(this.using_last_date).replace("T", " ") + "'" : ''}`,
              `indicator_kline_type = '${this.kline_type}'`,
              "indicator_name = 'test_2'"
            ],
            "order_by": ["take_time[1] DESC"],
            "group_by": [],
            "having": [],
            "limit": this.limit,
            "sql": ""
          }
      )

      await this.addOffchartIndicator(
          {
            "database": "binance",
            "table": "indicators",
            "columns": [],
            "functions": [],
            "conditions": [
              `coin_pair_name = '${this.coin_pair_name}'${this.first_date ?" AND take_time[1] > '" + String(this.using_first_date).replace("T", " ") + "'" : ''} ${this.last_date ?"AND take_time[1] < '" + String(this.using_last_date).replace("T", " ") + "'" : ''}`,
              `indicator_kline_type = '${this.kline_type}'`,
              "indicator_name = 'test_3'"
            ],
            "order_by": ["take_time[1] DESC"],
            "group_by": [],
            "having": [],
            "limit": this.limit,
            "sql": ""
          }
      )

      await this.addOffchartIndicator(
          {
            "database": "binance",
            "table": "indicators",
            "columns": [],
            "functions": [],
            "conditions": [
              `coin_pair_name = '${this.coin_pair_name}'${this.first_date ?" AND take_time[1] > '" + String(this.using_first_date).replace("T", " ") + "'" : ''} ${this.last_date ?"AND take_time[1] < '" + String(this.using_last_date).replace("T", " ") + "'" : ''}`,
              `indicator_kline_type = '${this.kline_type}'`,
              "indicator_name = 'test_4'"
            ],
            "order_by": ["take_time[1] DESC"],
            "group_by": [],
            "having": [],
            "limit": this.limit,
            "sql": ""
          }
      )

      this.update_counter += 1
    },
    startWaiting: function () {
      this.is_waiting_started = true
      setInterval(() => {
        this.buildChart()
      }, 1000 * 60)
    },
    onResize: function () {
      this.clientHeight = document.documentElement.clientHeight
      this.clientWidth = document.documentElement.clientWidth
    },
    dateFormatter: function (date_str){
      let date = new Date(date_str)
      date.setHours(date.getHours()+3)
      return String(date.toISOString()).slice(0,-1)
    }
  },
  computed: {
    ...mapGetters(['getChartData','getTimeOffset']),
    using_first_date: function (){
      if (this.first_date){
        return this.dateFormatter(this.first_date)
      } else {
        return null
      }
    },
    using_last_date: function (){
      if (this.last_date){
        return this.dateFormatter(this.last_date)
      } else {
        return null
      }
    },
  },
  async mounted() {

    window.addEventListener('resize', this.onResize)
    this.setTimeOffset()
    this.time_offset=this.getTimeOffset
    await this.buildChart()
    this.loading = false
    this.startWaiting()
    this.onResize()
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    limit(new_val, old_val) {
      this.buildChart()
    },
    // eslint-disable-next-line no-unused-vars
    coin_pair_name(new_val, old_val) {
      this.buildChart()
    },
    // eslint-disable-next-line no-unused-vars
    kline_type(new_val, old_val) {
      this.buildChart()
    },
    // eslint-disable-next-line no-unused-vars
    last_date(new_val, old_val) {
      this.buildChart()
    },
    // eslint-disable-next-line no-unused-vars
    first_date(new_val, old_val) {
      this.buildChart()
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

* {
  padding: 0;
  margin: 0;
}

.control-container {
  margin: auto;
  height: 90px;
}

.main-chart {
  margin: auto;
}
</style>
