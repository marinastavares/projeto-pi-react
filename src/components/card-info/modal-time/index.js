import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  Grid,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import ptLocale from 'date-fns/locale/pt'
import classnames from 'classnames'
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'
import isSameDay from 'date-fns/isSameDay'
import endOfWeek from 'date-fns/endOfWeek'
import startOfWeek from 'date-fns/startOfWeek'
import isWithinInterval from 'date-fns/isWithinInterval'
import { useDispatch } from 'react-redux'

import { setCustomQuery } from 'modules/labs/actions'

import useStyles from './styles'

const makeJSDateObject = (date) => {
  if (date instanceof Date) {
    return new Date(date.getTime())
  }

  return date // handle case with invalid input
}

const TimeModal = ({
  description,
  onClose,
  isLoading,
  isWeekly,
  name,
  action,
}) => {
  const styles = useStyles()
  const [initialDate, handleInitialDateChange] = useState(new Date())
  const [finalDate, handleFinalDateChange] = useState(new Date())
  const [week, setWeek] = useState(new Date())
  const dispatch = useDispatch()

  const handleWeek = useCallback((date) => {
    setWeek(startOfWeek(makeJSDateObject(date)))
  }, [])

  const renderDay = useCallback(
    (date, selectedDate, dayInCurrentMonth) => {
      const dateClone = makeJSDateObject(date)
      const selectedDateClone = makeJSDateObject(selectedDate)

      const start = startOfWeek(selectedDateClone)
      const end = endOfWeek(selectedDateClone)

      const dayIsBetween = isWithinInterval(dateClone, { start, end })
      const isFirstDay = isSameDay(dateClone, start)
      const isLastDay = isSameDay(dateClone, end)

      const wrapperClassName = classnames({
        [styles.highlight]: dayIsBetween,
        [styles.firstHighlight]: isFirstDay,
        [styles.endHighlight]: isLastDay,
      })

      const dayClassName = classnames(styles.day, {
        [styles.nonCurrentMonthDay]: !dayInCurrentMonth,
        [styles.highlightNonCurrentMonthDay]:
          !dayInCurrentMonth && dayIsBetween,
      })

      return (
        <div className={wrapperClassName}>
          <IconButton className={dayClassName}>
            <span> {format(dateClone, 'd')} </span>
          </IconButton>
        </div>
      )
    },
    [
      styles.day,
      styles.endHighlight,
      styles.firstHighlight,
      styles.highlight,
      styles.highlightNonCurrentMonthDay,
      styles.nonCurrentMonthDay,
    ]
  )

  const formatWeekSelectLabel = useCallback((date, invalidLabel) => {
    const dateClone = makeJSDateObject(date)

    return dateClone && isValid(dateClone)
      ? `Semana do ${format(startOfWeek(dateClone), 'd')}`
      : invalidLabel
  }, [])

  const onSaveClick = useCallback(() => {
    dispatch(
      setCustomQuery({
        name,
        initialDate: initialDate.toISOString(),
        finalDate: finalDate.toISOString(),
      })
    )
    onClose()
    dispatch(action())
  }, [action, dispatch, finalDate, initialDate, name, onClose])

  return (
    <Dialog
      aria-labelledby="mudar-tempo-filtro"
      aria-describedby="descricao-da-modal"
      className={styles.dialog}
      onClose={onClose}
      open
    >
      <DialogTitle
        component="header"
        className={styles.header}
        disableTypography
      >
        <Grid>
          <Typography
            component="h1"
            variant="h3"
            id="mudar-tempo-filtro"
            color="secondary"
            className={styles.subject}
          >
            Alterar período de aquisição
          </Typography>
          <Typography
            id="descricao-da-modal"
            component="p"
            variant="body1"
            color="secondary"
          >
            {description}
          </Typography>
        </Grid>
        <IconButton
          aria-label="botão para fechar modal"
          size="small"
          onClick={onClose}
        >
          <Close color="secondary" />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.content}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
          {isWeekly ? (
            <DatePicker
              label="Selecione uma semana"
              value={week}
              onChange={handleWeek}
              renderDay={renderDay}
              formatWeekSelectLabel={formatWeekSelectLabel}
              inputVariant="outlined"
              className={styles.picker}
            />
          ) : (
            <>
              <DatePicker
                format="dd/MM/yyyy"
                label="Data inicial"
                inputVariant="outlined"
                value={initialDate}
                onChange={handleInitialDateChange}
                animateYearScrolling
                color="secondary"
                className={styles.picker}
                disableFuture
                maxDate={finalDate}
                maxDateMessage="Data inicial deve ser antes da final"
                variant="inline"
              />
              <DatePicker
                format="dd/MM/yyyy"
                label="Data final"
                inputVariant="outlined"
                value={finalDate}
                onChange={handleFinalDateChange}
                animateYearScrolling
                color="secondary"
                className={styles.picker}
                disableFuture
                variant="inline"
                minDate={initialDate}
                minDateMessage="Data final deve ser depois da inicial"
              />
            </>
          )}
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions component="footer" className={styles.footer}>
        <Button onClick={onSaveClick} isLoading={isLoading} color="primary">
          ALTERAR
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TimeModal.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isWeekly: PropTypes.bool,
  action: PropTypes.func,
}

TimeModal.defaultProps = {
  description: '',
  isLoading: false,
  isWeekly: false,
  name: '',
  action: () => {},
}

export default React.memo(TimeModal)
