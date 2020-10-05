/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
// import PropTypes from 'prop-types'
import ReactApexChart from 'react-apexcharts'

import useStyles from './styles'

const LineChart = ({ YValues, XValues, height, width }) => {
  const styles = useStyles()

  const options = useMemo(
    () => ({
      chart: {
        type: 'line',
        stacked: false,
        height: 500,
        width: 300,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
      },
      legend: {
        fontFamily: 'Nunito',
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        align: 'left',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      theme: {
        mode: 'dark',
        monochrome: {
          enabled: true,
          color: '#3751FF',
          shadeTo: 'light',
          shadeIntensity: 0.9,
        },
      },
      xaxis: {
        categories: XValues,
        labels: {
          style: {
            fontFamily: 'Nunito',
          },
        },
      },
      tooltip: {
        shared: false,
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: 'Nunito',
          },
        },
        decimalsInFloat: 2,
      },
    }),
    [XValues]
  )
  return (
    <ReactApexChart
      options={options}
      series={YValues}
      type="area"
      height={height}
      width={width}
      className={styles.background}
    />
  )
}

// LineChart.propTypes = {
//   YValues: PropTypes.arrayOf(),
// }

// LineChart.defaultProps = {
//   value: '',
// }
export default React.memo(LineChart)
