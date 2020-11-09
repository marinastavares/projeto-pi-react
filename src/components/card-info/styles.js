import { makeStyles } from '@material-ui/styles'

export default makeStyles(() => ({
  card: {
    padding: '12px',
  },
  loading: {
    margin: '8px',
  },
  width: {
    width: '80%',
    display: 'block',
  },
  filterLabel: {
    width: '80%',
    fontSize: '10px',
  },
  title: {
    display: 'grid',
    gridTemplateColumns: '1fr 24px',
    alignItems: 'flex-start',
  },
}))
