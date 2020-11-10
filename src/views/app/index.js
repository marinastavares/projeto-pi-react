import React, { useMemo, useState, useCallback, useEffect } from 'react'
import {
  Grid,
  Divider,
  Typography,
  Select,
  AppBar,
  Toolbar,
  IconButton,
  SwipeableDrawer,
} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { useLocation, Redirect } from '@reach/router'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/esm/locale'
import EditIcon from '@material-ui/icons/Edit'
import MenuIcon from '@material-ui/icons/Menu'

import Loading from 'components/loading'
import { getLabs, setQuery } from 'modules/labs/actions'
import { menuSelector, labsSelector } from 'modules/labs/selectors'
import { transformDate } from 'utils/helpers'
import { useLocalStorage } from 'utils/hooks'

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

const NO_FILTER_INCLUDED = [
  '/',
  '/admin',
  '/registrar-ambiente',
  '/registrar-tecnico',
]
const PROTECTED_ROUTE = ['/admin', '/registrar-ambiente', '/registrar-tecnico']

const App = ({ children }) => {
  const styles = useStyles()
  const location = useLocation()
  const [selectDate, setDate] = useState('')
  const menuItems = useSelector(menuSelector)
  const { currentLab } = useSelector(labsSelector)
  const dispatch = useDispatch()
  const [isLoggedIn] = useLocalStorage('isLoggedIn')
  const [open, setOpen] = useState(false)

  const handleDrawerClose = () => {
    setOpen((prevState) => !prevState)
  }

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
    if (location.pathname === '/registrar-ambiente') {
      return {
        icon: <EditIcon className={styles.iconHeader} />,
        title: 'Registrar Ambiente',
      }
    }
    if (location.pathname === '/registrar-tecnico') {
      return {
        icon: <EditIcon className={styles.iconHeader} />,
        title: 'Registrar Técnico',
      }
    }
    if (location.pathname === '/admin') {
      return {
        icon: <EmojiObjectsIcon className={styles.iconHeader} />,
        title: 'Configurações',
      }
    }
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

  const hasFilter = useMemo(
    () => !NO_FILTER_INCLUDED.includes(location.pathname),
    [location.pathname]
  )

  if (PROTECTED_ROUTE.includes(location.pathname) && !isLoggedIn) {
    return <Redirect to="/login" noThrow />
  }

  return (
    <>
      <AppBar className={styles.headerBar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerClose}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={styles.title}>
            LMM
          </Typography>
        </Toolbar>
      </AppBar>

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
                    {formatDistance(
                      new Date(currentLab.updatedAt),
                      new Date(),
                      {
                        locale: pt,
                      }
                    )}
                  </Typography>
                ) : (
                  ''
                )}
              </Grid>
              <Divider className={styles.dividerHeader} />
            </Grid>
            {hasFilter && (
              <Grid container>
                {/* <Button
                  className={styles.headerButton}
                  color="secondary"
                  variant="outlined"
                >
                  <SettingsOutlinedIcon />
                </Button> */}
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
            )}
          </Grid>
          {menuItems.length ? (
            <Grid className={styles.children}>{children}</Grid>
          ) : (
            <Loading />
          )}
        </Grid>
      </Grid>
      <>
        <SwipeableDrawer
          anchor="right"
          open={open}
          onClose={handleDrawerClose}
          onOpen={handleDrawerClose}
        >
          <Navbar menuItems={menuItems} className={styles.navbarCell} />
        </SwipeableDrawer>
      </>
    </>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(App)
