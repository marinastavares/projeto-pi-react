import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { Grid, Typography, Tabs, Tab } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from '@reach/router'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie'

import * as loader from 'assets/loader.json'
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
import { dmeSelector, hasChangedSelector } from 'modules/dme/selectors'
import { labsSelector } from 'modules/labs/selectors'
import { useOnSuccessCall, useWindowSize, usePrevious } from 'utils/hooks'
import CardInfo from 'components/card-info'
import DonutChart from 'components/donut-chart'
import ColumnChart from 'components/column-chart'
import MultipleLineChart from 'components/multiple-chart'

import useStyles from './styles'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loader.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}
const DMEView = () => {
  const styles = useStyles()
  const { labs } = useSelector(labsSelector)
  const listDMEs = useSelector(dmeSelector)
  const hasChanged = useSelector(hasChangedSelector)
  const dispatch = useDispatch()
  const { lab } = useParams()
  const prevLab = usePrevious(lab)
  const [value, setValue] = useState(0)
  const { isMobile } = useWindowSize()

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue)
  }, [])

  const currentDMEId = useMemo(() => labs?.[lab]?.[value]?.idDME, [
    lab,
    labs,
    value,
  ])
  const currentDME = useMemo(() => listDMEs[currentDMEId], [
    currentDMEId,
    listDMEs,
  ])

  useEffect(() => {
    if (currentDMEId && !listDMEs[currentDMEId]) {
      dispatch(getDMEInfo(currentDMEId))
    }
  }, [currentDMEId, dispatch, lab, listDMEs])
  useEffect(() => {
    if (hasChanged) {
      dispatch(getDMEInfo(currentDMEId))
    }
  }, [currentDMEId, dispatch, hasChanged])

  const currentAction = useCallback(() => {
    if (currentDME?.disabled) {
      return
    }
    dispatch(getDmeA(currentDMEId))
  }, [currentDME?.disabled, currentDMEId, dispatch])
  const voltageAction = () => dispatch(getDmeV(currentDMEId))
  const potencyAction = () => dispatch(getDmeW(currentDMEId))
  const energyAction = () => dispatch(getDmeE(currentDMEId))

  const [isLoading] = useOnSuccessCall(GET_DME_INFO.ACTION, currentAction)
  useOnSuccessCall(GET_DME_A.ACTION, voltageAction)
  useOnSuccessCall(GET_DME_V.ACTION, potencyAction)
  useOnSuccessCall(GET_DME_W.ACTION, energyAction)

  const renderContent = useMemo(() => {
    if (currentDME?.disabled) {
      return (
        <Typography color="secondary">
          Não foi possível adquirir dados do DME
        </Typography>
      )
    }

    if (isLoading) {
      return (
        <Grid container className={styles.loading}>
          <FadeIn>
            <Grid
              container
              justify="center"
              direction="column"
              className="d-flex justify-content-center align-items-center"
            >
              <Typography
                align="center"
                component="h2"
                variant="h1"
                color="secondary"
              >
                Carregando dados do DME
              </Typography>
              <Lottie options={defaultOptions} height={120} width={120} />
            </Grid>
          </FadeIn>
        </Grid>
      )
    }
    return (
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
          noGrid
          containerClassName={styles.content}
        >
          <MultipleLineChart
            isMobile={isMobile}
            phaseOne={currentDME?.current?.['1']?.map((current) => ({
              x: new Date(current.dateA),
              y: current.valueA,
            }))}
            phaseTwo={currentDME?.current?.['2']?.map((current) => ({
              x: new Date(current.dateA),
              y: current.valueA,
            }))}
            phaseThree={currentDME?.current?.['3']?.map((current) => ({
              x: new Date(current.dateA),
              y: current.valueA,
            }))}
            unit="A"
          />
        </CardInfo>
        <CardInfo
          title="Gráfico de tensão em cada fase"
          isLoading={!currentDME?.voltage}
          className={styles.graphComplete}
          noGrid
          containerClassName={styles.content}
        >
          <MultipleLineChart
            isMobile={isMobile}
            phaseOne={currentDME?.voltage?.['1']?.map((current) => ({
              x: new Date(current.dateV),
              y: current.valueV,
            }))}
            phaseTwo={currentDME?.voltage?.['2']?.map((current) => ({
              x: new Date(current.dateV),
              y: current.valueV,
            }))}
            phaseThree={currentDME?.voltage?.['3']?.map((current) => ({
              x: new Date(current.dateV),
              y: current.valueV,
            }))}
            unit="V"
          />
        </CardInfo>
        <CardInfo
          title="Gráfico de potência em cada fase"
          isLoading={!currentDME?.potency}
          className={styles.graphComplete}
          noGrid
          containerClassName={styles.content}
        >
          <MultipleLineChart
            isMobile={isMobile}
            phaseOne={currentDME?.potency?.['1']?.map((potency) => ({
              x: new Date(potency.dateW),
              y: potency.valueW,
            }))}
            phaseTwo={currentDME?.potency?.['2']?.map((potency) => ({
              x: new Date(potency.dateW),
              y: potency.valueW,
            }))}
            phaseThree={currentDME?.potency?.['3']?.map((potency) => ({
              x: new Date(potency.dateW),
              y: potency.valueW,
            }))}
            unit="W"
          />
        </CardInfo>
        <CardInfo
          title="Gráfico de energia em cada fase"
          isLoading={!currentDME?.energy}
          className={styles.graphComplete}
          noGrid
          containerClassName={styles.content}
        >
          <MultipleLineChart
            isMobile={isMobile}
            phaseOne={currentDME?.energy?.['1']?.map((energy) => ({
              x: new Date(energy.dateE),
              y: energy.valueE,
            }))}
            phaseTwo={currentDME?.energy?.['2']?.map((energy) => ({
              x: new Date(energy.dateE),
              y: energy.valueE,
            }))}
            phaseThree={currentDME?.energy?.['3']?.map((energy) => ({
              x: new Date(energy.dateE),
              y: energy.valueE,
            }))}
            unit="kWh"
          />
        </CardInfo>
      </>
    )
  }, [
    currentDME,
    currentDME?.disabled,
    currentDME?.energy,
    currentDME?.lastA?.map,
    currentDME?.lastV?.map,
    currentDME?.perc?.length,
    currentDME?.perc?.map,
    currentDME?.potency,
    currentDME?.voltage,
    isLoading,
    isMobile,
    listDMEs,
    styles.content,
    styles.graphComplete,
    styles.loading,
  ])

  useEffect(() => {
    if (lab !== prevLab) {
      setValue(0)
    }
  }, [lab, prevLab])

  return (
    <Grid className={styles.container}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        className={styles.tabs}
      >
        {labs?.[lab]?.map((dme) => (
          <Tab
            label={dme.ponto}
            key={dme.id}
            id={dme.idDme}
            className={styles.tab}
          />
        ))}
      </Tabs>
      {renderContent}
    </Grid>
  )
}

export default DMEView
