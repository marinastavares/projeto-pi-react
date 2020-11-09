import React, { useCallback } from 'react'
import { Grid, Typography, TextField, Paper } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { navigate } from '@reach/router'

import { createLabs, CREATE_LABS } from 'modules/labs/actions'
import { useOnSuccessCall } from 'utils/hooks'
import Button from 'components/button'

import useStyles from './styles'

const LOCATION_VALUES = {
  NAME: 'name',
  SLUG: 'slug',
  ID_DME: 'id_DME',
  PONTO: 'ponto',
}
const LOCATION_LABELS = {
  [LOCATION_VALUES.NAME]: 'Nome',
  [LOCATION_VALUES.SLUG]: 'Nova Slug do laboratório',
  [LOCATION_VALUES.PONTO]: 'Nome do ponto',
  [LOCATION_VALUES.ID_DME]: 'Novo id',
}

const RegisterSchema = Yup.object().shape({
  [LOCATION_VALUES.NAME]: Yup.string()
    .min(2, 'Minimo 2 caracteres')
    .max(50, 'Máximo 20 caracteres')
    .required('Obrigatório'),
  [LOCATION_VALUES.SLUG]: Yup.string()
    .min(2, 'Minimo 2 caracteres')
    .max(50, 'Máximo 20 caracteres')
    .required('Obrigatório'),
  [LOCATION_VALUES.PONTO]: Yup.string()
    .min(2, 'Minimo 2 caracteres')
    .max(50, 'Máximo 20 caracteres')
    .required('Obrigatório'),
  [LOCATION_VALUES.ID_DME]: Yup.number().required('Obrigatório'),
})

const RegisterLocation = () => {
  const styles = useStyles()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: Object.fromEntries(
      Object.values(LOCATION_VALUES).map((value) => [value, ''])
    ),
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const payload = {
        ...formik.values,
        pontosDeMedicao: [
          {
            id_DME: formik.values.id_DME,
            ponto: formik.values.ponto,
          },
        ],
      }
      // eslint-disable-next-line camelcase
      const { id_DME, ponto, ...values } = payload
      dispatch(createLabs(values))
    },
  })
  const { errors, values, touched, handleSubmit, handleChange } = formik
  const handleSuccess = useCallback(() => {
    navigate('/admin')
  }, [])
  const [isLoading, errorMessage] = useOnSuccessCall(
    CREATE_LABS.ACTION,
    handleSuccess,
    'Ambiente cadastrado com sucesso'
  )

  const textFieldProps = useCallback(
    (name) => ({
      variant: 'outlined',
      color: 'secondary',
      name,
      fullWidth: true,
      value: values[name],
      label: LOCATION_LABELS[name],
      onChange: handleChange,
      errors: !!(errors[name] && touched[name]),
      helperText: errors[name] || '',
    }),
    [errors, handleChange, touched, values]
  )
  return (
    <Grid className={styles.container}>
      <Paper variant="outlined" className={styles.paper}>
        <Typography color="secondary">
          Cadastre um novo ambiente na plataforma
        </Typography>
        <Grid component="form" onSubmit={handleSubmit} className={styles.form}>
          {Object.values(LOCATION_VALUES).map((value) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField {...textFieldProps(value)} />
          ))}
          {errorMessage && (
            <Typography color="secondary">{errorMessage}</Typography>
          )}
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            isLoading={isLoading}
          >
            CADASTRAR AMBIENTE
          </Button>{' '}
        </Grid>
      </Paper>
    </Grid>
  )
}

export default RegisterLocation
