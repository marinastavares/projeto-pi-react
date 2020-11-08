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
    margin: '8px',
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
  dayWrapper: {
    position: 'relative',
  },
  day: {
    width: 36,
    height: 36,
    margin: '0 2px',
    color: 'inherit',
    fontSize: '12px',
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: `1px solid ${palette.secondary.main}`,
    borderRadius: '50%',
  },
  nonCurrentMonthDay: {
    color: palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: palette.primary.main,
    color: palette.common.white,
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
}))
