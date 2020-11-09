import { makeStyles } from '@material-ui/styles'

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
  },
  newLab: {
    height: '3.2rem',
    margin: '0 8px',
  },
}))
