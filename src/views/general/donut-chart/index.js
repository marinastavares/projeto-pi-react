/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
// import PropTypes from 'prop-types'
import ReactApexChart from 'react-apexcharts'

import useStyles from './styles'

const DonutChart = ({ values, labels, height, width }) => {
  const styles = useStyles()

  const options = useMemo(
    () => ({
      labels,
      chartOptions: { labels },
      chart: {
        type: 'donut',
      },
      markers: {
        size: 0,
      },
      title: {
        align: 'left',
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
      tooltip: {
        shared: false,
      },
      legend: {
        fontFamily: 'Nunito',
      },
    }),
    [labels]
  )
  return (
    <ReactApexChart
      options={options}
      series={values}
      type="donut"
      height={height}
      width={width}
      className={styles.background}
    />
  )
}

DonutChart.propTypes = {}

DonutChart.defaultProps = {}
export default React.memo(DonutChart)
