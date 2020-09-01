import { get, post } from 'utils/requests'

export const getMonitors = () => get()('api/monitor')
