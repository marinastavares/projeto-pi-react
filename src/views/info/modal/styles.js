import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'repeat(2, auto)',
    gridTemplateColumns: '1fr',
    gridGap: '52px',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '36px',
    color: 'white',
    textAlign: 'center',
  },
  firstSection: {
    backgroundColor: theme.palette.custom.yellow,
    padding: theme.spacing(5),
    width: '100%',
  },
  charts: {
    margin: '0 auto',
    padding: '16px',
  },
  cardTitle: {
    marginLeft: '12px',
  },
  button: {
    marginRight: '14px',
  },
}))
