import React, { useEffect, useCallback } from 'react'
import { Grid, Tooltip, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CloudDoneIcon from '@material-ui/icons/CloudDone'
import CloudOffIcon from '@material-ui/icons/CloudOff'
import WifiIcon from '@material-ui/icons/Wifi'
import WifiOffIcon from '@material-ui/icons/WifiOff'
import { Link } from '@reach/router'

import { getAllLabs } from 'modules/labs/actions'
import { changeStatusDME } from 'modules/dme/actions'
import { useWindowSize } from 'utils/hooks'

import useStyles from './styles'

const Configuration = () => {
  const styles = useStyles()
  const allLabs = useSelector((state) => state.dme.listAllLabs)
  const { isTablet } = useWindowSize()

  const dispatch = useDispatch()

  // if (!mostUsed.length) {
  //   return null
  // }
  const handleLabsState = useCallback(
    (event) => {
      const { name, id } = event.currentTarget
      dispatch(changeStatusDME(id, name))
    },
    [dispatch]
  )
  useEffect(() => {
    dispatch(getAllLabs())
  }, [dispatch])
  return (
    <Grid className={styles.container}>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        direction={isTablet ? 'column-reverse' : 'row'}
      >
        <Typography color="secondary" variant="h6" className={styles.title}>
          Ambientes com os todos os idDMEs
        </Typography>
        <Grid>
          <Button
            component={Link}
            className={styles.newLab}
            color="secondary"
            variant="outlined"
            to="/registrar-ambiente"
            size="small"
          >
            Criar ambiente
          </Button>
          <Button
            component={Link}
            className={styles.newLab}
            color="secondary"
            variant="outlined"
            to="/registrar-tecnico"
            size="small"
          >
            Criar usuário
          </Button>
        </Grid>
      </Grid>
      {allLabs &&
        Object.entries(allLabs).map((values) => (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon color="secondary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                color="secondary"
                variant="h2"
                className={styles.heading}
              >
                {values[0]}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid className={styles.demo}>
                <List dense>
                  {values[1].map((dme) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Tooltip
                          title={dme.status ? 'DME ativo' : 'DME desativo'}
                        >
                          <Avatar className={styles.primary}>
                            {dme.status ? (
                              <CloudDoneIcon color="secondary" />
                            ) : (
                              <CloudOffIcon color="secondary" />
                            )}
                          </Avatar>
                        </Tooltip>
                      </ListItemAvatar>
                      <ListItemText
                        color="secondary"
                        primary={dme.idDME}
                        primaryTypographyProps={{
                          color: 'secondary',
                          variant: 'h3',
                        }}
                      />
                      <ListItemSecondaryAction>
                        <Tooltip
                          title={dme.status ? 'Desativar DME' : 'Ativar DME'}
                        >
                          <IconButton
                            color="secondary"
                            edge="end"
                            aria-label="delete"
                            id={dme.idDME}
                            name={values[0]}
                            onClick={handleLabsState}
                          >
                            {dme.status ? (
                              <WifiOffIcon color="secondary" />
                            ) : (
                              <WifiIcon color="secondary" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </Grid>
  )
}

export default Configuration
