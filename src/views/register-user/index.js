import React, { useCallback } from 'react'
import { Grid, Typography, TextField, Paper } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { navigate } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'

import { createUser, CREATE_USER } from 'modules/user/actions'
import { useOnSuccessCall } from 'utils/hooks'
import Button from 'components/button'
import Select from 'components/select'

import useStyles from './styles'

const REGISTER_USER_VALUES = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  SLUG_AMBIENTE: 'slugAmbiente',
}
const REGISTER_USER_LABELS = {
  [REGISTER_USER_VALUES.NAME]: 'Nome',
  [REGISTER_USER_VALUES.EMAIL]: 'Email',
  [REGISTER_USER_VALUES.SLUG_AMBIENTE]: 'Slug do ambiente',
  [REGISTER_USER_VALUES.PASSWORD]: 'Senha',
}

const RegisterSchema = Yup.object().shape({
  [REGISTER_USER_VALUES.NAME]: Yup.string().required('Obrigatório'),
  [REGISTER_USER_VALUES.EMAIL]: Yup.string()
    .email('Email inválido')
    .required('Obrigatório'),
  [REGISTER_USER_VALUES.SLUG_AMBIENTE]: Yup.string().required('Obrigatório'),
  [REGISTER_USER_VALUES.PASSWORD]: Yup.string().required('Obrigatório'),
})

const RegisterUser = () => {
  const styles = useStyles()
  const dispatch = useDispatch()
  const allLabs = useSelector((state) => Object.keys(state.labs.labs))

  const formik = useFormik({
    initialValues: Object.fromEntries(
      Object.values(REGISTER_USER_VALUES).map((value) => [value, ''])
    ),
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const values = {
        ...formik.values,
        [REGISTER_USER_VALUES.SLUG_AMBIENTE]: formik.values[
          REGISTER_USER_VALUES.SLUG_AMBIENTE
        ].toLowerCase(),
      }
      dispatch(createUser(values))
    },
  })
  const { errors, values, touched, handleSubmit, handleChange } = formik
  const handleSuccess = useCallback(() => {
    navigate('/admin')
  }, [])
  const [isLoading, errorMessage] = useOnSuccessCall(
    CREATE_USER.ACTION,
    handleSuccess
  )

  const textFieldProps = useCallback(
    (name) => ({
      variant: 'outlined',
      color: 'secondary',
      name,
      fullWidth: true,
      value: values[name],
      label: REGISTER_USER_LABELS[name],
      onChange: handleChange,
      errors: !!(errors[name] && touched[name]),
      helperText: touched[name] && errors[name],
    }),
    [errors, handleChange, touched, values]
  )
  return (
    <Grid className={styles.container}>
      <Paper variant="outlined" className={styles.paper}>
        <Typography color="secondary">
          Registre um técnico na plataforma
        </Typography>
        <Grid component="form" onSubmit={handleSubmit} className={styles.form}>
          {Object.values(REGISTER_USER_VALUES).map((value) => {
            if (value === REGISTER_USER_VALUES.SLUG_AMBIENTE) {
              // eslint-disable-next-line react/jsx-props-no-spreading
              return <Select options={allLabs} {...textFieldProps(value)} />
            }
            if (value === REGISTER_USER_VALUES.PASSWORD) {
              // eslint-disable-next-line react/jsx-props-no-spreading
              return <TextField type="password" {...textFieldProps(value)} />
            }
            return (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TextField {...textFieldProps(value)} />
            )
          })}
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
            CADASTRAR
          </Button>{' '}
        </Grid>
      </Paper>
    </Grid>
  )
}

export default RegisterUser
