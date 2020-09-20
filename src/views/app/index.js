import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { Button, Grid, Divider, Typography, Select } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { useLocation } from '@reach/router'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import PropTypes from 'prop-types'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import MenuItem from '@material-ui/core/MenuItem'
import subDays from 'date-fns/subDays'
import { useDispatch, useSelector } from 'react-redux'

import { getLabs, setQuery } from 'modules/labs/actions'
import { menuSelector } from 'modules/labs/selectors'

import useStyles from './styles'
import Navbar from './navbar'

const transformDate = (difference) =>
  `initialDate=${new Date().toISOString()}&finalDate=${subDays(
    new Date(),
    difference
  ).toISOString()}`

const SELECT_OPTIONS = [
  {
    label: '24 horas',
    value: '',
  },
  {
    label: '2 Dias',
    value: transformDate(2),
  },
  {
    label: '7 Dias',
    value: transformDate(7),
  },
  {
    label: '14 Dias',
    value: transformDate(14),
  },
  {
    label: '21 Dias',
    value: transformDate(21),
  },
  {
    label: '30 Dias',
    value: transformDate(30),
  },
]

const App = ({ children }) => {
  const styles = useStyles()
  const location = useLocation()
  const [selectDate, setDate] = useState('')
  const menuItems = useSelector(menuSelector)
  const dispatch = useDispatch()

  const handleClick = useCallback(
    (event) => {
      setDate(event.target.value)
      dispatch(setQuery(event.target.value))
    },
    [dispatch]
  )

  const currentHeader = useMemo(() => {
    const pathname = menuItems?.find((esp) => esp.route === location.pathname)
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
  }, [location.pathname, menuItems?.find, styles.iconHeader])

  useEffect(() => {
    dispatch(getLabs())
  }, [dispatch])

  return (
    <Grid container className={styles.container}>
      <Navbar menuItems={menuItems} />
      <Grid className={styles.content}>
        <Grid className={styles.header}>
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
              <Select
                color="secondary"
                variant="outlined"
                className={styles.selectDate}
                displayEmpty
                value={selectDate}
                onChange={handleClick}
              >
                {SELECT_OPTIONS.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    className={styles.menuItem}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Grid>
        {menuItems.length && <Grid container>{children}</Grid>}
      </Grid>
    </Grid>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(App)
