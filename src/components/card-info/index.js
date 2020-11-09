import React from 'react'
import { Grid, Typography, Paper, IconButton, Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Ellipsis } from 'react-awesome-spinners'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

import { useModal } from 'utils/hooks'

import useStyles from './styles'
import ModalTime from './modal-time'

const CardInfo = ({
  title,
  children,
  className,
  containerClassName,
  isLoading,
  name,
  isWeekly,
  hasTime,
  action,
  noGrid,
}) => {
  const styles = useStyles()
  const [isModalTime, setModal] = useModal()
  const currentQuery = useSelector((state) => state.labs.allQueries[name])

  return (
    <>
      <Paper variant="outlined" className={classnames(styles.card, className)}>
        <Grid className={styles.title}>
          <Grid container direction="column">
            <Typography
              className={styles.width}
              component="h2"
              variant="h3"
              color="secondary"
            >
              {title}
            </Typography>
            {hasTime && (
              <Typography
                className={styles.filterLabel}
                component="span"
                variant="subtitle2"
                color="secondary"
              >
                {currentQuery?.initialDate
                  ? `Filtro entre ${format(
                      new Date(currentQuery?.initialDate),
                      'dd/MM/yyyy'
                    )} até ${format(
                      new Date(currentQuery?.finalDate),
                      'dd/MM/yyyy'
                    )}`
                  : 'Filtro das últimas 24h'}
              </Typography>
            )}
          </Grid>
          {(hasTime || isWeekly) && (
            <Tooltip title="Editar tempo">
              <IconButton onClick={setModal} size="small" color="secondary">
                <AccessAlarmIcon />
              </IconButton>
            </Tooltip>
          )}
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
            justify={noGrid ? 'flex-start' : 'center'}
            className={containerClassName}
          >
            {children}
          </Grid>
        )}
      </Paper>
      {isModalTime && (
        <ModalTime
          name={name}
          isWeekly={isWeekly}
          onClose={setModal}
          action={action}
        />
      )}
    </>
  )
}

CardInfo.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  containerClassName: PropTypes.string,
  isLoading: PropTypes.bool,
  hasTime: PropTypes.bool,
  noGrid: PropTypes.bool,
  isWeekly: PropTypes.bool,
  children: PropTypes.node.isRequired,
  action: PropTypes.func.isRequired,
}

CardInfo.defaultProps = {
  title: '',
  className: '',
  containerClassName: '',
  name: '',
  isLoading: false,
  hasTime: false,
  isWeekly: false,
  noGrid: false,
}
export default React.memo(CardInfo)
