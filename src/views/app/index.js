import React from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from '@reach/router'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import useStyles from './styles'

const App = ({ children }) => {
  const styles = useStyles()

  return (
    <Grid className={styles.container}>
      <AppBar color="primary" component="div">
        <Toolbar>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="column"
          >
            <Link component={RouterLink} className={styles.link} to="/">
              LMM
            </Link>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid className={styles.content}>{children}</Grid>
    </Grid>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(App)
