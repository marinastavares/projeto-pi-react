import React, { useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { Link as RouterLink, useLocation } from '@reach/router'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import PropTypes from 'prop-types'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import classnames from 'classnames'

import useStyles from './styles'

const TEST_ESP = [
  {
    name: 'Porta',
    route: '/esp-1',
  },
  {
    name: 'Corredor',
    route: '/esp-2',
  },
]

const App = ({ children }) => {
  const styles = useStyles()
  const location = useLocation()

  const isSelected = useCallback((url) => url === location.pathname, [
    location.pathname,
  ])

  return (
    <Grid container className={styles.container}>
      <AppBar color="primary" position="static" className={styles.header}>
        <Toolbar disableGutters className={styles.toolbar}>
          <Grid className={styles.logo} container alignItems="center">
            <Grid className={styles.icon}>
              <FlashOnIcon className={styles.flash} />
            </Grid>
            <Link component={RouterLink} className={styles.link} to="/">
              LMM
            </Link>
          </Grid>
          <Button
            component={Link}
            to="/dashboard"
            className={classnames(styles.item, {
              [styles.selected]: isSelected('/dashboard'),
            })}
          >
            <Grid className={styles.button}>
              <DashboardIcon />
              Dashboard
            </Grid>
          </Button>
          {TEST_ESP.map((esp) => (
            <Button
              key={esp.name}
              component={Link}
              to={esp.route}
              className={classnames(styles.item, {
                [styles.selected]: isSelected(esp.route),
              })}
            >
              <Grid className={styles.button}>
                <EmojiObjectsIcon />
                {esp.name}
              </Grid>
            </Button>
          ))}
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
