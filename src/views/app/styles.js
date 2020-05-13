import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100%',
    paddingBottom: '32px',
  },
  header: {
    backgroundColor: 'rgba(0,0,0, 0,5)',
  },
  content: {
    marginTop: 80,
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontSize: 28,
    fontWeight: 'bold',
    margin: '0 16px',
    fontFamily: 'Staatliches',
  },
}))
