import React from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Ellipsis } from 'react-awesome-spinners'

import useStyles from './styles'

const CardInfo = ({
  title,
  children,
  className,
  containerClassName,
  isLoading,
}) => {
  const styles = useStyles()
  return (
    <Paper variant="outlined" className={classnames(styles.card, className)}>
      <Typography component="h2" variant="h2" color="secondary">
        {title}
      </Typography>
      {isLoading ? (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={styles.loading}
        >
          <Ellipsis color="#DDE2FF" />
        </Grid>
      ) : (
        <Grid
          container
          alignItems="center"
          justify="center"
          className={containerClassName}
        >
          {children}
        </Grid>
      )}
    </Paper>
  )
}

CardInfo.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

CardInfo.defaultProps = {
  title: '',
  className: '',
  containerClassName: '',
  isLoading: false,
}
export default React.memo(CardInfo)
