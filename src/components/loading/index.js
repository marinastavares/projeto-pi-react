import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typical from 'react-typical'

import useStyles from './styles'

const Loading = () => {
  const styles = useStyles()

  return (
    <Grid container justify="center" alignItems="center">
      <Typical
        steps={[
          'Aguarde...',
          1500,
          'Estamos realizando a leitura dos módulos',
          500,
          '🕐',
          150,
          '🕑',
          150,
          '🕒',
          150,
          '🕓',
          150,
          '🕕',
          150,
          '🕖',
          150,
          '🕖',
          150,
          '🕗',
          150,
          '🕛',
          150,
          '💡',
          200,
        ]}
        loop={Infinity}
        wrapper="p"
        className={styles.color}
      />
    </Grid>
  )
}

export default Loading
