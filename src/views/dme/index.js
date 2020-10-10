import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { Grid, Typography, Tabs, Tab } from '@material-ui/core'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from '@reach/router'

import {
  getDMEInfo,
  GET_DME_INFO,
  getDmeA,
  GET_DME_A,
  getDmeV,
  GET_DME_V,
  getDmeW,
  GET_DME_W,
  getDmeE,
} from 'modules/dme/actions'
import { getLab, GET_LAB } from 'modules/labs/actions'
import { dmeSelector } from 'modules/dme/selectors'
import { querySelector, labsSelector } from 'modules/labs/selectors'
import { useOnSuccessCall, usePrevious } from 'utils/hooks'
import CardInfo from 'components/card-info'
import LineChart from 'components/line-chart'
import DonutChart from 'components/donut-chart'
import ColumnChart from 'components/column-chart'

import useStyles from './styles'

const DMEView = () => {
  const styles = useStyles()
  const { currentLab } = useSelector(labsSelector)
  const listDMEs = useSelector(dmeSelector)
  const dispatch = useDispatch()
  const { lab } = useParams()
  const [value, setValue] = useState(0)

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue)
  }, [])

  const currentDMEId = useMemo(
    () => currentLab?.pontosDeMedicao?.[value].idDME,
    [currentLab?.pontosDeMedicao, value]
  )
  const pastDME = usePrevious(currentDMEId)
  const currentDME = useMemo(() => listDMEs[currentDMEId], [
    currentDMEId,
    listDMEs,
  ])

  useEffect(() => {
    if (lab) {
      dispatch(getLab(lab))
    }
  }, [dispatch, lab])
  useEffect(() => {
    if (currentDMEId && !listDMEs[currentDMEId]) {
      dispatch(getDMEInfo(currentDMEId))
    }
  }, [currentDMEId, dispatch, lab, listDMEs])

  // useEffect(() => {
  //   if (query?.finalDate !== lastQuery?.finalDate) {
  //     dispatch(getMostEnergy())
  //   }
  // }, [dispatch, lastQuery?.finalDate, query?.finalDate])

  const currentAction = useCallback(() => {
    if (currentDME?.disabled) {
      return
    }
    dispatch(getDmeA(currentDMEId))
  }, [currentDME?.disabled, currentDMEId, dispatch])
  const voltageAction = () => dispatch(getDmeV(currentDMEId))
  const potencyAction = () => dispatch(getDmeW(currentDMEId))
  const energyAction = () => dispatch(getDmeE(currentDMEId))

  useOnSuccessCall(GET_DME_INFO.ACTION, currentAction)
  useOnSuccessCall(GET_DME_A.ACTION, voltageAction)
  useOnSuccessCall(GET_DME_V.ACTION, potencyAction)
  useOnSuccessCall(GET_DME_W.ACTION, energyAction)

  // if (!mostUsed.length) {
  //   return null
  // }
  return (
    <Grid className={styles.container}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        className={styles.tabs}
      >
        {currentLab?.pontosDeMedicao?.map((dme) => (
          <Tab
            label={dme.ponto}
            key={dme.id}
            id={dme.idDme}
            className={styles.tab}
          />
        ))}
      </Tabs>
      {currentDME?.disabled ? (
        <Typography color="secondary">DME desativado</Typography>
      ) : (
        <>
          <CardInfo
            title="Porcentagem de potência em cada fase"
            isLoading={listDMEs && Object.keys(listDMEs).length === 0}
          >
            {currentDME?.perc.length > 0 && (
              <DonutChart
                height={280}
                width={280}
                values={currentDME?.perc?.map((attribute) => attribute.percW)}
                labels={currentDME?.perc?.map(
                  (attribute) => `Fase ${attribute.phase}`
                )}
              />
            )}
          </CardInfo>
          <CardInfo
            title="Corrente em cada fase"
            isLoading={listDMEs && Object.keys(listDMEs).length === 0}
          >
            <ColumnChart
              value={currentDME?.lastA?.map((A) => A.value)}
              isPhaseGraph
            />
          </CardInfo>
          <CardInfo
            title="Tensão em cada fase"
            isLoading={listDMEs && Object.keys(listDMEs).length === 0}
          >
            <ColumnChart
              value={currentDME?.lastV?.map((V) => V.value)}
              isPhaseGraph
            />
          </CardInfo>
          <CardInfo
            title="Gráfico de corrente em cada fase"
            isLoading={!currentDME?.current}
            className={styles.graphComplete}
          >
            <LineChart
              height={250}
              width={700}
              XValues={currentDME?.current?.date}
              YValues={currentDME?.current?.value}
            />
          </CardInfo>
          <CardInfo
            title="Gráfico de tensão em cada fase"
            isLoading={!currentDME?.voltage}
            className={styles.graphComplete}
          >
            <LineChart
              height={250}
              width={700}
              XValues={currentDME?.voltage?.date}
              YValues={currentDME?.voltage?.value}
            />
          </CardInfo>
          <CardInfo
            title="Gráfico de potência em cada fase"
            isLoading={!currentDME?.potency}
            className={styles.graphComplete}
          >
            <LineChart
              height={250}
              width={700}
              XValues={currentDME?.potency?.date}
              YValues={currentDME?.potency?.value}
            />
          </CardInfo>
          <CardInfo
            title="Gráfico de energia em cada fase"
            isLoading={!currentDME?.energy}
            className={styles.graphComplete}
          >
            <LineChart
              height={250}
              width={700}
              XValues={currentDME?.energy?.date}
              YValues={currentDME?.energy?.value}
            />
          </CardInfo>
        </>
      )}
    </Grid>
  )
}

export default DMEView
