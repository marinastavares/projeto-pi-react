import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import Card from '@material-ui/core/Card'
// import { Link as RouterLink } from '@reach/router'
import CardContent from '@material-ui/core/CardContent'
import ReactApexChart from 'react-apexcharts'

import { useResizer } from 'utils/hooks'

import useStyles from './styles'

const values = [
  {
    name: 'Tensão',
    value: 220,
    unit: 'V',
  },
  {
    name: 'Potência',
    value: 180,
    unit: 'W',
  },
  {
    name: 'Corrente',
    value: 1,
    unit: 'A',
  },
]

const Info = () => {
  const styles = useStyles()
  const { voltage } = useSelector(({ name }) => name.module1)
  const isMobile = useResizer()

  const voltageValue = useMemo(
    () => [
      {
        name: 'Tensão',
        data: voltage?.map((value) => Number(value.value)),
      },
    ],
    [voltage?.map]
  )

  const currentValue = useMemo(
    () => [
      {
        name: 'Corrente',
        data: voltage?.map((value) => Number(value.current)),
      },
    ],
    [voltage?.map]
  )

  const potencyValue = useMemo(
    () => [
      {
        name: 'Potência',
        data: voltage?.map((value) => Number(value.potency)),
      },
    ],
    [voltage?.map]
  )

  const options = useMemo(
    () => (color) => ({
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
      stroke: {
        colors: [color],
      },
      title: {
        text: 'Módulo 1',
        align: 'left',
      },
      fill: {
        type: 'gradient',
        colors: [color],
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: voltage?.map((value) => value.createdAt),
      },
      tooltip: {
        shared: false,
      },
    }),
    []
  )

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={styles.container}
    >
      <Typography className={styles.title} gutterBottom>
        Modulo 1
      </Typography>
      <Grid justify="center" item spacing={4} container direction="row">
        {values.map((value) => (
          <Grid key={value.name} spacing={4} item>
            <Card className={styles.card}>
              <CardContent>
                {' '}
                <Grid
                  container
                  alignItems="flex-start"
                  justify="start"
                  direction="column"
                >
                  <Typography className={styles.cardTitle} gutterBottom>
                    {value.name}
                  </Typography>
                  <Typography className={styles.value} gutterBottom>
                    {value.value} {value.unit}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid justify="center" className={styles.spacing} container>
        <Card className={styles.card}>
          <ReactApexChart
            options={options('red')}
            series={voltageValue}
            type="area"
            height={350}
            width={isMobile ? 300 : 500}
          />
        </Card>
        <Card className={styles.card}>
          <ReactApexChart
            options={options('blue')}
            series={currentValue}
            type="area"
            height={350}
            width={isMobile ? 300 : 500}
          />
        </Card>
        <Card className={styles.card}>
          <ReactApexChart
            options={options('pink')}
            series={potencyValue}
            type="area"
            height={350}
            width={isMobile ? 300 : 500}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default React.memo(Info)
