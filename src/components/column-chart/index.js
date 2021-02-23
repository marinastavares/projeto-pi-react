/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import ReactApexChart from 'react-apexcharts'

import { useWindowSize } from 'utils/hooks'

import useStyles from './styles'

const INITIAL_VALUES = new Array(7).fill(0).map((value, index) => index + 1)

const WEEK_ARRAY = {}
INITIAL_VALUES.map((value) => {
  WEEK_ARRAY[value] = 0
  return null
})
const ColumnChart = ({ value, isPhaseGraph }) => {
  const styles = useStyles()
  const { isMobile } = useWindowSize()

  const currentValues = useMemo(() => {
    if (isPhaseGraph) {
      return value
    }
    value.map((energy) => {
      WEEK_ARRAY[energy.id] = energy.totalEnergy?.toFixed(2)
      return null
    })
    return Object.values(WEEK_ARRAY)
  }, [isPhaseGraph, value])

  const options = useMemo(
    () => ({
      options: {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'bottom', // top, center, bottom
            },
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
        dataLabels: {
          enabled: true,
        },
        legend: {
          fontFamily: 'Nunito',
        },
        xaxis: {
          categories: isPhaseGraph
            ? ['Fase 1', 'Fase 2', 'Fase 3']
            : [
                'Domingo',
                'Segunda',
                'Terça',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sábado',
              ],
          position: 'bottom',
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              fontFamily: 'Nunito',
            },
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              fontFamily: 'Nunito',
            },
            show: false,
          },
        },
      },
    }),
    [isPhaseGraph]
  )

  const mobileSize = isMobile ? 250 : 450
  return (
    <ReactApexChart
      series={
        isPhaseGraph
          ? [{ name: '', data: value }]
          : [
              {
                name: 'Gasto de energia',
                data: currentValues,
              },
            ]
      }
      options={options.options}
      type="bar"
      height={isPhaseGraph ? 200 : 250}
      width={isPhaseGraph ? 200 : mobileSize}
      className={styles.background}
    />
  )
}

ColumnChart.propTypes = {
  value: PropTypes.string,
  isPhaseGraph: PropTypes.bool,
}

ColumnChart.defaultProps = {
  value: '',
  isPhaseGraph: false,
}
export default React.memo(ColumnChart)
