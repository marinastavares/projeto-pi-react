import { get } from './requests'

export const getDMEInfo = (idDME, params) => get()(`last/${idDME}`, params)
export const getDmeA = (idDME, params) => get()(`A/${idDME}`, params)
export const getDmeV = (idDME, params) => get()(`V/${idDME}`, params)
export const getDmeW = (idDME, params) => get()(`W/${idDME}`, params)
export const getDmeE = (idDME, params) => get()(`E/${idDME}`, params)
