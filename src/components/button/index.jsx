import React from 'react'
import { Button as MUIButton, Grid } from '@material-ui/core'
import { PulseLoader } from 'react-spinners'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link as RouterLink } from '@reach/router'

import useStyles from './styles'

export const ButtonColor = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  WHITE: 'white',
  BLACK: 'black',
}

export const ButtonTheme = {
  WHITE_BACKGROUND: 'whiteBackground',
  LIGHT_GRAY: 'lightGray',
  ICON: 'icon',
  GREEN: 'green',
}

export const ButtonVariant = {
  OUTLINED: 'outlined',
  CONTAINED: 'contained',
}

const Button = ({ isLoading, children, color, disabled, theme, className, to, ...otherProps }) => {
  const styles = useStyles()

  return (
    <MUIButton
      component={to ? RouterLink : 'button'}
      className={classnames(className, styles[theme])}
      disabled={isLoading || disabled}
      color={color}
      disableElevation
      to={to}
      {...otherProps}
    >
      {isLoading ? (
        <Grid className={styles.loading}>
          <PulseLoader
            sizeUnit="px"
            size={8}
            margin="4px"
            color={color === ButtonColor.PRIMARY ? ButtonColor.WHITE : ButtonColor.BLACK}
            loading
          />
        </Grid>
      ) : (
        children
      )}
    </MUIButton>
  )
}

Button.propTypes = {
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  theme: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  isLoading: false,
  disabled: false,
  color: ButtonColor.PRIMARY,
  theme: '',
  className: '',
  to: '',
}

export default React.memo(Button)
