import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  content: {
    width: '100%',
  },
  container: {
    display: 'flex',
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
  header: {
    display: 'grid',
    gridTemplateRows: '52px',
  },
}))
