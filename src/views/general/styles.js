import { makeStyles } from '@material-ui/styles'

export default makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateAreas: "'more energy peak' 'graph graph other'",
    gridTemplateRows: 'repeat(3, 250px)',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  card: {
    padding: '12px',
  },
  chart: {
    margin: '16px 16px 0 0',
    width: '100px',
    height: '100px',
  },
  chartPeak: {
    width: '100px',
    height: '100px',
  },
  icon: {
    width: '70px',
    height: '70px',
  },
  energy: {
    marginTop: '32px',
  },
  peak: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  graph: {
    gridArea: 'graph',
  },
}))
