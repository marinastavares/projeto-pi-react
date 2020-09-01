import React, { useMemo, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import Card from '@material-ui/core/Card'
// import AccessTimeIcon from '@material-ui/icons/AccessTime'
// import IconButton from '@material-ui/core/IconButton'
import CardActionArea from '@material-ui/core/CardActionArea'
import { Link as RouterLink } from '@reach/router'
import ReactApexChart from 'react-apexcharts'
import { format } from 'date-fns'
import { useTransition, animated } from 'react-spring'
import Typical from 'react-typical'

import { getMonitors } from 'modules/monitors/actions'
import { useModal, useResizer } from 'utils/hooks'
import svg from 'assets/energia.svg'

import DialogTime from './modal'
import useStyles from './styles'

const LandingPage = () => {
  const styles = useStyles()
  const { voltage } = useSelector(({ name }) => name.module1)
  const [open, toggle] = useModal()
  const isMobile = useResizer()
  const dispatch = useDispatch()
  const monitor = useSelector((state) => state.monitors.monitors[1])
  console.log('LandingPage -> monitor', monitor)

  const series = useMemo(
    () => [
      {
        name: 'Tensão',
        data: monitor?.dataV?.map((value) => value.value.toFixed(2)),
      },
    ],
    [monitor?.dataV?.map]
  )
  console.log('LandingPage -> series', series)

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
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Módulo 1',
        align: 'left',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 150],
        },
      },
      xaxis: {
        categories: monitor?.dataV?.map((value) =>
          format(new Date(value.date), 'HH:mm:ss')
        ),
      },
      yaxis: {
        min: 10,
        max: 250,
      },
      tooltip: {
        shared: false,
      },
    }),
    [monitor?.dataV?.map]
  )

  // useEffect(() => {
  //   dispatch(getMonitors())
  // }, [dispatch])

  return (
    <Grid className={styles.container}>
      <Grid className={styles.firstSection}>
        <Typography className={styles.title} component="h1" variant="h2">
          Sistema Web para monitoramento de energia do DAS
        </Typography>
      </Grid>
      {/* {!!monitor?.name && (
        <Card className={styles.charts}>
          <CardActionArea component={RouterLink} to="/modulo">
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Typography
                className={styles.cardTitle}
                color="secondary"
                component="h2"
                variant="h3"
              >
                Modulo 1
              </Typography>
            </Grid>
          </CardActionArea>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={isMobile ? 300 : 500}
          />
        </Card>
      )} */}
      {/* {open && <DialogTime open={open} handleClose={toggle} />} */}
    </Grid>
  )
}

export default LandingPage
