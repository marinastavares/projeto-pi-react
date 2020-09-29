import React, { useEffect, useMemo } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { PieChart } from 'react-minimal-pie-chart'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import { useDispatch, useSelector } from 'react-redux'
import format from 'date-fns/format'
import ReactApexChart from 'react-apexcharts'

import {
  getMostEnergy,
  getEnergyAverage,
  getPeakCurrent,
  getSumHour,
  GET_ENERGY,
  GET_ENERGY_AVERAGE,
  GET_PEAK_CURRENT,
} from 'modules/energy/actions'
import {
  mostUsedSelectors,
  mostUsedLoading,
  averageSelector,
  averageLoading,
  peakCurrentSelector,
  energySelector,
} from 'modules/energy/selectors'
import { useOnSuccessCall } from 'utils/hooks'

import useStyles from './styles'
import CardInfo from './card-info'

const GeneralView = () => {
  const styles = useStyles()
  const mostUsed = useSelector(mostUsedSelectors)
  const isUsedLoading = useSelector(mostUsedLoading)
  const isAverageLoading = useSelector(averageLoading)
  const average = useSelector(averageSelector)
  const peakCurrent = useSelector(peakCurrentSelector)
  const { sumPotency } = useSelector(energySelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMostEnergy())
  }, [dispatch])

  const averageAction = () => dispatch(getEnergyAverage())
  const peakCurrentAction = () => dispatch(getPeakCurrent())
  const sumHourAction = () => dispatch(getSumHour())

  useOnSuccessCall(GET_ENERGY.ACTION, averageAction)
  useOnSuccessCall(GET_ENERGY_AVERAGE.ACTION, peakCurrentAction)
  useOnSuccessCall(GET_PEAK_CURRENT.ACTION, sumHourAction)

  const sumPotencyAllValues = useMemo(() => {
    const group = sumPotency.reduce((res, obj) => {
      // for each object obj in the array arr
      const key = obj.lab // let key be the concatination of locA and locB
      const newObj = obj // create a new object based on the object obj
      if (res[key])
        // if res has a sub-array for the current key then...
        res[key].push(newObj)
      // ... push newObj into that sub-array                                                        // otherwise...
      else res[key] = [newObj] // ... create a new sub-array for this key that initially contain newObj
      return res
    }, {})
    return Object.entries(group).map((values) => ({
      title: values[0],
      date: values[1].map((value) =>
        format(new Date(value.date), 'dd/M hh:mm')
      ),
      value: values[1].map((value) => value.wTotal),
    }))
  }, [sumPotency])

  const series = sumPotencyAllValues.map((value) => ({
    name: value.title,
    data: value.value,
  }))

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
      dataLabels: {
        enabled: false,
        style: {
          colors: ['#F44336', '#E91E63', '#9C27B0'],
        },
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
      xaxis: {
        categories: sumPotencyAllValues[0]?.date,
      },
      tooltip: {
        shared: false,
      },
    }),
    [sumPotencyAllValues]
  )

  // if (!mostUsed.length) {
  //   return null
  // }
  return (
    <Grid className={styles.container}>
      <CardInfo title="Mais utilizado" isLoading={isUsedLoading}>
        <PieChart
          className={styles.chart}
          lineWidth={15}
          rounded
          data={mostUsed}
          // eslint-disable-next-line react/jsx-no-bind
          label={() => `${mostUsed[0].value * 100}%`}
          labelPosition={0}
          labelStyle={{
            fontSize: '24px',
            fontFamily: 'Nunito',
            fill: '#DDE2FF',
          }}
          animate
        />
        <Typography component="p" variant="h1" color="secondary">
          {mostUsed[0]?.title?.toUpperCase()}
        </Typography>
      </CardInfo>
      <CardInfo
        title="Gasto médio de energia"
        containerClassName={styles.energy}
        isLoading={average === 0 || isAverageLoading}
      >
        <FlashOnIcon color="primary" className={styles.icon} />
        <Typography component="p" variant="h1" color="secondary">
          {average.toFixed(2)} W
        </Typography>
      </CardInfo>
      <CardInfo
        title="Pico de corrente"
        isLoading={!peakCurrent.lab}
        containerClassName={styles.peak}
      >
        <PieChart
          className={styles.chartPeak}
          data={[
            {
              title: 'PeakCurrent',
              value: peakCurrent.value,
              color: '#3751FF',
            },
          ]}
          startAngle={180}
          lengthAngle={180}
          viewBoxSize={[100, 50]}
          lineWidth={15}
          // eslint-disable-next-line react/jsx-no-bind
          label={() => `${peakCurrent.value}A`}
          labelPosition={0}
          labelStyle={{
            fontSize: '16px',
            fontFamily: 'Nunito',
            fill: '#DDE2FF',
          }}
          animate
          rounded
        />
        <Typography component="span" variant="h5" color="secondary">
          {peakCurrent.date && format(new Date(peakCurrent.date), 'dd/M hh:mm')}
        </Typography>
        <Typography component="p" variant="h4" color="secondary">
          {peakCurrent?.lab?.toUpperCase()}
        </Typography>
      </CardInfo>
      <CardInfo
        title="Soma das potências"
        className={styles.graph}
        isLoading={average === 0}
      >
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={200}
          width={500}
        />
      </CardInfo>
      <CardInfo
        title="Soma das potências"
        className={styles.graph}
        isLoading={sumPotency.length === 0}
      >
        {/* <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={200}
          width={300}
        /> */}
      </CardInfo>
      <CardInfo
        title="Porcentagem de energia consumida"
        isLoading={average === 0}
      >
        {/* <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={200}
          width={300}
        /> */}
      </CardInfo>
    </Grid>
  )
}

export default GeneralView
