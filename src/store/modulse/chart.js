import {
    GetData,
} from '@/api/elements'
import {
    ADD_OFFCHART_INDICATOR,
    SET_KLINES
} from '../mutation-types'


// Геттеры
export default {
    state: {
        chart_data:{
            chart: {
                type: "Candles",
                name: "",
                data: [],
                indexBased: true,
                grid: {
                    logScale: false,
                    id: 1
                }
            },
            offchart:[]
        },
        chart_names:{},
    },
    getters: {
        getChartData(state) {
            return state.chart_data
        }

    },
// Мутации
    mutations: {
        [SET_KLINES](state, klines) {
            state.chart_data.chart.name = klines[0].coin_pair_name
            let data = []
            for (let kline of klines.reverse()){
                data.push(
                    [
                        new Date(kline.take_time).getTime(),
                        kline.open_price,
                        kline.high,
                        kline.low,
                        kline.close_price,
                        kline.volume
                    ]
                )
            }
            state.chart_data.chart.data = data
        },
        [ADD_OFFCHART_INDICATOR](state, indicators) {
            let chart = {
                "name": indicators[0].indicator_name,
                "type": "Splines",
                "data": []
            }
            console.log(indicators)
            for (let indicator of indicators.reverse()){
                let row_data = []
                for (let time of indicator.take_time){
                    row_data.push(new Date(time).getTime())
                }
                for (let values of indicator.values_data){
                    row_data.push(values)
                }
                chart.data.push(row_data)
            }
            if (!state.chart_names[chart.name] && state.chart_names[chart.name] !== 0){
                state.chart_names[chart.name] = state.chart_data.offchart.length
                state.chart_data.offchart.push(chart)
            } else {
                state.chart_data.offchart[state.chart_names[chart.name]] = chart

            }
        },
    },
// Действия
    actions: {
        async setKlines({commit}, selectData) {
            await GetData.post(selectData)
                .then(klines => {
                    console.log(klines)
                    commit(SET_KLINES, klines)
                }).catch((error) => {
                    console.log(error)
                })
        },
        async addOffchartIndicator({commit}, selectData) {
            await GetData.post(selectData)
                .then(indicators => {
                    console.log(indicators)
                    commit(ADD_OFFCHART_INDICATOR, indicators)
                }).catch((error) => {
                    console.log(error)
                })
        },
    },
}
