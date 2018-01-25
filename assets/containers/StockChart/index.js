import {withRouter} from 'react-router-dom'
import React from 'react'
import {observer} from 'mobx-react'
import AnyChart from 'anychart-react'
import anychart from 'anychart'
import getJSON from './data'
import theme from 'configs/stockThemeDark'

// 普通图表配置
// const complexSettings = {
//   width: 400,
//   height: 300,
//   type: 'column',
//   data: 'P1,5\nP2,3\nP3,6\nP4,4',
//   title: 'Column chart',
//   yAxis: [1, {
//     orientation: 'right',
//     enabled: true,
//     labels: {
//       format: '{%Value}{decimalPoint:\\,}',
//       fontColor: 'red'
//     }
//   }],
//   legend: {
//     background: 'lightgreen 0.4',
//     padding: 0
//   },
//   lineMarker: {
//     value: 4.5
//   }
// }

@withRouter
@observer
export default class StockChart extends React.Component {
  render () {
    let table = anychart.data.table()
    table.addData(getJSON())

    // map the data
    let mapping = table.mapAs()
    mapping.addField('open', 1)
    mapping.addField('high', 2)
    mapping.addField('low', 3)
    mapping.addField('close', 4)
    let chart = anychart.stock()
    let plot = chart.plot(0)
    let series = plot.candlestick(mapping)
    series.risingStroke(theme.RISING)
    series.risingFill(theme.RISING)
    series.fallingStroke(theme.FALLING)
    series.fallingFill(theme.FALLING)
    let sma20 = plot.sma(table.mapAs({value: 4}), 20).series()
    sma20.stroke(theme.MA20)
    series.name('股价图')

    chart.background().fill(theme.BACKGROUD)
    plot.yGrid(true)
    plot.xGrid(true)
    // chart.scroller(false)
    plot.xAxis().enabled(false)
    plot.yAxis().labels().fontColor(theme.Y_AXIS)
    plot.crosshair().xStroke(theme.CROSSHAIR, 1)
    plot.crosshair().yStroke(theme.CROSSHAIR, 1)
    plot.yGrid().stroke({color: theme.Y_GRID, dash: '20 10'})
    plot.xGrid().stroke({color: theme.X_GRID, dash: '20 10'})

    return (
      <div>
        <AnyChart
          width={800}
          height={400}
          instance={chart}
          title="Stock demo"
        />
      </div>
    )
  }
}
