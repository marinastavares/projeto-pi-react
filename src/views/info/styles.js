import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    width: '100%',
    padding: '60px 180px',

    [theme.breakpoints.down('sm')]: {
      padding: '60px 20px',
    },
  },
  title: {
    fontSize: '32px',
    marginRight: 'auto',
  },
  cardTitle: {
    fontSize: '16px',
    textAlign: 'left',
  },
  value: {
    fontWeight: '500',
    fontSize: '24px',
    textAlign: 'center',
    margin: '0 auto',
  },
  card: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
}))
