import React, { useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { Link as RouterLink, useLocation } from '@reach/router'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import classnames from 'classnames'
import SettingsIcon from '@material-ui/icons/Settings'

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

const Navbar = () => {
  const styles = useStyles()
  const location = useLocation()

  const isSelected = useCallback((url) => url === location.pathname, [
    location.pathname,
  ])

  return (
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
          component={RouterLink}
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
            component={RouterLink}
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
        <Divider className={styles.divider} />
        <Button
          component={RouterLink}
          to="admin"
          className={classnames(styles.item, {
            [styles.selected]: isSelected('/admin'),
          })}
        >
          <Grid className={styles.button}>
            <SettingsIcon />
            Configurações
          </Grid>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default React.memo(Navbar)
