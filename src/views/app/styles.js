import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  container: {
    width: '100vw',
    height: '100%',
    paddingBottom: '32px',
  },
  header: {
    backgroundColor: 'rgba(0,0,0, 0,5)',
  },
  content: {
    width: '100%',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 28,
    fontWeight: 'bold',
    margin: '0 16px',
    fontFamily: 'Staatliches',
  },
}))
