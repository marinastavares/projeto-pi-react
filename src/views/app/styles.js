import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ palette }) => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '255px 1fr',
    gridTemplateRows: '100vh',
    fontFamily: 'Nunito',
    backgroundColor: palette.background,
  },
  content: {
    display: 'grid',
    gridTemplateRows: '45px 1fr',
    gridRowGap: '56px',
    padding: 56,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 2,
  },
  iconHeader: {
    height: '36px',
    width: '36px',
    marginRight: '16px',
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
}))
