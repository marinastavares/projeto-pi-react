import { makeStyles } from '@material-ui/styles'

export default makeStyles(({ palette }) => ({
  dialog: {
    '& .MuiDialog-paper': {
      width: '56rem',
      boxSizing: 'border-box',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1.6rem 1.6rem 1.6rem 2.4rem',
  },
  title: {
    margin: '1.6rem 0 0.8rem',
  },
  content: {
    padding: '0 2.4rem',
    marginBottom: '3.2rem',
  },
  textField: {
    '& .MuiOutlinedInput-input': {
      fontSize: '1.4rem',
    },
    '& .MuiFormHelperText-root': {
      color: palette.primary.main,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '0.4rem',
    },
  },
  footer: {
    padding: '0 2.4rem 1.6rem',
  },
  subjectTitle: {
    marginBottom: '1.6rem',
  },
  picker: {
    color: palette.secondary.main,
    '& .MuiInputBase-input': {
      color: palette.secondary.main,
    },
    '& .MuiPickersDay-day': {
      color: palette.primary.main,
    },
    '& .MuiFormLabel-root': {
      color: palette.secondary.dark,
    },
    '& .MuiPickersToolbar-toolbar': {
      backgroundColor: palette.secondary.dark,
    },
    '& .MuiPickersCalendarHeader-dayLabel': {
      color: palette.secondary.main,
    },
    '& .MuiPickersBasePicker-pickerView': {
      backgroundColor: palette.secondary.dark,
    },
  },
}))
