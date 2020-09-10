import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#3751FF',
    },
    secondary: {
      main: '#DDE2FF',
      dark: '#A4A6B3',
      light: '#9FA2B4',
    },
    text: {
      primary: '#4F4F4F',
      secondary: '#151522',
    },
    sidebar: '#363740',
    divider: '#BDBDBD',
    selected: '#E5E8FF',
    background: '#F7F8FC',
  },
  typography: {
    h1: {
      fontSize: '36px',
      fontWeight: 'normal',
      fontFamily: 'Nunito',
    },
    h2: {
      fontSize: '24px',
      fontWeight: '500',
    },
    h3: {
      fontSize: '20px',
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
    backgroundColor: '#F7F8FC',
    fontFamily: 'Nunito',
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
