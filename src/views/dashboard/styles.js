import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(({ palette }) => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '255px 1fr',
    gridTemplateRows: '100vh',
    fontFamily: 'Nunito',
    backgroundColor: palette.background,
  },
  logo: {
    marginLeft: '1.6rem',
    marginBottom: '1.6rem',
  },
  header: {
    backgroundColor: palette.sidebar,
  },
  icon: {
    backgroundColor: palette.primary.main,
    height: '32px',
    width: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flash: {
    color: palette.selected,
  },
  link: {
    marginLeft: '16px',
    color: palette.selected,
    fontWeight: 'bold',
    fontSize: 30,
    textDecoration: 'none',
    marginTop: '0.2rem',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  toolbar: {
    display: 'grid',
    gridTemplateRows: 'auto',
    paddingTop: '2.4rem',
  },
  item: {
    color: palette.secondary.dark,
    paddingRight: '3.2rem',
    textTransform: 'capitalize',
    height: '56px',
    '&:hover': {
      color: palette.secondary.main,
      backgroundColor: fade(palette.secondary.light, 0.4),
      borderLeft: `0.2rem solid ${palette.secondary.main}`,
    },
    '& .MuiButton-startIcon': {
      marginRight: '1.6rem',
      marginLeft: 8,
    },
  },
  selected: {
    color: palette.secondary.main,
    backgroundColor: fade(palette.secondary.light, 0.4),
    borderLeft: `0.2rem solid ${palette.secondary.main}`,
  },
  button: {
    display: 'grid',
    gridTemplateColumns: '20px 100px',
    gap: '16px',
    alignItems: 'center',
  },
}))
