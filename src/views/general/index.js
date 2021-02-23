import React, { useEffect, useCallback } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { PieChart } from 'react-minimal-pie-chart'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import { useDispatch, useSelector } from 'react-redux'
import format from 'date-fns/format'

import MultipleChart from 'components/weekday-charts'
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
import { useOnSuccessCall, useWindowSize } from 'utils/hooks'
import { QUERIES } from 'utils/helpers'
import CardInfo from 'components/card-info'
import DonutChart from 'components/donut-chart'
import ColumnChart from 'components/column-chart'

import useStyles from './styles'

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
  const { isMobile } = useWindowSize()

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
  const porcentualLab = useCallback(() => {
    if (allQueries?.[QUERIES.WEEKLY_ENERGY]) {
      return
    }
    dispatch(getPorcentualLab())
  }, [allQueries, dispatch])
  const sumHourAction = useCallback(() => {
    if (allQueries?.[QUERIES.PERCENTAGE_ENERGY]) {
      return
    }
    dispatch(getSumHour())
  }, [allQueries, dispatch])
  const weeklyPorcentualAction = useCallback(() => {
    dispatch(getWeeklyPorcentual())
  }, [dispatch])

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
          {totalEnergyMonth?.toFixed(2)} kWh
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
          {average??.toFixed(2)} kWh
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
        action={getWeeklyEnergy}
        isWeekly
      >
        <ColumnChart value={weeklyEnergy} />
      </CardInfo>
      <CardInfo
        title="Porcentagem de energia consumida"
        isLoading={porcentual?.length === 0 || isPorcentualLoading}
        hasTime
        name={QUERIES.PERCENTAGE_ENERGY}
        action={getPorcentualLab}
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
        isLoading={sumPotency?.length === 0 || isWeeklyPorcentualLoading}
        isWeekly
        name={QUERIES.SUM_POTENCY}
        action={getSumHour}
        noGrid
        containerClassName={styles.lineGraph}
      >
        <MultipleChart
          dataValues={Object.values(sumPotency)}
          isMobile={isMobile}
        />
      </CardInfo>
      <CardInfo
        title="Potência da semana"
        className={styles.graphComplete}
        isLoading={sumPotency?.length === 0}
        isWeekly
        name={QUERIES.POTENCY_WEEKLY}
        action={getWeeklyPorcentual}
        noGrid
        containerClassName={styles.lineGraph}
      >
        <MultipleChart
          isString
          dataValues={Object.values(potWeekday)}
          isMobile={isMobile}
        />
      </CardInfo>
    </Grid>
  )
}

export default GeneralView
