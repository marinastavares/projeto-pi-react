import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'repeat(2, auto)',
    gridGap: '52px',
    alignItems: 'center',
    width: '100%',
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
    boxSizing: 'border-box',
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
