import {withRouter} from 'react-router-dom'
import React from 'react'
import {observer} from 'mobx-react'
import AnyChart from 'anychart-react'
// import anychart from 'anychart'

const complexSettings = {
  width: 400,
  height: 300,
  type: 'column',
  data: 'P1,5\nP2,3\nP3,6\nP4,4',
  title: 'Column chart',
  yAxis: [1, {
    orientation: 'right',
    enabled: true,
    labels: {
      format: '{%Value}{decimalPoint:\\,}',
      fontColor: 'red'
    }
  }],
  legend: {
    background: 'lightgreen 0.4',
    padding: 0
  },
  lineMarker: {
    value: 4.5
  }
}

@withRouter
@observer
export default class StockChart extends React.Component {
  render () {
    return (
      <div>
        <AnyChart
          {...complexSettings}
        />
      </div>
    )
  }
}
