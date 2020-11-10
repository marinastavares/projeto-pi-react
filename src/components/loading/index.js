import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie'

import * as loader from 'assets/loader.json'

import useStyles from './styles'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loader.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}
const Loading = () => {
  const styles = useStyles()

  return (
    <Grid container className={styles.loading}>
      <FadeIn>
        <Grid
          container
          justify="center"
          direction="column"
          className="d-flex justify-content-center align-items-center"
        >
          <Typography
            align="center"
            component="h2"
            variant="h1"
            color="secondary"
          >
            Carregando dados
          </Typography>
          <Lottie options={defaultOptions} height={120} width={120} />
        </Grid>
      </FadeIn>
    </Grid>
  )
}

export default Loading
