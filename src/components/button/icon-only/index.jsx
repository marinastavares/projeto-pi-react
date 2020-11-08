import React from 'react'
import { Tooltip, Button as MUIButton } from '@material-ui/core'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import useStyles from './styles'

const ButtonRef = React.forwardRef((props, ref) => (
  <MUIButton {...props} ref={ref}>
    {props.children}
  </MUIButton>
))

const IconStyledButton = ({ tooltipText, icon, className, ...otherProps }) => {
  const styles = useStyles()

  return (
    <Tooltip className={styles.tooltip} title={tooltipText} enterDelay={0} arrow>
      <ButtonRef
        className={classnames(styles.button, className)}
        variant="outlined"
        color="secondary"
        aria-label={tooltipText}
        {...otherProps}
      >
        {icon}
      </ButtonRef>
    </Tooltip>
  )
}

ButtonRef.propTypes = {
  children: PropTypes.node.isRequired,
}

IconStyledButton.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  className: PropTypes.string,
}

IconStyledButton.defaultProps = {
  className: '',
}

export default React.memo(IconStyledButton)
