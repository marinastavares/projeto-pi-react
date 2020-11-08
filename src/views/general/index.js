import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { PieChart } from 'react-minimal-pie-chart'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import { useDispatch, useSelector } from 'react-redux'
import format from 'date-fns/format'

// import ModalTime from 'components/card-info/modal-time'
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
import { querySelector } from 'modules/labs/selectors'
import { useOnSuccessCall, usePrevious } from 'utils/hooks'
import CardInfo from 'components/card-info'
import LineChart from 'components/line-chart'
import DonutChart from 'components/donut-chart'
import ColumnChart from 'components/column-chart'

import useStyles from './styles'

const GeneralView = () => {
  const styles = useStyles()
  // const mostUsed = useSelector(mostUsedSelectors)
  const query = useSelector(querySelector)
  const lastQuery = usePrevious(query)
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

  useEffect(() => {
    dispatch(getMostEnergy())
  }, [dispatch])

  useEffect(() => {
    if (query?.finalDate !== lastQuery?.finalDate) {
      dispatch(getMostEnergy())
    }
  }, [dispatch, lastQuery?.finalDate, query?.finalDate])

  const averageAction = () => dispatch(getEnergyAverage())
  const peakCurrentAction = () => dispatch(getPeakCurrent())
  const weeklyEnergyAction = () => dispatch(getWeeklyEnergy())
  const sumHourAction = () => dispatch(getSumHour())
  const porcentualLab = () => dispatch(getPorcentualLab())
  const weeklyPorcentualAction = () => dispatch(getWeeklyPorcentual())

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

  // if (!mostUsed.length) {
  //   return null
  // }
  return (
    <Grid className={styles.container}>
      <CardInfo
        title="Gasto total de energia"
        containerClassName={styles.energy}
        isLoading={isUsedLoading}
        hasTime
        name="totalEnergyMonth"
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
        name="average"
      >
        <FlashOnIcon color="primary" className={styles.icon} />
        <Typography component="p" variant="h1" color="secondary">
          {average?.toFixed(2)} kWh
        </Typography>
      </CardInfo>
      <CardInfo
        title="Pico de corrente"
        isLoading={!peakCurrent.lab || isPeakCurrentLoading}
        containerClassName={styles.peak}
        hasTime
        name="peakOfCurrent"
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
        title="Energia gasta da semana"
        className={styles.graph}
        isLoading={weeklyEnergy?.length === 0 || isWeeklyEnergyLoading}
        hasTime
        name="weeklyEnergy"
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
        name="sumPotency"
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
        name="potencyWeekly"
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
