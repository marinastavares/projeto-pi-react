import React, { useMemo, useState, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Typography from '@material-ui/core/Typography'
import { useLocation } from '@reach/router'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import PropTypes from 'prop-types'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import useStyles from './styles'
import Navbar from './navbar'

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
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const currentHeader = useMemo(() => {
    const pathname = TEST_ESP.find((esp) => esp.route === location.pathname)
    if (pathname) {
      return {
        icon: <EmojiObjectsIcon className={styles.iconHeader} />,
        title: pathname.name,
      }
    }
    return {
      icon: <DashboardIcon className={styles.iconHeader} color="secondary" />,
      title: 'Dashboard',
    }
  }, [location.pathname, styles.iconHeader])

  return (
    <Grid container className={styles.container}>
      <Navbar />
      <Grid className={styles.content}>
        <Grid container justify="space-between" alignItems="center">
          <Grid>
            <Typography
              component="h1"
              variant="h1"
              color="secondary"
              className={styles.title}
            >
              {currentHeader.icon}
              {currentHeader.title}
            </Typography>
            <Divider className={styles.dividerHeader} />
          </Grid>
          <Grid container>
            <Button
              className={styles.headerButton}
              color="secondary"
              variant="outlined"
            >
              <SettingsOutlinedIcon />
            </Button>
            <Grid>
              <Button
                color="secondary"
                variant="outlined"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className={styles.selectButton}
              >
                24 horas
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={styles.menu}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
        {children}
      </Grid>
    </Grid>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(App)
