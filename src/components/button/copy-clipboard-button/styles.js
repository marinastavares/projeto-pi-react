import { makeStyles } from '@material-ui/styles'

export default makeStyles(({ palette }) => ({
  copyButton: {
    backgroundColor: palette.gray.light,
    borderColor: palette.gray.default,
    height: '4rem',
    fontSize: '1.6rem',
    '&:hover': {
      borderColor: palette.gray.default,
    },
  },
  iconButton: {
    width: '4rem',
  },
}))
