import { get } from './requests'

export const getLabs = (key) => get(key)('Lista/DME_Ambiente_PontoMedicao/')
export const getLab = (slug) => (key) => get(key)(`labs/${slug}`)
