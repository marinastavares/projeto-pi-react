import React, { useEffect, useCallback } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { PieChart } from 'react-minimal-pie-chart'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import { useDispatch, useSelector } from 'react-redux'
import format from 'date-fns/format'

import {
  getMostEnergy,
  getEnergyAverage,
  getPeakCurrent,
  getSumHour,
  getPorcentualLab,
  getWeeklyEnergy,
  getWeeklyPorcentual,
  GET_ENERGY,
  GET_ENERGY_AVERAGE,
  GET_PEAK_CURRENT,
  GET_SUM_HOUR,
  GET_PORCENTUAL_LAB,
  GET_WEEKLY_ENERGY,
} from 'modules/energy/actions'
import { energySelector } from 'modules/energy/selectors'
import { allQueriesSelector } from 'modules/labs/selectors'
import { useOnSuccessCall } from 'utils/hooks'
import CardInfo from 'components/card-info'
import LineChart from 'components/line-chart'
import DonutChart from 'components/donut-chart'
import ColumnChart from 'components/column-chart'

import useStyles from './styles'

const QUERIES = {
  TOTAL_ENERGY_MONTH: 'totalEnergyMonth',
  AVERAGE: 'average',
  PEAK_OF_CURRENT: 'peakOfCurrent',
  WEEKLY_ENERGY: 'weeklyEnergy',
  SUM_POTENCY: 'sumPotency',
  POTENCY_WEEKLY: 'potencyWeekly',
}

const GeneralView = () => {
  const styles = useStyles()
  const {
    totalEnergyMonth,
    sumPotency,
    avg: average,
    peakCurrent,
    porcentual,
    weeklyEnergy,
    potWeekday,
  } = useSelector(energySelector)
  const dispatch = useDispatch()
  const allQueries = useSelector(allQueriesSelector)

  useEffect(() => {
    dispatch(getMostEnergy())
  }, [dispatch])

  const averageAction = useCallback(() => {
    if (allQueries?.[QUERIES.TOTAL_ENERGY_MONTH]) {
      return
    }
    dispatch(getEnergyAverage())
  }, [allQueries, dispatch])

  const peakCurrentAction = useCallback(() => {
    if (allQueries?.[QUERIES.AVERAGE]) {
      return
    }
    dispatch(getPeakCurrent())
  }, [allQueries, dispatch])
  const weeklyEnergyAction = useCallback(() => {
    if (allQueries?.[QUERIES.PEAK_OF_CURRENT]) {
      return
    }
    dispatch(getWeeklyEnergy())
  }, [allQueries, dispatch])
  const sumHourAction = useCallback(() => {
    if (allQueries?.[QUERIES.WEEKLY_ENERGY]) {
      return
    }
    dispatch(getSumHour())
  }, [allQueries, dispatch])
  const porcentualLab = useCallback(() => {
    if (allQueries?.[QUERIES.SUM_POTENCY]) {
      return
    }
    dispatch(getPorcentualLab())
  }, [allQueries, dispatch])
  const weeklyPorcentualAction = useCallback(() => {
    if (allQueries?.[QUERIES.POTENCY_WEEKLY]) {
      return
    }
    dispatch(getWeeklyPorcentual())
  }, [allQueries, dispatch])

  const [isUsedLoading] = useOnSuccessCall(GET_ENERGY.ACTION, averageAction)
  const [isAverageLoading] = useOnSuccessCall(
    GET_ENERGY_AVERAGE.ACTION,
    peakCurrentAction
  )
  const [isPeakCurrentLoading] = useOnSuccessCall(
    GET_PEAK_CURRENT.ACTION,
    weeklyEnergyAction
  )
  const [isWeeklyEnergyLoading] = useOnSuccessCall(
    GET_WEEKLY_ENERGY.ACTION,
    porcentualLab
  )
  const [isPorcentualLoading] = useOnSuccessCall(
    GET_PORCENTUAL_LAB.ACTION,
    sumHourAction
  )
  const [isWeeklyPorcentualLoading] = useOnSuccessCall(
    GET_SUM_HOUR.ACTION,
    weeklyPorcentualAction
  )

  const series = sumPotency.map((value) => ({
    name: value.title.toUpperCase(),
    data: value.value,
  }))

  const seriesWeekday = potWeekday.map((value) => ({
    name: value.title,
    data: value.value,
  }))

  return (
    <Grid className={styles.container}>
      <CardInfo
        title="Gasto total de energia"
        containerClassName={styles.energy}
        isLoading={isUsedLoading}
        hasTime
        name={QUERIES.TOTAL_ENERGY_MONTH}
        action={getMostEnergy}
      >
        <FlashOnIcon color="primary" className={styles.icon} />
        <Typography component="p" variant="h2" color="secondary">
          {totalEnergyMonth.toFixed(2)} kWh
        </Typography>
      </CardInfo>
      <CardInfo
        title="Gasto médio de energia"
        containerClassName={styles.energy}
        isLoading={average === 0 || isAverageLoading}
        hasTime
        name={QUERIES.AVERAGE}
        action={getEnergyAverage}
      >
        <FlashOnIcon color="primary" className={styles.icon} />
        <Typography component="p" variant="h1" color="secondary">
          {average?.toFixed(2)} kWh
        </Typography>
      </CardInfo>
      <CardInfo
        title="Pico de corrente"
        isLoading={!peakCurrent.slug || isPeakCurrentLoading}
        containerClassName={styles.peak}
        hasTime
        name={QUERIES.PEAK_OF_CURRENT}
        action={getPeakCurrent}
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
          {peakCurrent?.slug?.toUpperCase()}
        </Typography>
      </CardInfo>
      <CardInfo
        title="Energia gasta da semana"
        className={styles.graph}
        isLoading={weeklyEnergy?.length === 0 || isWeeklyEnergyLoading}
        hasTime
        name={QUERIES.WEEKLY_ENERGY}
        action={getSumHour}
      >
        <ColumnChart value={weeklyEnergy} />
      </CardInfo>
      <CardInfo
        title="Porcentagem de energia consumida"
        isLoading={porcentual?.length === 0 || isPorcentualLoading}
        hasTime
        name="porcentual"
      >
        <DonutChart
          height={280}
          width={280}
          values={porcentual.map((value) => value.percE)}
          labels={porcentual.map((value) => value.lab?.toUpperCase())}
        />
      </CardInfo>
      <CardInfo
        title="Soma das potências por dia da semana"
        className={styles.graphComplete}
        isLoading={sumPotency?.length === 0 || isPorcentualLoading}
        isWeekly
        name={QUERIES.SUM_POTENCY}
        action={getPorcentualLab}
      >
        <LineChart
          height={250}
          width={700}
          XValues={sumPotency[0]?.date}
          YValues={series}
        />
      </CardInfo>
      <CardInfo
        title="Potência da semana"
        className={styles.graphComplete}
        isLoading={sumPotency?.length === 0 || isWeeklyPorcentualLoading}
        isWeekly
        name={QUERIES.POTENCY_WEEKLY}
        action={getWeeklyPorcentual}
      >
        <LineChart
          height={250}
          width={700}
          XValues={potWeekday[0]?.date}
          YValues={seriesWeekday}
        />
      </CardInfo>
    </Grid>
  )
}

export default GeneralView
