/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
import axios from 'axios'
import humps from 'humps'

const githubApi =
  'https://api.github.com/repos/marinastavares/mst-react-boilerplate/commits'

const handleResponseError = (error) =>
  new Promise((resolve, reject) => reject(error.response.data))

const get = (endpoint) =>
  axios
    .get(endpoint)
    .then(({ data }) => humps.camelizeKeys(data))
    .catch(handleResponseError)
// const post = (key) => (endpoint, payload) => axios.post(endpoint, humps.decamelizeKeys(payload))
// .then(({ data }) => humps.camelizeKeys(data)).catch(handleResponseError)

export const getMusic = () => get(githubApi)

export const getMusics = () =>
  axios.get(githubApi).then((response) => response.data)
