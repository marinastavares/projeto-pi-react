import { post } from './requests'

export const createUser = (payload) => post()(`registro_tecnico/`, payload)
export const login = (payload) => post()(`login/`, payload)
