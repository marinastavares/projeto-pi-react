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
  TextField,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import {
  DatePicker,
  MuiPickersUtilsProvider,
  DateRangePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import ptLocale from 'date-fns/locale/pt'

import useStyles from './styles'

const TimeModal = ({
  title,
  hasTextFieldDescription,
  description,
  buttonLabel,
  onClose,
  onSave,
  placeholder,
  isLoading,
  previousValue,
}) => {
  const styles = useStyles()
  const [textValue, setValue] = useState(
    hasTextFieldDescription ? { subject: '', comment: '' } : previousValue
  )
  const [initialDate, handleInitialDateChange] = useState(new Date())
  const [finalDate, handleFinalDateChange] = useState(new Date())

  const onChange = useCallback(
    (event) => {
      const { value, name } = event.target
      if (hasTextFieldDescription) {
        setValue((prevValues) => ({ ...prevValues, [name]: value }))
        return
      }
      setValue(value)
    },
    [hasTextFieldDescription]
  )

  const onClick = useCallback(() => {
    onSave(textValue)
  }, [onSave, textValue])

  const multilineValue = hasTextFieldDescription ? textValue.comment : textValue

  return (
    <Dialog
      aria-labelledby="mudar-tempo-filtro"
      aria-describedby="descricao-da-modal"
      open
      className={styles.dialog}
      onClose={onClose}
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
          <DatePicker
            format="dd/MM/yyyy"
            label="Data inicial"
            inputVariant="outlined"
            value={initialDate}
            onChange={handleInitialDateChange}
            animateYearScrolling
            color="secondary"
            className={styles.picker}
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
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions component="footer" className={styles.footer}>
        <Button isLoading={isLoading} color="primary" onClick={onClick}>
          ALTERAR
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TimeModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  buttonLabel: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  previousValue: PropTypes.string,
  isLoading: PropTypes.bool,
  hasTextFieldDescription: PropTypes.bool,
}

TimeModal.defaultProps = {
  title: '',
  description: '',
  previousValue: '',
  placeholder:
    'Ex: O cliente gostou do imóvel e da localização e comentou que fará uma proposta.',
  isLoading: false,
  buttonLabel: 'SALVAR',
  hasTextFieldDescription: false,
}

export default React.memo(TimeModal)
