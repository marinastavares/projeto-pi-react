import React, { useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'
import Card from '@material-ui/core/Card'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import IconButton from '@material-ui/core/IconButton'

import { useModal, useResizer } from 'utils/hooks'

import DialogTime from './modal'
import useStyles from './styles'

const LandingPage = () => {
  const styles = useStyles()
  const { voltage } = useSelector(({ name }) => name.module1)
  const [open, toggle] = useModal()
  const isMobile = useResizer()

  const onToggleClick = useCallback(() => toggle(), [toggle])

  return (
    <Grid className={styles.container}>
      <Grid className={styles.firstSection}>
        <Typography className={styles.title} component="h1" variant="h2">
          Sistema Web para monitoramento de energia do DAS
        </Typography>
      </Grid>
      <Card className={styles.charts}>
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
          <IconButton
            className={styles.button}
            edge="end"
            color="primary"
            aria-label="menu"
            onClick={onToggleClick}
          >
            <AccessTimeIcon fontSize="36px" />
          </IconButton>
        </Grid>
        <LineChart
          width={isMobile ? 250 : 600}
          height={isMobile ? 150 : 300}
          data={voltage}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line
            type="monotone"
            name="Tensão"
            dataKey="value"
            stroke="#8884d8"
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis fontFamily="Roboto, sans-serif" dataKey="createdAt" />
          <YAxis
            fontFamily="Roboto, sans-serif"
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Legend />
          <Tooltip />
        </LineChart>
      </Card>
      {open && <DialogTime open={open} handleClose={onToggleClick} />}
    </Grid>
  )
}

export default React.memo(LandingPage)
