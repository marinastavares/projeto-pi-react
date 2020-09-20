import axios from 'axios'
import humps from 'humps'

import { API_URL } from 'utils/environment'

const handleResponseError = (error) =>
  new Promise((resolve, reject) => reject(error.response.data))

export const createFormData = (data) => {
  const formData = new FormData()

  Object.keys(data).forEach((field) => {
    const fieldValue = data[field]
    const formDataValue = (() => {
      if (!fieldValue) {
        return ''
      }

      if (
        fieldValue instanceof Blob ||
        typeof fieldValue !== 'object' ||
        Array.isArray(fieldValue)
      ) {
        return fieldValue
      }
      return JSON.stringify(fieldValue)
    })()

    if (Array.isArray(formDataValue)) {
      return formDataValue.forEach((value) => {
        formData.append(field, value)
      })
    }

    return formData.append(field, formDataValue)
  })

  return formData
}

export const get = () => (endpoint, params = null) =>
  axios
    .get(API_URL.concat(endpoint), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=utf-8',
      },
      params,
    })
    .then(({ data }) => humps.camelizeKeys(data))
    .catch(handleResponseError)

export const post = (key = null) => (endpoint, payload, applyHumps = true) =>
  axios
    .post(
      API_URL.concat(endpoint),
      applyHumps ? humps.decamelizeKeys(payload) : payload,
      key && {
        headers: {
          Authorization: `Token ${key}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then(({ data }) => humps.camelizeKeys(data))
    .catch(handleResponseError)

export const patch = (key) => (endpoint, payload, applyHumps = true) =>
  axios
    .patch(
      API_URL.concat(endpoint),
      applyHumps ? humps.decamelizeKeys(payload) : payload,
      key && {
        headers: {
          Authorization: `Token ${key}`,
          // 'Content-Type': 'multipart/form-data',
          // 'Access-Control-Allow-Origin': '*',
        },
      }
    )
    .then(({ data }) => humps.camelizeKeys(data))

export const del = (key) => (endpoint) =>
  axios
    .delete(
      API_URL.concat(endpoint),
      key && {
        headers: {
          Authorization: `Token ${key}`,
        },
      }
    )
    .then(({ data }) => humps.camelizeKeys(data))
    .catch(handleResponseError)
