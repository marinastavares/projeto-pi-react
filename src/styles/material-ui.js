import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#083787',
    },
    secondary: {
      main: '#fff',
    },
    custom: {
      pink: '#DC8474',
      blue: '#83B4BB',
      green: '#ADC26D',
      yellow: '#F6F193',
    },
    background: {
      default: 'white',
    },
  },
  typography: {
    h1: {
      fontSize: '32px',
      fontWeight: 'bold',
      fontFamily: 'Staatliches, cursive',
    },
    h2: {
      fontSize: '20px',
      fontWeight: '500',
      fontFamily: 'Staatliches, cursive',
      color: '#F79C84',
    },
    h3: {
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#BA6D45',
      textAlign: 'justify',
      fontFamily: 'Staatliches, cursive',
    },
    h4: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
    h5: {
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '1.33',
      color: '#BA6D45',
    },
    subtitle1: {
      fontSize: '16px',
      lineHeight: '1.5',
    },
  },
  root: {
    backgroundColor: 'white',
    fontFamily: 'Staatliches, cursive',
    button: {
      textTransform: 'capitalize',
    },
    input: {
      fontSize: '16px',
      appearance: 'none',
    },
  },
  overrides: {
    MuiDialogTitle: {
      root: {
        fontSize: '2px',
      },
    },
    MuiSvgIcon: {
      root: {
        height: '20px',
        width: '20px',
      },
    },
    MuiTypography: {
      body1: {
        fontSize: '16px',
        lineHeight: '1.5',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '16px',
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '16px',
        lineHeight: 'normal',
      },
    },
    MuiButton: {
      containedPrimary: {
        color: 'white',
      },
    },
  },
})
