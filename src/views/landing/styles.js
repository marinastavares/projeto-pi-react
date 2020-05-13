import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'repeat(2, auto)',
    gridGap: '52px',
  },
  logo: {
    marginLeft: '64px',
  },
  title: {
    fontFamily: 'Tw Cen MT Condensed',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 32,
    fontSize: '24px',
    color: 'black',
  },
}))
