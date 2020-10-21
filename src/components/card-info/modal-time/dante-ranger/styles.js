import { makeStyles } from '@material-ui/styles'

export default makeStyles(
  () => ({
    day: {
      margin: 0,
      width: 40,
      borderRadius: 0,
    },
    beginCap: {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    },
    endCap: {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    },
  }),
  { name: 'DateRangeWrapper' }
)
