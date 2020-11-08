import { makeStyles } from '@material-ui/styles'

export default makeStyles(({ palette: { secondary } }) => ({
  select: {
    width: '300px',
    // backgroundColor: 'white',
    '& .MuiSelect-selectMenu': {
      height: 'auto',
    },
    '& .MuiOutlinedInput-input': {
      padding: '1rem 1.4rem',
    },
  },
  error: {
    fontSize: '14px',
  },
  control: {
    '& .MuiFormHelperText-root': {
      fontSize: '12px',
      color: secondary.main,
    },
    // '& input': {
    //   padding: '0 1.4rem',
    // },
    // '& label': {
    //   top: '-0.35rem',
    //   opacity: 0.8,
    // },
    // "& label[data-shrink='true']": {
    //   top: 0,
    // },
  },
}))
