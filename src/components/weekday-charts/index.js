/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { useWindowSize } from 'utils/hooks'

import CanvasJSReact from './canvasjs.react.js'

const { CanvasJS } = CanvasJSReact
const { CanvasJSChart } = CanvasJSReact

const PALETTE = [
  '#A300D6	',
  '#7D02EB',
  '#5653FE',
  '#2983FF',
  '#00B1F2',
  '#2B908F',
  '	#F9A3A4',
  '	#90EE7E',
  '#FA4443',
  '#69D2E7',
]
class App extends Component {
  static propTypes = {
    dataValues: PropTypes.arrayOf(PropTypes.shape({})),
    isString: PropTypes.bool,
    isMobile: PropTypes.bool,
    unit: PropTypes.string,
  }

  static defaultProps = {
    dataValues: [],
    unit: '',
    isString: false,
    isMobile: false,
  }

  constructor(props) {
    super(props)
    this.toggleDataSeries = this.toggleDataSeries.bind(this)
  }

  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false
    } else {
      e.dataSeries.visible = true
    }
    this.chart.render()
  }

  render() {
    const options = {
      theme: 'dark1',
      backgroundColor: '#20263C',
      animationEnabled: true,
      zoomEnabled: true,
      width: this.props.isMobile ? 320 : 700,
      height: this.props.isMobile ? 350 : 250,
      // title: {
      //   text: 'Units Sold VS Profit',
      //   fontFamily: 'Nunito',
      // },
      axisX: {
        title: 'Período de aquisição',
        titleFontColor: '#DDE2FF',
        lineColor: '#DDE2FF',
        labelFontColor: '#DDE2FF',
        tickColor: '#DDE2FF',
        fontFamily: 'Nunito',
        valueFormatString: this.props.isString ? "##':00'" : 'DD/MM HH:mm',
      },
      axisY: {
        title: 'Resultados',
        titleFontColor: '#DDE2FF',
        lineColor: '#DDE2FF',
        labelFontColor: '#DDE2FF',
        tickColor: '#DDE2FF',
        fontFamily: 'Nunito',
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        itemclick: this.toggleDataSeries,
      },
      data: this.props.dataValues?.map((values, index) => ({
        dataPoints: values.map(({ x, y }) => ({ x, y })),
        type: 'spline',
        name: values[0].name,
        yValueFormatString: `###,### ${this.props.unit}`,
        color: PALETTE[index],
        showInLegend: true,
      })),
    }
    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
        {/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
      </div>
    )
  }
}

export default App
