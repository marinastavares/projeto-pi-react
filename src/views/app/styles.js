import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ palette, breakpoints }) => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '255px 1fr',
    gridTemplateRows: '100vh',
    fontFamily: 'Nunito',
    backgroundColor: palette.background,
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  content: {
    display: 'grid',
    gridTemplateRows: '45px 1fr',
    gridRowGap: '56px',
    padding: 56,
    backgroundColor: palette.background,
    height: 'fit-content',
    gridColumn: 2,

    [breakpoints.down('sm')]: {
      gridColumn: 1,
      padding: 12,
      gridRowGap: '16px',
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 2,

    [breakpoints.down('sm')]: {
      fontSize: '24px',
    },
  },
  iconHeader: {
    height: '36px',
    width: '36px',
    marginRight: '16px',

    [breakpoints.down('sm')]: {
      height: '24px',
      width: '24px',
    },
  },
  dividerHeader: {
    backgroundColor: palette.secondary.main,
    width: '40vw',
  },
  headerButton: {
    width: '40px',
    height: '40px',
    border: `2.5px solid ${palette.secondary.main}`,
  },
  menu: {
    '& .MuiMenuItem-root': {
      backgroundColor: 'white',
    },
  },
  selectButton: {
    border: `2.5px solid ${palette.secondary.main}`,
    fontWeight: '500',
    height: '40px',
    margin: '0 8px',

    '&:hover': {
      border: `2.5px solid ${palette.secondary.main}`,
    },
  },
  selectDate: {
    border: `2.5px solid ${palette.secondary.main}`,
    fontWeight: '500',
    height: '40px',
    margin: '0 8px',
    width: '120px',
    color: palette.secondary.main,
  },
  menuItem: {
    backgroundColor: 'white',

    '&:hover': {
      backgroundColor: palette.secondary.dark,
      color: 'black',
    },
  },
  header: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  children: {
    height: '100%',
    width: '100%',
  },
  navbar: {
    zIndex: 20,
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    overflowX: 'hidden',
    width: '260px',

    '& .MuiAppBar-positionFixed': {
      left: 0,
      right: 'auto',

      [breakpoints.down('sm')]: {
        bottom: 0,
      },
    },

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  navbarCell: {
    zIndex: 20,
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    overflowX: 'hidden',
    width: '260px',

    '& .MuiAppBar-positionFixed': {
      left: 0,
      right: 'auto',

      [breakpoints.down('sm')]: {
        bottom: 0,
      },
    },
  },
  headerBar: {
    height: '64px',
    backgroundColor: '#20263C',

    [breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}))
