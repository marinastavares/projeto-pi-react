import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { DateTimePicker, MuiPickersContext } from '@material-ui/pickers'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import {
  checkInTime,
  checkOutTime,
  dateTimeFormat,
} from 'holymotors-constants-date'
import { useStyles as useOriginalStyles } from '@material-ui/pickers/DatePicker/components/Day'

import useStyles from './styles'

function DateRangeWrapper({
  value,
  onChange,
  labelFunc,
  format,
  emptyLabel,
  onClose,
  ...props
}) {
  const [begin, setBegin] = useState(value[0])
  const [end, setEnd] = useState(value[1])
  const [hover, setHover] = useState(undefined)
  const originalClasses = useOriginalStyles()
  const classes = useStyles()
  const utils = useContext(MuiPickersContext)

  const min = Math.min(begin, end || hover)
  const max = Math.max(begin, end || hover)

  function renderDay(day, selectedDate, dayInCurrentMonth, dayComponent) {
    return React.cloneElement(dayComponent, {
      onClick: (e) => {
        e.stopPropagation()
        if (!begin) setBegin(day)
        else if (!end) {
          setEnd(day)
        } else {
          setBegin(day)
          setEnd(undefined)
        }
      },
      onMouseEnter: (e) => setHover(day),
      className: classNames(originalClasses.day, classes.day, {
        [originalClasses.hidden]: dayComponent.props.hidden,
        [originalClasses.current]: dayComponent.props.current,
        [originalClasses.dayDisabled]: dayComponent.props.disabled,
        [originalClasses.daySelected]:
          utils.isSameDay(day, min) ||
          utils.isSameDay(day, max) ||
          (day >= min && day <= max),
        [classes.beginCap]: utils.isSameDay(day, min),
        [classes.endCap]: utils.isSameDay(day, max),
      }),
    })
  }

  const formatDate = (date) => utils.format(date, dateTimeFormat)

  return (
    <DateTimePicker
      {...props}
      fullWidth
      value={begin}
      renderDay={renderDay}
      onClose={onClose}
      onChange={(date) => {
        onChange([begin, end].sort((a, b) => a - b))
      }}
      onClear={() => {
        setBegin(undefined)
        setEnd(undefined)
        setHover(undefined)
        onChange([])
      }}
      labelFunc={(date, invalid) =>
        labelFunc
          ? labelFunc(
              [begin, end].sort((a, b) => a - b),
              invalid
            )
          : date && begin && end
          ? [begin, end]
              .sort((a, b) => a - b)
              .map(formatDate)
              .join(' - ')
          : emptyLabel || ''
      }
    />
  )
}

DateRangeWrapper.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  labelFunc: PropTypes.func,
  format: PropTypes.string,
  emptyLabel: PropTypes.string,
  onClose: PropTypes.func,
}

export default DateRangeWrapper
