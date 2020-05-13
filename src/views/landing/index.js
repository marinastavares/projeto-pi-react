import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import useStyles from './styles'

const LandingPage = () => {
  const styles = useStyles()

  return (
    <Grid className={styles.container}>
      <Grid container justify="center" alignItems="flex-end">
        {/* <img className={styles.logo} alt="logo" src={colagem} /> */}
        <Grid xs={4} alignItems="center" container>
          {/* <img alt="Lá da rua" src={logo} /> */}
          <Typography className={styles.title} component="h1" variant="h2">
            Microempreendedores da minha, da sua e das nossas ruas
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default React.memo(LandingPage)
