import { makeStyles } from '@material-ui/styles'

export default makeStyles(({ palette }) => ({
  container: {
    backgroundColor: palette.background,
    height: '100vh',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
  },
  paper: {
    width: '300px',
    padding: '36px',
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gap: '16px',
    justifyItems: 'center',
  },
  form: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gap: '16px',
    justifyItems: 'center',
    width: '100%',
  },
}))
