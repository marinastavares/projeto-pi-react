import { makeStyles } from '@material-ui/styles'

export default makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateRows: '200px 300px 300px 300px 300px 300px',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    height: '100%',
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
    gridColumn: '1 / 3',
  },
  graphComplete: {
    gridColumn: '1 / 4',
  },
  background: {
    '& .apexcharts-canvas.apexcharts-theme-dark': {
      background: 'transparent',
    },
  },
}))
