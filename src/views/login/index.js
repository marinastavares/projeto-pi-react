import React, { useCallback } from 'react'
import { Grid, Typography, TextField, Paper } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { navigate } from '@reach/router'
import { useDispatch } from 'react-redux'

import { login, LOGIN } from 'modules/user/actions'
import { useOnSuccessCall, useLocalStorage } from 'utils/hooks'
import Button from 'components/button'

import useStyles from './styles'

const REGISTER_USER_VALUES = {
  EMAIL: 'email',
  PASSWORD: 'password',
}
const REGISTER_USER_LABELS = {
  [REGISTER_USER_VALUES.EMAIL]: 'Email',
  [REGISTER_USER_VALUES.PASSWORD]: 'Senha',
}

const RegisterSchema = Yup.object().shape({
  [REGISTER_USER_VALUES.EMAIL]: Yup.string()
    .email('Email inválido')
    .required('Obrigatório'),
  [REGISTER_USER_VALUES.PASSWORD]: Yup.string().required('Obrigatório'),
})

const Login = () => {
  const styles = useStyles()
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const [storedValues, setStoredValue] = useLocalStorage('isLoggedIn', false)

  const formik = useFormik({
    initialValues: Object.fromEntries(
      Object.values(REGISTER_USER_VALUES).map((value) => [value, ''])
    ),
    validationSchema: RegisterSchema,
    onSubmit: () => {
      dispatch(login(formik.values))
    },
  })
  const { errors, values, touched, handleSubmit, handleChange } = formik
  const handleSuccess = useCallback(() => {
    setStoredValue(true)
    navigate('/admin')
  }, [setStoredValue])
  const [isLoading, errorMessage] = useOnSuccessCall(
    LOGIN.ACTION,
    handleSuccess,
    'Login Realizado com sucesso'
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
      helperText: (touched[name] && errors[name]) || '',
    }),
    [errors, handleChange, touched, values]
  )
  return (
    <Grid className={styles.container}>
      <Paper variant="outlined" className={styles.paper}>
        <Typography color="secondary">Acesse a plataforma</Typography>
        <Grid component="form" onSubmit={handleSubmit} className={styles.form}>
          {Object.values(REGISTER_USER_VALUES).map((value) => {
            return (
              <TextField
                type={
                  value === REGISTER_USER_VALUES.PASSWORD
                    ? 'password'
                    : 'string'
                }
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...textFieldProps(value)}
              />
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
            LOGIN
          </Button>{' '}
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Login
