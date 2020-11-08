import { makeStyles } from '@material-ui/styles'

export default makeStyles(({ palette }) => ({
  button: {
    height: '4rem',
    width: '4rem',
    backgroundColor: palette.gray.light,
    border: `0.1rem solid ${palette.gray.default}`,
    color: palette.text.primary,

    '&:hover': {
      border: `0.1rem solid ${palette.gray.default}`,
      backgroundColor: palette.gray.gallery,
    },
    '& .Mui-disabled': {
      backgroundColor: palette.text.disabled,
    },
  },
  tooltip: {
    '& .MuiTooltip-arrow': {
      color: palette.secondary.main,
    },
  },
}))
