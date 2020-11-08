import React from 'react'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import useStyles from './styles'

const WhiteSelect = ({
  placeholder,
  className,
  options,
  label,
  helperText,
  ...otherProps
}) => {
  const styles = useStyles()

  return (
    <FormControl
      variant="outlined"
      className={classnames(className, styles.control)}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        className={styles.select}
        variant="outlined"
        placeholder={placeholder}
        displayEmpty
        label={label}
        fullWidth
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      >
        <MenuItem disabled value="">
          {placeholder}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText className={styles.error} error>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

WhiteSelect.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })
    ),
  ]).isRequired,
}

WhiteSelect.defaultProps = {
  placeholder: '',
  className: '',
  label: '',
  helperText: '',
}

export default React.memo(WhiteSelect)
