import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { Button, Grid, Divider, Typography, Select } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { useLocation } from '@reach/router'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import PropTypes from 'prop-types'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/esm/locale'

import { getLabs, setQuery } from 'modules/labs/actions'
import { menuSelector, labsSelector } from 'modules/labs/selectors'
import { transformDate } from 'utils/helpers'

import useStyles from './styles'
import Navbar from './navbar'

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
  const { currentLab } = useSelector(labsSelector)
  const dispatch = useDispatch()

  const handleClick = useCallback(
    (event) => {
      setDate(event.target.value)
      dispatch(setQuery(event.target.value))
    },
    [dispatch]
  )

  const showLastUpdate = useMemo(
    () =>
      location.pathname.replace('/', '') === currentLab.slug &&
      currentLab.updatedAt,
    [currentLab.slug, currentLab.updatedAt, location.pathname]
  )

  const currentHeader = useMemo(() => {
    const pathname = menuItems?.find((esp) => esp.route === location.pathname)
    console.log('currentHeader -> menuItems', menuItems)
    if (pathname) {
      return {
        icon: <EmojiObjectsIcon className={styles.iconHeader} />,
        title: pathname.name,
      }
    }
    if (location.pathname !== '/') {
      return {
        icon: <EmojiObjectsIcon className={styles.iconHeader} />,
        title: location.pathname.replace('/', '')?.toUpperCase(),
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
      <Navbar menuItems={menuItems} className={styles.navbar} />
      <Grid className={styles.content}>
        <Grid className={styles.header}>
          <Grid>
            <Grid container justify="space-between" alignItems="flex-end">
              <Typography
                component="h1"
                variant="h1"
                color="secondary"
                className={styles.title}
              >
                {currentHeader.icon}
                {currentHeader.title}
              </Typography>
              {showLastUpdate ? (
                <Typography
                  component="p"
                  variant="h4"
                  color="secondary"
                  className={styles.title}
                >
                  última atualização há{' '}
                  {formatDistance(new Date(currentLab.updatedAt), new Date(), {
                    locale: pt,
                  })}
                </Typography>
              ) : (
                ''
              )}
            </Grid>
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
        {menuItems.length && (
          <Grid className={styles.children}>{children}</Grid>
        )}
      </Grid>
    </Grid>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(App)
