import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { PieChart } from 'react-minimal-pie-chart'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import { useDispatch, useSelector } from 'react-redux'
import format from 'date-fns/format'

import {
  getMostEnergy,
  getEnergyAverage,
  getPeakCurrent,
} from 'modules/energy/actions'
import {
  mostUsedSelectors,
  mostUsedLoading,
  averageSelector,
  averageLoading,
  peakCurrentSelector,
} from 'modules/energy/selectors'
import { usePrevious } from 'utils/hooks'

import useStyles from './styles'
import CardInfo from './card-info'

const GeneralView = () => {
  const styles = useStyles()
  const mostUsed = useSelector(mostUsedSelectors)
  const isUsedLoading = useSelector(mostUsedLoading)
  const wasUsedLoading = usePrevious(isUsedLoading)
  const isAverageLoading = useSelector(averageLoading)
  const wasAverageLoading = usePrevious(isAverageLoading)
  const average = useSelector(averageSelector)
  const peakCurrent = useSelector(peakCurrentSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMostEnergy())
  }, [dispatch])

  useEffect(() => {
    if (!isUsedLoading && wasUsedLoading) {
      dispatch(getEnergyAverage())
    }
  }, [dispatch, isUsedLoading, wasUsedLoading])

  useEffect(() => {
    if (!isAverageLoading && wasAverageLoading) {
      dispatch(getPeakCurrent())
    }
  }, [dispatch, isAverageLoading, wasAverageLoading])

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
    </Grid>
  )
}

export default GeneralView
