import { get, post } from './requests'

export const getLabs = (key) => get(key)('Lista/DME_Ambiente_PontoMedicao/')
export const getLab = (slug) => (key) => get(key)(`labs/${slug}`)
export const getAllLabs = () => (key) => get(key)(`status_DMES/`)
export const createLab = (payload) => post()(`registro_ambiente/`, payload)
