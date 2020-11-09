/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CanvasJSReact from './canvasjs.react.js'

const { CanvasJS } = CanvasJSReact
const { CanvasJSChart } = CanvasJSReact

class App extends Component {
  static propTypes = {
    phaseOne: PropTypes.arrayOf(PropTypes.shape({})),
    phaseTwo: PropTypes.arrayOf(PropTypes.shape({})),
    phaseThree: PropTypes.arrayOf(PropTypes.shape({})),
    unit: PropTypes.string,
  }

  static defaultProps = {
    phaseOne: [],
    phaseTwo: [],
    phaseThree: [],
    unit: '',
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
      height: 250,
      width: 700,
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
      },
      axisY: {
        title: 'Resultados por fase',
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
      data: [
        {
          type: 'spline',
          name: 'Fase 1',
          showInLegend: true,
          xValueFormatString: 'DD/MM HH:mm',
          yValueFormatString: `###,### ${this.props.unit}`,
          dataPoints: this.props.phaseOne,
          color: '#00B1F2',
          legendMarkerColor: '#00B1F2',
          lineThickness: 1.5,
        },
        {
          type: 'spline',
          name: 'Fase 2',
          showInLegend: true,
          xValueFormatString: 'DD/MM HH:mm',
          yValueFormatString: `###,### ${this.props.unit}`,
          dataPoints: this.props.phaseTwo,
          color: '#5653FE',
          legendMarkerColor: '#5653FE',
        },
        {
          type: 'spline',
          name: 'Fase 3',
          showInLegend: true,
          xValueFormatString: 'DD/MM HH:mm',
          yValueFormatString: `###,### ${this.props.unit}`,
          dataPoints: this.props.phaseThree,
          color: '#A300D6',
        },
      ],
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
