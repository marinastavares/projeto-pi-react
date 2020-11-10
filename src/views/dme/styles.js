import { makeStyles } from '@material-ui/styles'

export default makeStyles(({ palette, breakpoints }) => ({
  container: {
    display: 'grid',
    gridTemplateRows: '60px 250px 300px 300px 300px 300px',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    height: '100%',
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '60px 250px 300px 500px 500px 500px 500px 500px',
    },
  },
  tabs: {
    [breakpoints.up('sm')]: {
      gridColumn: '1 / 4',
    },
    borderBottom: `0`,

    '& .PrivateTabIndicator-colorSecondary-342': {
      backgroundColor: palette.primary.main,
    },
  },
  tab: {
    '& .MuiTab-wrapper': {
      color: palette.secondary.main,
      textTransform: 'capitalize',
      fontSize: '16px',
    },
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
    [breakpoints.up('sm')]: {
      gridColumn: '1 / 3',
    },
  },
  graphComplete: {
    [breakpoints.up('sm')]: {
      gridColumn: '1 / 4',
    },
  },
  content: {
    [breakpoints.up('sm')]: {
      marginLeft: '72px',
    },
  },
  background: {
    '& .apexcharts-canvas.apexcharts-theme-dark': {
      background: 'transparent',
    },
  },
  loading: {
    margin: '0 150px',
  },
}))
