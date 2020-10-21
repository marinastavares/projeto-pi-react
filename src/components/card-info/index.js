import React from 'react'
import { Grid, Typography, Paper, IconButton, Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Ellipsis } from 'react-awesome-spinners'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'

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
      <Grid
        container
        justify="space-between"
        direction="row"
        alignItems="flex-start"
      >
        <Typography
          className={styles.width}
          component="h2"
          variant="h3"
          color="secondary"
        >
          {title}
        </Typography>
        <Tooltip title="Editar tempo">
          <IconButton size="small" color="secondary">
            <AccessAlarmIcon />
          </IconButton>
        </Tooltip>
      </Grid>
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
